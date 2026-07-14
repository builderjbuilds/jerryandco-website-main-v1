# Jerry & Co. Website — Project Handoff Summary
**Prepared:** 2026-07-13 — for account transition continuity

---

## What this is

Jerry & Co. Home Improvement LLC (Boston-area condo cabinet refinishing / bathroom refresh / painting contractor) marketing website. Astro v7 + Cloudflare Workers, prerendered static HTML. Images served via Cloudinary cloud `dxuuydoee` (never `jerryandco`).

**Live status:** v1 launched (commit `0d488b1`, 2026-07-10).

**Repo path:** `jerryandco-website2/jerryandco-website2` (nested — the outer folder is just a container with a copy audit CSV alongside it).

---

## Git history (7 commits total)

1. Initial commit — Jerry & Co. Home Improvement website v2
2. Add data-reveal scroll animations to all inner pages
3. Add Privacy Policy + Terms of Service; SVG logos, legibility upgrades, domain fix, phone prominence
4. Local SEO and compliance: sitemap, robots.txt, cookie consent, schema upgrades
5. Revert logos to transparent PNGs; silence JSON-LD inline hint
6. Page load animation refactor
7. **Jerry & Co. Website v1 launched 🚀** (current HEAD)

---

## Planning documents in `docs/`

Three blueprint documents drove development. None have formal status trackers/checkboxes built in — status below is inferred by comparing each doc's spec against the current codebase.

### 1. `FEATURE-PLAN-V2.md` — Visual identity, homepage rework, footer, nested pages, animation polish
**Mostly implemented, though not always literally as spec'd:**
- ✅ Phase 5A — Condo strip converted to 3 image cards (`.condo-cards-grid` / `.condo-bcard` in `index.astro`) — done, though class names differ from the plan's `condo-cards-grid` spec (that part matches) with `PlaceholderImage` components wired to Cloudinary.
- ✅ Phase 6A — Footer newsletter signup block shipped (`.footer-newsletter` in `Footer.astro`), wired to a real Formspark endpoint via `FORMSPARK_NEWSLETTER_ID` env var (not a `#` placeholder as originally planned — this went further than spec).
- ✅ Phase 7A/7B — Breadcrumb + hero unification done across `about.astro`, `faq.astro`, `guarantee.astro`, `our-process.astro`, `financing.astro`, `gallery.astro` (all have `BreadcrumbList` schema + in-hero breadcrumb styling).
- ⚠️ **Phase 4A (scroll-aware header) — NOT implemented.** No `.scrolled` class or scroll listener exists in `Header.astro`. The header currently uses a single static logo (`/img/brand/logo-navbar.png`), not the light/dark swap-on-scroll design from the plan.
- ⚠️ Phase 4B (logo light/dark swap) — superseded; only one logo asset is wired into the header (Footer uses a separate white-transparent logo). No hover scale animation confirmed on either.
- Phases 4C/4D (bone palette, font scale) — appear applied (`--bone: #FDFAF5`, body `font-size: 18px` match spec).
- Not independently verified: Phase 5B (estimate band 2×2 stat grid layout), Phase 8B/8C (card hover audit, `.pp-card` alignment fix) — worth a visual QA pass.

### 2. `ANIMATION-PLAN.md` — Hover polish, load/scroll-reveal system, mobile layout (3 phases, ~4.5 days estimated)
- `data-reveal` scroll-animation system is wired site-wide (confirmed via commit 2 and usage in `index.astro`, guide pages, etc.) and IntersectionObserver-based per spec.
- Page-load animation got a dedicated refactor commit (commit 6).
- Detailed phase-by-phase completion not independently verified — recommend a fresh pass against Phase 1 (hover) / Phase 3 (mobile layout) checklists in the doc.

### 3. `COPY-AUDIT-IMPLEMENTATION.md` — Direct-response copy rewrite (30 P1 / 155 P2 / 232 P3 items, 10 phases)
- ⚠️ **Phase 1 (Homepage P1 rewrites) does NOT appear applied.** The doc's suggested Hero H1 rewrite ("Your kitchen in factory-smooth 2K polyurethane...") is not present in `index.astro`; the site still runs the original "Factory-grade..." copy the audit flagged as a defect (vague claim, no price/mechanism).
- Given Phase 1 (the first, most critical phase) looks unapplied, **Phases 2–10 (global components, inner pages, service-area pages, planning guides, SEO meta, P3 polish) should be treated as not started** unless verified otherwise.
- This is the single largest known gap — 30 P1 "conversion-breaking" items were identified and, on spot-check, are still live on the site.

### 4. `IMAGE-MANIFEST.md` — Cloudinary asset checklist
- Only 1 of 19 tracked `public_id` rows is marked ✅ uploaded in the doc itself — but the doc's checkbox may simply be stale/unmaintained rather than reflecting real upload state (the site is live, so most images are presumably uploaded). **Recommend re-verifying actual Cloudinary asset presence rather than trusting this doc's checkboxes.**
- Upload priority order defined: hero/ → brand/, areas/, financing hero → featured/, projects/ → cta/, vs-replacement/, cost/ → services/, process/, about/, guarantee/, financing (lazy) → brand/og-default → pages/ (legacy).

### 5. `SITEMAP.md` — 27 indexable pages
Reference document, appears current (core pages, 5 project case studies, 4 planning guides, 8 town-based cabinet-refinishing landing pages, 1 API route for estimate form).

---

## Known pending / recommended next work

1. **Copy Audit Phase 1 (homepage P1 rewrites)** — highest priority. The audit flagged the current hero H1 and related homepage copy as conversion-breaking; the rewrites exist in the doc but aren't shipped. Load the `jerryco-copywriting` skill and the Congruence Checklist before touching copy.
2. **Header scroll-aware behavior (Feature Plan 4A/4B)** — not implemented; header doesn't currently switch style/logo on scroll the way the blueprint specifies. Decide whether this is still wanted post-launch or was intentionally dropped in favor of the current static header.
3. **Verify Feature Plan 5B, 8B, 8C** (estimate band layout, card hover audit, project-slug card alignment) with a live visual pass — not confirmed done or not done from static inspection.
4. **Verify actual Cloudinary uploads** against `IMAGE-MANIFEST.md` — the doc's own checklist is nearly empty, which is likely just unmaintained bookkeeping, but should be confirmed so no image slots are silently falling back to the placeholder shell in production.
5. **Copy Audit Phases 2–10** — global components, inner pages, service-area (town) pages, planning guides, SEO titles/meta, and P3 polish — treat as not started pending verification, prioritize per the doc's execution-order table.

---

## Environment / config notes

- `.env` exists at repo root (`FORMSPARK_NEWSLETTER_ID` and likely other keys — not enumerated here for security, check the file directly).
- `wrangler.jsonc` present — deployed via Cloudflare Workers.
- `jerryco-copy-audit-v1.csv` (114KB) sits in the *outer* project folder — full raw audit data backing `COPY-AUDIT-IMPLEMENTATION.md`.
- Two Claude Code skills are installed locally in `.claude/skills/`: `jerryco-copywriting` (voice/persona/framework-driven copy) and `jerryco-visual-prompting` (AI image/video generation prompts matching brand aesthetic) — load these before doing copy or visual asset work respectively.

---

## Working-style notes for continuity

- User prefers plain-text outlines with a baked-in recommendation over `AskUserQuestion`-style multi-choice prompts for creative/planning work.
- For any multi-phase image-generation work, pause after each phase and show results — wait for explicit approval before generating the next batch.
