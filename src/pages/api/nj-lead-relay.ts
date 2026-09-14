/**
 * Jerry & Co. — NJ Design-Build Funnel: Cloudflare relay → GHL Inbound Webhook workflow trigger
 *
 * Ported from the "Jerryco njdesignbuild ghl webhook integration" spec doc's
 * nj-lead-relay.ts (Astro-on-Cloudflare-Workers variant, per that file's own
 * bottom-comment guidance). This IS the NJ intake form's relay (wired in
 * NJLeadForm.astro as of Sept 2026) — it replaced an earlier direct-API call
 * to src/pages/api/ghl-lead-relay.ts for this form specifically:
 *
 *   - ghl-lead-relay.ts calls GHL's Contacts/Opportunities REST API directly
 *     with a Private Integration token (GHL_API_KEY) — the branching logic
 *     (pipeline, stage, tags, Design Fee Tier) lives in THIS repo's code.
 *     It's still what the NY funnels (A/B/C) use; GHL_API_KEY was never
 *     actually set in this project though, so it was never live for NJ.
 *   - nj-lead-relay.ts (this file) instead POSTs a flat JSON payload to a
 *     GHL Workflow's "Inbound Webhook" trigger — GHL's own workflow builder
 *     does the contact upsert, tagging, and opportunity creation. No API
 *     token in this Worker at all, just the unguessable webhook URL as a
 *     secret (GHL_NJ_DESIGN_BUILD_WEBHOOK_URL, set via `wrangler secret put`
 *     and in .env for local dev — see that spec doc's Section 2 for the
 *     one-time manual GHL workflow setup this depends on).
 *
 * GHL-outage hardening (2026-09-06 — GHL was down, and this route's ONLY
 * leg was GHL, so every NJ submission failed with no record anywhere):
 * GHL is no longer the single point of failure. Every submission now also
 * (a) emails the full lead directly to jerry@jerryandcohome.com AND
 * builderjmedia@gmail.com via Resend, and (b) posts to the estimating
 * engine's public lead intake (same D1-backed pipeline the homepage forms
 * and the newer funnel pages already use — see transformations.astro's
 * ENGINE_INTAKE_URL). All three legs (GHL, email, D1) run independently;
 * the request only fails if every leg fails, so one integration being down
 * never drops a lead again.
 *
 * What this does:
 *   1. Accepts a JSON POST from the NJ intake form (and, if reused, the
 *      scheduler page).
 *   2. Rejects bots via a honeypot field (silently — never tips off the bot).
 *   3. Applies the Plans-Ready branch logic (site-visit $250 product vs.
 *      design-fee tiers) — same branch GHL's workflow If/Else keys off of.
 *   4. Forwards a flat JSON payload to the GHL webhook URL (best-effort).
 *   5. Emails the owner directly and posts to the estimating engine's D1
 *      lead store (both best-effort, independent of GHL's outcome).
 *   6. Never throws an unhandled error back to the browser — always returns
 *      JSON so the client-side fetch can decide whether to fall back to the
 *      existing mailto:/localStorage path already built into the funnel.
 *
 * Optional secret (GHL leg only — omit and it just no-ops; never blocks the
 * email/D1 legs, treat exactly like a credential since the URL itself is
 * unauthenticated):
 *   wrangler secret put GHL_NJ_DESIGN_BUILD_WEBHOOK_URL
 * Required secret for the email leg (already set for other transactional
 * mail on this site — see api/notify.ts):
 *   RESEND_API_KEY
 * For local dev, add the same keys to .env (gitignored — confirm before
 * committing).
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const OWNER_EMAILS = ['jerry@jerryandcohome.com', 'builderjmedia@gmail.com'];
const ENGINE_INTAKE_URL = 'https://portal.jerryandcohome.com/api/v1/leads/intake';

interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  projectType?: string;   // maps to the existing "NY Service Interested In" field (reused for NJ, not a duplicate)
  plansStatus?: string;   // "Yes – zoning approved" / "Yes – zoning pending" / "No – need design too" — maps to the new "NJ Plans Ready" field
  timeline?: string;      // maps to the existing "NY Project Timeline" field (reused for NJ, not a duplicate)
  budget?: string;        // maps to the existing "NY Rough Budget Range" field (reused for NJ, not a duplicate)
  notes?: string;
  formSource?: string;    // "intake" | "scheduler" — which of the 3 pages submitted
  website?: string;       // honeypot — real visitors never see or fill this field
}

const DESIGN_FEE_BY_BUDGET: Record<string, string> = {
  under_30k: 'tier_1_750',
  '30k_60k': 'tier_2_1500',
  '60k_plus': 'tier_3_2500',
};

function corsHeaders(origin: string | null): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

function normalizeBudgetKey(budget?: string): string {
  if (!budget) return '30k_60k';
  const b = budget.toLowerCase();
  if (b.includes('under') || b.includes('<')) return 'under_30k';
  if (b.includes('90k') || b.includes('60k+') || b.includes('90k+') || b.includes('over')) return '60k_plus';
  return '30k_60k';
}

export const OPTIONS: APIRoute = async ({ request }) => {
  return new Response(null, { headers: corsHeaders(request.headers.get('Origin')) });
};

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('Origin');
  const webhookUrl = import.meta.env.GHL_NJ_DESIGN_BUILD_WEBHOOK_URL;

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400, origin);
  }

  // Honeypot: bots fill every field including hidden ones. Real visitors never see this
  // field (it's visually hidden in the form). Respond 200 so the bot doesn't learn
  // anything, but do NOT forward to GHL.
  if (body.website) {
    return json({ ok: true }, 200, origin);
  }

  if (!body.name || !(body.phone || body.email)) {
    return json({ ok: false, error: 'missing_required_fields' }, 400, origin);
  }

  const plansReady = (body.plansStatus || '').toLowerCase().startsWith('yes');
  const productPath = plansReady ? 'site_visit_250' : 'design_fee_tiers';
  const designFeeTier = plansReady
    ? 'site_visit_250'
    : DESIGN_FEE_BY_BUDGET[normalizeBudgetKey(body.budget)] ?? 'tier_2_1500';

  const [firstName, ...rest] = (body.name || '').trim().split(/\s+/);
  const lastName = rest.join(' ');

  const ghlPayload = {
    first_name: firstName || body.name,
    last_name: lastName || '',
    phone: body.phone || '',
    email: body.email || '',
    address: body.address || '',
    nj_service_interested_in: body.projectType || '',
    nj_plans_ready: body.plansStatus || '',
    nj_project_timeline: body.timeline || '',
    nj_rough_budget_range: body.budget || '',
    notes: body.notes || '',
    funnel_source: 'nj-design-build',
    region: 'nj',
    product_path: productPath,        // "site_visit_250" | "design_fee_tiers" — branch in the GHL workflow on this
    design_fee_tier: designFeeTier,   // "site_visit_250" | "tier_1_750" | "tier_2_1500" | "tier_3_2500"
    lead_source_page: body.formSource || 'unknown',
    submitted_at: new Date().toISOString(),
  };

  // Three independent legs — GHL, owner email, D1 lead store. Each is
  // best-effort; a failure in one never blocks the others, and the
  // request only fails to the visitor if every leg fails (see the
  // outcome check below). This is the fix for GHL-outage days: previously
  // GHL was the ONLY leg, so its outage meant every NJ submission failed
  // with zero record anywhere.
  let ghlOk = false;
  if (webhookUrl) {
    try {
      const ghlResp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ghlPayload),
      });
      ghlOk = ghlResp.ok;
      if (!ghlResp.ok) {
        console.error('[nj-lead-relay] GHL webhook returned non-200', ghlResp.status, await ghlResp.text());
      }
    } catch (err) {
      console.error('[nj-lead-relay] GHL webhook fetch error', err);
    }
  } else {
    console.error('[nj-lead-relay] GHL_NJ_DESIGN_BUILD_WEBHOOK_URL not set — GHL leg skipped, email/D1 legs still run');
  }

  const fullAddress = body.address || '';
  const summaryText = [
    `Name: ${body.name || 'n/a'}`,
    `Phone: ${body.phone || 'n/a'}`,
    `Email: ${body.email || 'n/a'}`,
    `Address: ${fullAddress || 'n/a'}`,
    `Project type: ${body.projectType || 'n/a'}`,
    `Plans ready: ${body.plansStatus || 'n/a'}`,
    `Timeline: ${body.timeline || 'n/a'}`,
    `Budget: ${body.budget || 'n/a'}`,
    `Notes: ${body.notes || 'n/a'}`,
    `Source: ${body.formSource || 'unknown'}`,
    `GHL relay: ${ghlOk ? 'delivered' : 'NOT delivered — check GHL_NJ_DESIGN_BUILD_WEBHOOK_URL / GHL status'}`,
  ].join('\n');

  let emailOk = false;
  const resendKey = import.meta.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const res = await resend.emails.send({
        from: 'Site Notifications <jerry@jerryandcohome.com>',
        to: OWNER_EMAILS,
        subject: `New NJ design-build lead — ${body.name || 'unknown'}`,
        text: summaryText,
      });
      emailOk = !res.error;
      if (res.error) console.error('[nj-lead-relay] Resend error', res.error);
    } catch (err) {
      console.error('[nj-lead-relay] Resend send failed', err);
    }
  } else {
    console.error('[nj-lead-relay] RESEND_API_KEY not set — owner email leg skipped');
  }

  let d1Ok = false;
  try {
    const engineRes = await fetch(ENGINE_INTAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        property_type: 'single-family',
        project_type: 'something-else',
        town: body.address || undefined,
        timeline: body.timeline,
        project_size: body.budget || undefined,
        project_description: `NJ design-build request. ${body.projectType || ''}. Plans ready: ${body.plansStatus || 'n/a'}. ${body.notes || ''}`.trim(),
        lead_status: 'complete',
        source: 'website_form',
        funnel: 'nj_design_build',
      }),
    });
    d1Ok = engineRes.ok;
    if (!engineRes.ok) console.error('[nj-lead-relay] Engine intake non-200', engineRes.status, await engineRes.text());
  } catch (err) {
    console.error('[nj-lead-relay] Engine intake unreachable', err);
  }

  if (!ghlOk && !emailOk && !d1Ok) {
    return json({ ok: false, error: 'all_relay_legs_failed' }, 502, origin);
  }

  return json({ ok: true, productPath, designFeeTier }, 200, origin);
};
