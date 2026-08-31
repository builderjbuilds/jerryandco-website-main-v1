// Jerry & Co. — GHL lead relay (Astro API route, runs inside the same Cloudflare
// Worker as the rest of the site — no second host, no CORS, same deploy pipeline
// as everything else here).
//
// Mirrors src/pages/api/notify.ts's shape: prerender=false, secrets read via
// import.meta.env (same convention already proven for RESEND_API_KEY), a typed
// APIRoute POST handler.
//
// Receives the NY funnel form POST client-side (see components/ny/NYLeadForm.astro),
// then server-side:
//   1. Upserts the contact in GHL with tags + the NY custom fields (Section 2.3.1
//      of JerryCo_OutdoorLiving_Division_Launch_Strategy.md).
//   2. Looks up the right pipeline by name and creates an opportunity in its first
//      stage (Section 2.3.2 — pipelines are duplicated manually in the GHL UI; this
//      degrades gracefully if a pipeline isn't there yet, so deploying this route
//      never blocks on that step).
// This is the "post-conversion automation" trigger point — once the contact/
// opportunity exists, every GHL workflow (speed-to-lead SMS, reminders, the
// design-fee invoice send) fires natively from there. This route does NOT
// duplicate that logic — GHL workflows own it, same reasoning as notify.ts owns
// the MA funnel's transactional email instead of GHL emailing directly.
//
// REQUIRED SECRETS (set via `wrangler secret put`, never committed, never placed
// in wrangler.jsonc's plaintext "vars"):
//   GHL_API_KEY      — a GHL Private Integration token
//                       (Settings → Private Integrations → Create → scopes:
//                       contacts.write, contacts.readonly, opportunities.write,
//                       opportunities.readonly)
//   GHL_LOCATION_ID   — GuZ774PUJ2fys1Mmgbht  (Jerry & Co. Home Improvement LLC)
//
// GHL API base verified against the public API v2 surface (services.leadconnectorhq.com,
// Version header 2021-07-28). Confirm against your Private Integration's docs page
// before going live — GHL occasionally revises path/version details.

export const prerender = false;

import type { APIRoute } from 'astro';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

// Maps this form's field keys to the GHL custom field keys already live in the
// account (see Section 2.3.1 of the strategy doc — these are ✅ already created).
const CUSTOM_FIELD_KEYS = {
  serviceInterest: 'contact.ny_service_interested_in',
  timeline: 'contact.ny_project_timeline',
  budgetRange: 'contact.ny_rough_budget_range',
  unitsManaged: 'contact.ny_unitsproperties_managed',
  // NJ Design-Build (funnel D) — Section 5 of
  // JerryCo_NJ_DesignBuild_Funnel_ClaudeCode_BuildSpec.md. `plansReady` is a
  // NEW field, added manually in the GHL UI (no field-creation API — same
  // category of manual step as pipeline creation, see that doc's Section 9
  // Phase 3). NJ reuses the NY service/timeline/budget fields per the
  // build spec's stated default (Section 5's "Open Decisions" row) rather
  // than forking NJ-scoped duplicates.
  plansReady: 'contact.nj_plans_ready',
} as const;

type FunnelKey = 'A' | 'B' | 'C' | 'D';

// funnel -> { pipeline name to search for, first-stage name, default monetary value, tag }
const FUNNEL_CONFIG: Record<FunnelKey, { pipelineName: string; stageName: string; defaultValue: number; tag: string }> = {
  A: { pipelineName: 'NY Homeowner', stageName: 'New Lead', defaultValue: 6000, tag: 'funnel-a-homeowner' },
  B: { pipelineName: 'NY Landlord / Developer', stageName: 'New Lead', defaultValue: 3500, tag: 'funnel-b-landlord' },
  C: { pipelineName: 'NY Design-Build', stageName: 'Inquiry', defaultValue: 25000, tag: 'funnel-c-design-build' },
  // NJ routes into the SAME "NY Design-Build" pipeline (build spec Section 5:
  // "NJ/NY are one Design-Build product line, not two") tagged region:nj +
  // funnel-c-design-build, rather than a fourth pipeline.
  D: { pipelineName: 'NY Design-Build', stageName: 'Inquiry', defaultValue: 25000, tag: 'funnel-c-design-build' },
};

// plansStatus -> Design Fee Tier (build spec Section 2.11.1 / 2.4). "Yes"
// answers (zoning approved or pending) route to the $250 site-visit product;
// "No" needs a from-scratch design visit, and the exact $750/$1,500/$2,500
// tier depends on project scope the intake form doesn't capture — that
// judgment call is made at the site visit, so it's tagged TBD rather than
// guessed here.
const NJ_DESIGN_FEE_TIER: Record<string, { tag: string; monetaryValue: number }> = {
  plans_and_zoning_ready: { tag: 'design-fee-tier:site-visit-250', monetaryValue: 250 },
  plans_only: { tag: 'design-fee-tier:site-visit-250', monetaryValue: 250 },
  no_plans_yet: { tag: 'design-fee-tier:tbd-at-site-visit', monetaryValue: 1500 },
};

interface LeadPayload {
  funnel?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string; // NJ intake form (funnel D) collects one full-name field, not first/last
  email?: string;
  phone?: string;
  town?: string;
  street?: string; // NJ address fields
  city?: string;
  state?: string;
  postal?: string;
  county?: string;
  plansStatus?: string; // NJ "Plans Ready?" branch — see NJ_DESIGN_FEE_TIER
  message?: string;
  serviceInterest?: string;
  timeline?: string;
  budgetRange?: string;
  budget?: string; // NJ form's field name for the same concept as NY's budgetRange
  unitsManaged?: string;
  projectType?: string;
  estimatedValue?: string;
  source?: string;
  _gotcha?: string; // honeypot — matches the convention already used in QuickIntakeForm.astro
}

async function ghlFetch(path: string, apiKey: string, options: RequestInit = {}) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: GHL_VERSION,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const body: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || `GHL ${path} failed (${res.status})`);
  }
  return body;
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GHL_API_KEY;
  const locationId = import.meta.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error('[ghl-lead-relay] GHL_API_KEY / GHL_LOCATION_ID not set — cannot relay lead');
    return new Response(JSON.stringify({ ok: false, error: 'Lead capture is temporarily unavailable — please call/text us directly.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Bad JSON' }), { status: 400 });
  }

  // Honeypot — silently accept-and-drop bot submissions instead of erroring
  // (matches QuickIntakeForm.astro's _gotcha convention).
  if (data._gotcha) {
    return new Response(JSON.stringify({ ok: true, dropped: true }), { status: 200 });
  }

  const funnelKey: FunnelKey = (['A', 'B', 'C', 'D'] as const).includes(data.funnel as FunnelKey) ? (data.funnel as FunnelKey) : 'A';
  const cfg = FUNNEL_CONFIG[funnelKey];
  const isNJ = funnelKey === 'D';

  if (!data.phone && !data.email) {
    return new Response(JSON.stringify({ ok: false, error: 'Phone or email required' }), { status: 400 });
  }

  // NJ's intake form collects one "fullName" field instead of first/last —
  // split it so the GHL contact still gets both.
  let firstName = data.firstName || '';
  let lastName = data.lastName || '';
  if (isNJ && data.fullName) {
    const parts = data.fullName.trim().split(/\s+/);
    firstName = parts[0] || '';
    lastName = parts.slice(1).join(' ');
  }

  const njTier = isNJ ? NJ_DESIGN_FEE_TIER[data.plansStatus || ''] : undefined;

  try {
    // 1. Upsert contact
    const customFields: { key: string; field_value: string }[] = [];
    if (data.serviceInterest) customFields.push({ key: CUSTOM_FIELD_KEYS.serviceInterest, field_value: data.serviceInterest });
    if (data.timeline) customFields.push({ key: CUSTOM_FIELD_KEYS.timeline, field_value: data.timeline });
    if (data.budgetRange) customFields.push({ key: CUSTOM_FIELD_KEYS.budgetRange, field_value: data.budgetRange });
    if (isNJ && data.budget) customFields.push({ key: CUSTOM_FIELD_KEYS.budgetRange, field_value: data.budget });
    if (data.unitsManaged) customFields.push({ key: CUSTOM_FIELD_KEYS.unitsManaged, field_value: data.unitsManaged });
    if (isNJ && data.projectType) customFields.push({ key: CUSTOM_FIELD_KEYS.serviceInterest, field_value: data.projectType });
    if (isNJ && data.plansStatus) customFields.push({ key: CUSTOM_FIELD_KEYS.plansReady, field_value: data.plansStatus });

    // County tag, only when the visitor actually gave one (Section 7.1 step 3).
    const countyTag = isNJ && data.county ? [`county:${data.county.trim().toLowerCase().replace(/\s+/g, '-')}`] : [];
    const tags = isNJ
      ? [cfg.tag, 'region:nj', 'funnel:nj-design-build', ...(njTier ? [njTier.tag] : []), ...countyTag, `source:${(data.source || 'unknown').replace(/^\//, '')}`]
      : [cfg.tag, 'ny-division', `source:${(data.source || 'unknown').replace(/^\//, '')}`];

    const contactRes = await ghlFetch('/contacts/upsert', apiKey, {
      method: 'POST',
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address1: isNJ ? data.street || undefined : undefined,
        city: isNJ ? data.city || undefined : data.town || undefined,
        state: isNJ ? data.state || undefined : undefined,
        postalCode: isNJ ? data.postal || undefined : undefined,
        tags,
        customFields,
      }),
    });
    const contactId = contactRes.contact?.id;

    // 2. Find the matching pipeline (created manually per Section 2.3.2 — not
    // guaranteed to exist yet; this is non-fatal if it doesn't).
    let opportunityCreated = false;
    try {
      const pipelinesRes = await ghlFetch('/opportunities/pipelines', apiKey);
      const pipeline = (pipelinesRes.pipelines || []).find((p: any) =>
        p.name.toLowerCase().includes(cfg.pipelineName.toLowerCase())
      );

      if (pipeline && contactId) {
        const stage =
          pipeline.stages.find((s: any) => s.name.toLowerCase() === cfg.stageName.toLowerCase()) || pipeline.stages[0];
        await ghlFetch('/opportunities/', apiKey, {
          method: 'POST',
          body: JSON.stringify({
            pipelineId: pipeline.id,
            locationId,
            pipelineStageId: stage.id,
            name: `${firstName || 'New lead'} ${lastName || ''} — ${data.serviceInterest || data.projectType || cfg.pipelineName}`.trim(),
            status: 'open',
            contactId,
            monetaryValue: Number(data.estimatedValue) || njTier?.monetaryValue || cfg.defaultValue,
          }),
        });
        opportunityCreated = true;
      }
    } catch (pipelineErr: any) {
      // Non-fatal: the contact is saved either way. Pipelines may not be
      // duplicated yet (Section 2.3.2).
      console.error('[ghl-lead-relay] Opportunity creation skipped:', pipelineErr.message);
    }

    return new Response(JSON.stringify({ ok: true, contactId, opportunityCreated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[ghl-lead-relay] error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Could not reach GHL. Try again or call/text us.' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
