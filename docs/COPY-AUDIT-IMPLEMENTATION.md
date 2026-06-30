# Copy Audit — Phased Implementation Plan
**Framework:** Jerry & Co. Direct-Response Copywriting Engine (`jerryco-copywriting` skill)  
**Source:** `jerryco-copy-audit-v1.csv` (v2 — expanded audit)  
**Governance:** All rewrites pass the Congruence Checklist in `SKILL.md` before shipping  
**Counts:** 30 P1 items · 155 P2 items · 232 P3 items (Keep/Keep+Migrate/Keep+Model)

---

## Execution order

| Phase | Scope | Priority | Pages |
|---|---|---|---|
| **1** | Homepage — P1 critical failures | P1 | index.astro |
| **2** | Global components | P1+P2 | Header, Footer, TrustBar, HeroCarousel |
| **3** | Homepage — P2 sections (cards, process, gallery, area, tiers) | P2 | index.astro |
| **4** | Inner pages — P1+P2 (About, FAQ, Colors, Quiz, Projects, Project slugs) | P1+P2 | 8 pages |
| **5** | Service area pages — all 8 | P1+P2 | cabinet-refinishing-[town].astro |
| **6** | Supporting pages (Process, Guarantee, Financing, Gallery, Colors, VS) | P2 | 6 pages |
| **7** | Planning guides | P2 | guides/[service].astro |
| **8** | Keep+Migrate — surface best-in-class lines across the site | — | 5 target pages |
| **9** | SEO titles + meta descriptions | P2 | 8 pages |
| **10** | P3 polish — minor additions to keeper copy | P3 | site-wide |

**Before touching any file:** load `SKILL.md`. Pull reference files only as needed per step.

---

## Phase 1 — Homepage P1: Conversion-Breaking Failures
**File:** `src/pages/index.astro`  
**References:** `copywriting-frameworks.md` (Schwartz Level 3–4 → mechanism-led), `proof-library.md` (pricing anchors), `voice-of-customer.md` (swipe file)

### 1A — Hero H1
| | |
|---|---|
| **Current** | "Factory-grade finishes built for Boston condo living — done in days, not weeks, with zero neighbor drama." |
| **Defect** | "Factory-grade" is vague. No 2K mechanism. No price. LF5 fires but LF3 absent. |
| **Rewrite** | "Your kitchen in factory-smooth 2K polyurethane — the finish that outlasts latex by a decade. Done in 3 days, $15K less than replacement." |

### 1B — Condo Strip H2
| | |
|---|---|
| **Current** | "We know how Boston buildings work." |
| **Defect** | We-first. No proof. No consequence for the prospect. |
| **Rewrite** | "The HOA won't be a problem. The elevator window is already scheduled. Your neighbors won't hear a thing." |

### 1C — Services Section H2
| | |
|---|---|
| **Current** | "Refresh and renovation organized by the work it actually takes." |
| **Defect** | Describes the section, not a desired outcome. Zero LF firing. |
| **Rewrite** | "From a 3-day kitchen transformation to a gut-free bath refresh — choose the scope that fits your condo." |

### 1D — Cabinet Refinishing Card TAG ⚠️ internal language in live copy
| | |
|---|---|
| **Current** | "2–5 days · highest-margin craft differentiator" |
| **Defect** | "Highest-margin craft differentiator" is internal business language accidentally published to consumers. |
| **Rewrite** | "2–5 days · the only factory-grade finish available in Greater Boston" |

### 1E — Estimate Form EYEBROW
| | |
|---|---|
| **Current** | "Get started" |
| **Defect** | Weakest eyebrow on the page. Generic call-to-action label, zero desire. |
| **Rewrite** | "3 details. 60 seconds. Same-day estimate." |

### 1F — Estimate Form H2
| | |
|---|---|
| **Current** | "Tell us about your unit — we handle the building logistics." |
| **Defect** | "Tell us" is instruction-first. "We handle" is a feature. |
| **Rewrite** | "3 details. 60 seconds. Same-day written estimate — no obligation." |

### 1G — Estimate Form Stat 1 — reorder
| | |
|---|---|
| **Current order** | 1. 5 min text confirmation → 2. 1hr callback → 3. 3 tiers |
| **Defect** | The 1hr callback is the strongest differentiator (78% buy from first responder) — it must lead. 5-min text is expected, not surprising. |
| **Correct order** | 1. "1 hr — Personal callback to schedule your walkthrough" → 2. "Written estimate within 24 hrs" → 3. "3 price options on every estimate — good, better, best. You pick the scope." |

### 1H — Tiers / Close CTA H2
| | |
|---|---|
| **Current** | "Every estimate comes in three options." |
| **Defect** | Process not desire. The mechanic not the benefit. |
| **Rewrite** | "You won't be forced to choose between cheap and right." |

### 1I — Service Area Section H2
| | |
|---|---|
| **Current** | "Home to Greater Boston's highest density of condos, triple-deckers, and condo conversions — the buildings we know best." |
| **Defect** | Describes geography. No consequence for the prospect. |
| **Rewrite** | "If your building has a freight elevator policy and an HOA, we've probably already worked in it." |

### 1J — Global CTABand — per-page variants
The default "Get your free video estimate" headline is identical across 8+ pages. Replace:

| Page | Rewrite |
|---|---|
| About | "Get your estimate from Jeremiah — not a call center." |
| Gallery | "Your kitchen — before and after. Get a written estimate today." |
| Our Process | "Start your 5-step process — video estimate takes 20 minutes." |
| Guarantee | "Get your written estimate — 2-year guarantee included from the start." |
| Financing | "Get your estimate — and ask about spreading the cost over time." |
| Colors | "Get a same-day written estimate." *(current — keep verbatim, already strong)* |
| vs. Replacement | "Get a free estimate — no ranges no surprises." *(current — keep verbatim)* |
| **FAQ CTABand H2** | "Get a free estimate — and ask us anything." *(current — keep verbatim; best FAQ close on site)* |

**Note:** The Cabinet Refinishing Guide CTABand — "Every estimate starts with a video walkthrough — no obligation, no pressure, just a clear written scope." — is the site-wide benchmark. Do not change it.

---

## Phase 2 — Global Components
**Files:** `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/TrustBar.astro` (or wherever trust ticker lives), hero carousel component  
**References:** `proof-library.md` (speed-to-lead stats, HIC), `voice-of-customer.md`

### 2A — Header: Nav CTA (desktop + mobile)
| | |
|---|---|
| **Current** | "Get free estimate" |
| **Rewrite** | "Get video estimate — same day" |

### 2B — Header: Nav Services dropdown link
| | |
|---|---|
| **Issue** | "Full Bathroom Reno" in nav vs. "Full bathroom renovation" on service card — inconsistent label creates cognitive friction |
| **Action** | Standardize to one label site-wide once Phase 3 service card H3s are locked |

### 2C — TrustBar: Item 2 — anchor fix
| | |
|---|---|
| **Current** | "EPA RRP Lead-Safe Certified" — links to /faq/ |
| **Fix** | Keep text. Update anchor to `/faq/#materials` so click lands on the relevant section |

### 2D — TrustBar: Item 4
| | |
|---|---|
| **Current** | "HOA & building-compliant process" |
| **Defect** | "Process" is vague. No specific outputs. |
| **Rewrite** | "HOA docs handled, freight elevator booked, COI on request" |

### 2E — TrustBar: Item 5
| | |
|---|---|
| **Current** | "Workmanship Guarantee" |
| **Defect** | No term. No backing. Every contractor claims a guarantee. |
| **Rewrite** | "2-year workmanship guarantee — in writing, backed by the owner." |

### 2F — Footer: Newsletter headline
| | |
|---|---|
| **Current** | "Design tips, budget guides & project planning — monthly." |
| **Defect** | No promised outcome. "Design tips" is category not desire. |
| **Rewrite** | "The Boston condo owner's home improvement newsletter — one useful update a month." |

### 2G — Footer: Newsletter sub-copy
| | |
|---|---|
| **Current** | "For condo owners thinking about their next update. No spam, unsubscribe anytime." |
| **Rewrite** | "For homeowners who want the job done right, not just done." |

### 2H — Footer: Newsletter CTA button
| | |
|---|---|
| **Current** | "Subscribe" |
| **Rewrite** | "Send me the guide" *(or "Join the list" as secondary option)* |

### 2I — Footer: Company column link label
| | |
|---|---|
| **Issue** | Footer shows "Our Work" but Projects Index page H1 says "Projects & case studies" — inconsistent |
| **Action** | After Phase 4 updates the Projects Index H1 to "Real kitchens across Greater Boston — before and after," standardize footer link to "Our Work" (shorter is correct for nav) |

### 2J — HeroCarousel: Stat 1
| | |
|---|---|
| **Current** | "2019 / Operating in Greater Boston" |
| **Defect** | "Operating in" is corporate language. |
| **Rewrite** | "2019 / Serving Greater Boston" |

---

## Phase 3 — Homepage P2: Cards, Process, Gallery, Service Area, Tiers
**File:** `src/pages/index.astro`  
**References:** `personas.md` (P3 condo refresher for cards, P4 for multi-unit), `voice-of-customer.md`

### 3A — Hero section
| Element | Current | Rewrite |
|---|---|---|
| Eyebrow | "For condo owners in Greater Boston" | "Cambridge · Somerville · Medford · Arlington" |
| Lede | "We work within HOA guidelines…" | "Your condo board approved. Your neighbors undisturbed. Your kitchen done in 3 days — without demo, dust, or elevator complaints." |
| Credibility line | "Trusted in Somerville, Cambridge…" | "100+ kitchens across Somerville, Cambridge, and Medford since 2019. 5.0 on Google." |

### 3B — Condo Strip cards
| Element | Current | Rewrite |
|---|---|---|
| Card 1 H3 | "HOA-Ready by Default" | "No board rejections. No project delays." |
| Card 2 H3 | "Zero Neighbor Drama" | **Keep verbatim** |
| Card 2 body | "Low-VOC materials and contained spray process. Same-day cleanup…" | "Low-VOC spray contained within your unit. By noon on spray day the unit smells normal — your neighbors won't know the work happened." |
| Card 3 H3 | "We Handle the Building" | "You don't talk to building management once." |
| Card 3 body | "…every logistics detail is coordinated by our team." | Replace "by our team" with "by Jeremiah." |
| Eyebrow | "Built for condo living" | "7 years in Boston's most restrictive buildings" |
| Proof line | "7 years navigating condo boards…" | "7 years · 100+ projects · every building type in the ICC zone." |

### 3C — Services section lede + card details

**Services lede:**
| | |
|---|---|
| **Current** | "Every project starts the same way — a free video walkthrough and a three-tier proposal…" |
| **Rewrite** | "You get three price options on every job — good, better, best — so you're never forced between cheap and right." |

**Services section eyebrow:**
| | |
|---|---|
| **Current** | "Service portfolio" |
| **Rewrite** | "What we do — and what it costs" |

**Cabinet Refinishing card:**
| Element | Current | Rewrite |
|---|---|---|
| H3 | "Cabinet refinishing" | "Cabinet refinishing — 2K factory finish" |
| Body | Keep verbatim | Append: "Compare to $20,000–$50,000 full replacement." |

**Bathroom Refresh card:**
| Element | Current | Rewrite |
|---|---|---|
| Body | Keep verbatim | Append: "Starting at $2,800 — typically paired with cabinet refinishing for a full kitchen-and-bath update." |
| TAG | "2–5 days · pairs well with cabinet refinishing" | "2–5 days · most clients combine with cabinet refinishing" |

**Interior Painting card:**
| Element | Current | Rewrite |
|---|---|---|
| H3 | "Interior painting & refresh" | "Lead-safe interior painting — low-VOC, contained within your unit." |
| Body | Opens with H3 repeat | Remove H3 repeat from lede. Open with: "Pre-1978 condo? We handle lead-safe prep, low-VOC product, and full containment — no building fines, no neighbor complaints." |
| TAG | "1–4 days · most flexible scheduling" | "1–4 days · acknowledged within 60 min, quoted within 24 hrs" |

**Full Bathroom Renovation card:**
| Element | Current | Rewrite |
|---|---|---|
| H3 | "Full bathroom renovation" | "Full gut renovation — subfloor to finish, permitted and board-approved." |
| Body | Keep verbatim — strongest card body on page | Keep |
| TAG | "5–12 days · written contract per MA law" | Keep verbatim + Migrate to estimate form reassurance text |

**Multi-Unit card:**
| Element | Current | Rewrite |
|---|---|---|
| H3 | "Multi-unit & building refresh" | "Multi-unit cabinet & bath refresh — per-unit preferred-vendor pricing." |
| Body | Missing mechanism + price model | Add: "Same 2K factory finish across every unit — one contractor, one scope, per-unit fixed pricing." |
| TAG | "Contact for scope & timeline" | "Turnover window guaranteed — ask about per-unit pricing." |

### 3D — Process section
| Element | Current | Rewrite |
|---|---|---|
| Eyebrow | "How it works" | "The 5-step factory-finish process" |
| H2 | "The Jerry & Co. factory-finish process" | "5 steps — from video estimate to finished kitchen in 3 days." |
| Lede | "Every cabinet refinishing project follows the same five stages…" | "You know exactly what happens each day — and your kitchen is back in 2–5 days." |
| Step 01 H3 | "Video walkthrough & estimate" | "Your estimate in 60 minutes — no in-person appointment." |
| Step 02 H3 | "Prep & contained setup" | "Day 1: Everything masked, tagged, and staged — while you're at work." |
| Step 03 H3 | "Hand sand & surface repair" | "Day 2: Hand-sanded, repaired, ready for finish." |
| Step 04 H3 | "2K spray application" | "Day 2–3: The factory finish goes on — smooth, hard, and odor-gone by evening." |
| Step 05 H3 | "Cure & walkthrough" | "Day 4–5: The reveal — plus your labeled touch-up bottle and 2-year guarantee." |

*(All step body paragraphs — Keep verbatim. Best process copy on the site.)*

### 3E — Gallery section
| Element | Current | Rewrite |
|---|---|---|
| H2 | "Before & after by project type" | "This is what $5,000 looks like in a Medford kitchen." |
| Eyebrow | "Recent work" | "Real projects — Boston condos and triple-deckers" |
| Lede | "…from across the ICC zone." | Replace "ICC zone" with "Medford to Cambridge to Winchester" |

### 3F — Service Area section
| Element | Current | Rewrite |
|---|---|---|
| Eyebrow | "Where we work" | "Your town — yes, we work there" |
| Lede | "Somerville & Cambridge — triple-decker conversions…" | "If your building has HOA rules, a freight elevator policy, and neighbors who will notice the work — that's exactly where we work." |
| Secondary zone eyebrow | "Secondary zone" | "Expanding to your town" |
| Secondary zone H2 | "North suburban ring" | "Stoneham · Burlington · Wilmington · Reading — ask if we can help." |
| Secondary zone note | "Not seeing your town? Ask us — we may still be able to help." | "Not listed? Ask — we've said yes to towns not on this list." |

### 3G — Testimonials section
| Element | Current | Rewrite |
|---|---|---|
| Eyebrow | "Client reviews" | "What Boston condo owners say — in their own words." |
| H2 | "What Boston condo owners say." | "Condo owners who didn't want the drama — here's what they found." |
| Scores strip | "5.0 Google / 5.0 Houzz Pro / MA HIC #208336" | Keep structure. Add review count: "5.0 Google (X reviews)" |

### 3H — Estimate form details
| Element | Current | Rewrite |
|---|---|---|
| Lede | "A few details now means a same-day, line-item estimate with no obligation." | "A 60-second form. A written fixed-price estimate by end of day. Zero obligation." |
| Stat 3 label | "3 — Estimate tiers — good / better / best" | "3 price options on every estimate — good, better, best. You pick the scope." |

### 3I — Tiers section
| Element | Current | Rewrite |
|---|---|---|
| Eyebrow | "Trusted by condo owners across the ICC zone" | "Trusted by condo owners from Medford to Cambridge to Winchester." |
| Good H3 | "Refresh the finish" | "Factory finish, core doors" |
| Better H3 | "Finish + hardware" | "The complete transformation" |
| Best H3 | "Full unit kitchen" | "Every surface, one standard." |
| Tiers CTA | "Get my free video estimate" | "Start with a video walkthrough — pick my tier after." |
| Financing link | "Ask about financing →" | "Pay over time — ask about financing" |
| Tiers footer note | Keep verbatim + **Migrate** to estimate form reassurance text | |

---

## Phase 4 — Inner Pages P1+P2: About, FAQ, Colors, Quiz, Projects
**Files:** `src/pages/about.astro`, `src/pages/faq.astro`, `src/pages/colors.astro`, `src/pages/cabinet-quiz.astro`, `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`  
**References:** `personas.md` (P1 default for About/FAQ/Colors), `voice-of-customer.md` (swipe)

### 4A — About page

**P1 item:**
| Element | Current | Rewrite |
|---|---|---|
| Condo Expertise H2 | "I know how Boston buildings work." | "Freight elevators, HOA boards, noise curfews — I've run this play in every building type across the ICC zone." |

**P2 items:**
| Element | Current | Rewrite |
|---|---|---|
| Hero eyebrow | "The person behind the work" | "Owner. Estimator. The one mixing the finish." |
| Hero lede | "Jerry & Co. Home Improvement LLC was founded in April 2019…" | "No handoffs. No subcontractors. No rotating crews. The person who walks your kitchen is the person who finishes it." |
| Why I Do This H2 | "Kitchens deserve more than a rush job." | "I started this because too many Boston homeowners were being sold a $40,000 gut renovation when $5,000 of refinishing would have looked better." |
| Owner Compare list item | "Your job matters to me." | "Your project gets the same standard as my first one." *(or remove — weakest item in the list)* |
| Condo Card 1 H3 | "HOA & building coordination" | "You never talk to building management once." |
| Condo Card 3 H3 | "Unit-safe lead & dust controls" | "Pre-1978 building? Lead-safe is standard procedure here." |
| CTABand CTA button | "Request my estimate" | "Get my estimate from Jeremiah" |

**Keep verbatim — audit confirmed:**
- H1: "The owner is the contractor. Every time." *(best H1 on the site)*
- Hero lede (existing) — wait, this one IS Pending. Apply rewrite above.
- Why I Do This P1, P2, P3 paragraphs — all Keep
- "You get me — not whoever's available." H2 — Keep
- All Owner Compare list items except the one noted above — Keep
- All Condo card body paragraphs — Keep
- CTABand eyebrow "Talk to the owner directly" — Keep
- CTABand H2 "Get your free estimate from Jeremiah" — Keep *(benchmark for About-adjacent pages)*

### 4B — FAQ page

**P1 items:**
| Element | Current | Rewrite |
|---|---|---|
| Hero eyebrow | "Questions & Answers" | "Every question Boston condo owners ask before booking." |
| CTABand H2 | "Get a free estimate — and ask us anything" | **Keep verbatim** — audit confirmed this is the strongest FAQ CTABand on the site |

**P2 items:**
| Element | Current | Rewrite |
|---|---|---|
| SEO title | "Cabinet Refinishing FAQ — Jerry & Co. Home Improvement" | "Cabinet Refinishing FAQ — 2K Finish, Condo Logistics & Cost \| Jerry & Co." |
| Hero H1 | "Cabinet Refinishing FAQ" | Keep verbatim (primary keyword target) |
| Section 01 eyebrow | "Section 01" | "01 — How long it lasts." |
| Durability H2 | "Durability & Longevity" | "How long does it hold up?" |
| Section 02 eyebrow | "Section 02" | "02 — What goes on your cabinets." |
| Materials H2 | "Materials & Coatings" | "What we actually apply — and why it matters." |
| Section 03 eyebrow | "Section 03" | "03 — What project days look like." |
| Section 04 eyebrow | "Section 04" | "04 — Building rules and logistics." |
| Condo section H2 | "Condo & Building Logistics" | "We've done this in your building type. Here's how." |
| Section 05 eyebrow | "Section 05" | "05 — Real numbers, no ranges." |
| Cost section H2 | "Cost & Financing" | "What it costs — and how to pay over time." |

**Keep verbatim:** Hero lede · Cost section lede · Process H2 "Process & Disruption" · CTABand eyebrow

### 4C — Colors page

**P1 item:**
| Element | Current | Rewrite |
|---|---|---|
| Hero H1 | "Explore finishes" | "8 cabinet colors. Factory-smooth 2K finish. Which one is your kitchen?" |

**P2 items:**
| Element | Current | Rewrite |
|---|---|---|
| SEO title | "Cabinet Colors & Finishes \| Jerry & Co." | "Cabinet Refinishing Colors & Finishes \| 2K Polyurethane Palette \| Jerry & Co." |

**Keep verbatim:** Hero lede · All color card copy · Custom color note · Quiz CTA section (eyebrow, H2, lede all confirmed Keep) · Finish explainer (H2, comparison table) · All 2K vs. latex list items

### 4D — Cabinet Quiz

**P1 item:**
| Element | Current | Rewrite |
|---|---|---|
| Form Step 1 H3 | "What can we help with?" | "What's the space you want to transform?" |

**Keep verbatim:** Hero H1 · Trust chips · Context strip paragraph *(all three are conversion gold — do not touch)*

### 4E — Projects Index

**P1 item:**
| Element | Current | Rewrite |
|---|---|---|
| Hero lede | "Every project follows the same five-stage process…" | "5 real projects. Real clients. Real numbers — from $6,800 to $13,500. No composites, no stock photos." |

**P2 items:**
| Element | Current | Rewrite |
|---|---|---|
| Eyebrow | "Our work" | "Real kitchens. Real clients. Real numbers." |
| H1 | "Projects & case studies" | "Real kitchens across Greater Boston — before and after." |
| Trust strip item 3 | "Every project — One point of contact, no subs" | "Jeremiah on every project — no subs, no handoffs." |
| CTABand H2 | "Ready to see what Jerry & Co. can do in your home? Get a written quote today." | "Your kitchen. Written quote. 24 hours." |

### 4F — Project case study pages [slug].astro — all 5

**P1 items — CTABand H2 (all passive closes on warm prospects):**
| Project | Rewrite |
|---|---|
| Ceri L. — Charlestown | "Your Charlestown kitchen — written quote in 24 hours. Same process, same finish." |
| Alyssa A. — Charlestown | "Your Charlestown bathroom — 3 days, written quote in 24 hours. No gut required." |
| Julia T. — Boston (bath) | "Your Boston renovation — one contractor, one scope, written quote in 24 hours." |
| Julia T. — Boston (kitchen) | "Your Boston kitchen — same factory finish Julia's whole home now has. Written quote in 24 hours." |
| Nick C. — Somerville | "Your Somerville bathroom — 3 days, $7,400 or similar, written quote in 24 hours." |

**P2 items — shared across all 5 pages:**
| Element | Current | Rewrite |
|---|---|---|
| Process section eyebrow | "Our process — in practice" | "How it happened — step by step." |
| Process section H2 | "How we did it" | "How your kitchen gets this result." |
| Before & After H2 | "Before & after" (bare label, 4th site-wide instance) | Per-project (see below) |

**Per-project Before & After H2:**
| Project | Rewrite |
|---|---|
| Ceri | "What changed in Charlestown." |
| Alyssa | "Three days in Charlestown — before and after." |
| Julia (bath) | "What $11,200 looks like in a Boston bathroom." |
| Julia (kitchen) | "The kitchen — same factory finish as the bathroom." |
| Nick | "What $7,400 looks like in a Somerville bathroom." |

**P2 items — specific pages:**
| Element | Current | Rewrite |
|---|---|---|
| Julia T. bath Hero H1 | "Beautiful, functional, and built to last — bathroom and custom storage done right" | "Boston bathroom refresh and custom storage — built in bone white 2K poly to look original to the space." |
| Julia T. kitchen Hero H1 | "Kitchen cabinet refinishing — a returning client, a new room done right" | "The kitchen gets the same finish as the bathroom — returning client, same 3-day standard." |

**Keep verbatim:** Ceri H1 · Alyssa H1 · Nick H1 · All 5 Fast Facts strips · Ceri/Alyssa/Nick result pull quotes ✓  
**Done:** Julia T. kitchen investment stat (PLACEHOLDER resolved — $3,700 · 3 days · Bone white 2K polyurethane) ✓

---

## Phase 5 — Service Area Pages (8 pages)
**File:** `src/pages/cabinet-refinishing-[town].astro`  
**References:** `personas.md` (P1 for Arlington/Winchester/Medford, P4 for Malden/Everett, P3 for Somerville/Cambridge, P1+P2 for Woburn), `proof-library.md` (ZHVI Cambridge, pricing anchors)

### 5A — P1: "Why Refinishing" H2 — identical jargon defect across all 8 pages
| Town | Rewrite |
|---|---|
| Medford | "Your Medford kitchen has solid-wood boxes worth saving — not replacing." |
| Malden | "Your Malden multi-family. Turnover-ready cabinets. No downtime between tenants." |
| Everett | "Everett multi-family cabinets — refinished between tenants, ready before the next lease." |
| Arlington | "Arlington colonials have the kitchens worth keeping. Here's how to make them look brand new." |
| Somerville | "Somerville kitchens are compact. The right finish makes them feel twice the size." |
| Cambridge | "In Cambridge, a $5,000 refinish against a $1M home value is one of the clearest ROI calls you can make." |
| Woburn | "Woburn kitchens from the 60s and 70s have solid-wood boxes. Save them for $5K. Replace them for $40K. Your call." |
| Winchester | "Winchester colonials were built with solid-wood kitchens. That's worth $5,000 to keep. Not $40,000 to throw away." |

### 5B — P2: Meta titles (all 8)
| Town | Rewrite |
|---|---|
| Medford | "Cabinet Refinishing Medford MA \| From $2,000 \| 2K Factory Finish \| Jerry & Co." |
| Malden | "Cabinet Refinishing Malden MA \| Turnover-Ready \| From $2,000 \| Jerry & Co." |
| Everett | "Cabinet Refinishing Everett MA \| Turnover-Ready \| From $2,000 \| Jerry & Co." |
| Arlington | "Cabinet Refinishing Arlington MA \| From $2,000 \| 2K Factory Finish \| Jerry & Co." |
| Somerville | "Cabinet Refinishing Somerville MA \| From $2,000 \| 2K Factory Finish \| Jerry & Co." |
| Cambridge | "Cabinet Refinishing Cambridge MA \| From $2,000 \| High-ROI Finish \| Jerry & Co." |
| Woburn | "Cabinet Refinishing Woburn MA \| From $2,000 \| 2K Factory Finish \| Jerry & Co." |
| Winchester | "Cabinet Refinishing Winchester MA \| From $4,500 \| Premium 2K Finish \| Jerry & Co." |

### 5C — P2: Hero H1 (all 8)
| Town | Rewrite |
|---|---|
| Medford | "Your Medford kitchen. Factory-smooth 2K finish. Done in 3 days." |
| Malden | "Malden cabinet refinishing — turnover-ready in 2 days, same price every unit." |
| Everett | "Everett cabinet refinishing — turnover-ready, 2 days, same finish every unit." |
| Arlington | "Your Arlington kitchen. Factory-smooth 2K finish. Done in 3 days." |
| Somerville | "Your Somerville kitchen. Factory-smooth 2K finish. Done in 3 days." |
| Cambridge | "Your Cambridge kitchen. High-ROI factory finish. Done in 3 days." |
| Woburn | "Your Woburn kitchen. Factory-smooth 2K finish. Done in 3 days." |
| Winchester | "Your Winchester kitchen. Premium 2K factory finish. Done in 3 days." |

### 5D — P2: Positioning line additions (keep existing text + add)
| Town | Addition |
|---|---|
| Medford | Add "Starting at $2,000 — done in 3 days." to end of existing positioning line |
| Somerville | Add "— 2K factory finish, starting at $2,000." to end of existing line |
| Cambridge | Add "starting at $2,000." to end of existing line |
| Winchester | Add "from $4,500 for full colonial kitchens." |
| Woburn | Rewrite: "Factory-grade cabinet refinishing for Woburn homeowners who don't want to spend $30K when $5K gets the same result." |
| Everett housing note | Add "starting at $2,000 per unit" |

### 5E — P2: Mini-FAQ H2 (all 8)
| | |
|---|---|
| **Current** | "Quick answers" |
| **Rewrite** | "What [Town] homeowners ask before booking." |

### 5F — P2: CTABand H2 (all 8)
| Town | Rewrite |
|---|---|
| Medford | "Your Medford kitchen quoted today — written, fixed price, no obligation." |
| Malden | "Per-unit pricing for Malden landlords — written quote in 24 hours." |
| Everett | "Your Everett unit quoted today — written, fixed price, no obligation." |
| Arlington | "Your Arlington kitchen quoted today — written, fixed price, no obligation." |
| Somerville | "Your Somerville kitchen quoted today — written, fixed price, no obligation." |
| Cambridge | "Your Cambridge kitchen quoted today — ROI-positive at any price point." |
| Woburn | "Your Woburn kitchen quoted today — written, fixed price, no obligation." |
| Winchester | "Your Winchester kitchen quoted today — written, fixed price, no obligation." |

### 5G — P2: Shared section H2s (all 8)
| Element | Current | Rewrite |
|---|---|---|
| Before & After H2 | "Before & After" | "This is what 3 days looks like in a [Town] kitchen." |
| Services H2 | "Services available in this area" | "Cabinet refinishing is the priority. Bathroom and painting available too." |

### 5H — Keep verbatim (audit confirmed)
- Arlington positioning line ✓
- Arlington housing note ✓
- Malden positioning line ✓
- Malden housing note ✓
- Everett positioning line ✓
- Cambridge positioning line ✓ *(add price)*
- Cambridge housing note ✓ *(add price)*
- Winchester positioning line ✓ *(add price bracket)*
- Winchester housing note ✓
- All 8 pages: mini-FAQ eyebrow "Common questions in [Town]" ✓
- All 8 pages: CTABand eyebrow "Free video estimate in [Town]" ✓

---

## Phase 6 — Supporting Pages: Process, Guarantee, Financing, Gallery, VS Page
**Files:** `src/pages/our-process.astro`, `src/pages/guarantee.astro`, `src/pages/financing.astro`, `src/pages/gallery.astro`, `src/pages/cabinet-refinishing-vs-replacement.astro`

### 6A — Our Process page

| Element | Current | Rewrite |
|---|---|---|
| SEO title | "Our 5-Step Cabinet Refinishing Process \| Jerry & Co." | Keep verbatim ✓ |
| Hero eyebrow | "How it's done" | "The 5-step factory-finish process" |
| Hero H1 | "The process step by step." | Keep verbatim ✓ |
| Hero lede | Keep verbatim ✓ | |
| Step 01 H2 | "Video walkthrough & estimate" | "Video estimate — written scope delivered the same day." |
| Step 02 H2 | "Prep & contained setup" | "Day 1 morning: Contained, masked, and ready — no hallway mess." |
| Step 03 H2 | "Hand sand & surface repair" | "No power tools — no noise through your condo walls." |
| Step 04 H2 | "2K polyurethane spray application" | Keep verbatim ✓ (best step H2 on the page) |
| Step 05 H2 | "Cure reinstall & final walkthrough" | "Day 4–5: The reveal — then your touch-up bottle and written guarantee." |
| CTABand eyebrow | "See it for yourself" | "Your kitchen through this exact process." |
| CTABand H2 | "Get your free video estimate" | "Start your 5-step process — video estimate takes 20 minutes." |

**Keep verbatim:** All 5 step callout notes (most specific condo proof on the page) · Deliverables section (eyebrow, H2, all 4 items) · CTABand CTA "Start my estimate" ✓

### 6B — Guarantee page

| Element | Current | Rewrite |
|---|---|---|
| SEO title | "Workmanship Guarantee \| Jerry & Co. Cabinet Refinishing" | "2-Year Workmanship Guarantee \| Cabinet Refinishing \| Jerry & Co." |
| Hero eyebrow | "Our commitment to you" | "Your protection — in writing." |
| Hero H1 | "The Jerry & Co. Workmanship Guarantee." | "2 years. Workmanship defects. Backed by the owner, personally." |
| What's Covered eyebrow | "What's covered" | "What protects you — and for how long." |
| Touch-Up Program eyebrow | "The touch-up program" | "What you get at project close." |
| Local Accountability eyebrow | "Why this matters" | "Why a local guarantee beats a national warranty." |
| CTABand eyebrow | "Ready to get started?" | "Guaranteed from day one." |
| CTABand H2 | "Get a guaranteed refinishing estimate" | "Get your written estimate — 2-year guarantee included from the start." |

**Keep verbatim:** Hero lede · "2 years. Workmanship defects. No runaround." H2 · What's Covered body · All 3 covered items · Touch-Up H2 + lede · Touch-Up list item 4 · "Local accountability beats a national warranty." H2 · Local accountability body paragraph · Not Covered section (eyebrow + H2 + all items) · CTABand CTA ✓

### 6C — Financing page

| Element | Current | Rewrite |
|---|---|---|
| SEO title | "Cabinet Refinishing Financing \| Jerry & Co." | "Pay Over Time — Cabinet Refinishing Financing \| Jerry & Co." |
| Hero eyebrow | "Flexible payment options" | "Your kitchen now. Pay it off over time." |
| Hero H1 | Keep verbatim ✓ | |
| Hero lede | "A kitchen refinishing project is a meaningful investment…" | "A $5,000 kitchen refinishing project doesn't have to wait until you have $5,000 sitting there." |
| Hero CTA | "Ask about financing" | "Ask about financing on your estimate" |
| How It Works eyebrow | "How it works" | "Three steps — from estimate to payment plan in 24 hours." |
| Examples eyebrow | "What it might look like" | "Illustrative monthly payments — at a glance." |
| Examples H2 | "Illustrative monthly payments." | Keep verbatim ✓ |
| Mini-FAQ eyebrow | "Common questions" | "What to know before you apply." |
| CTABand eyebrow | "Ask about payment plans" | "Financing is part of your estimate conversation." |
| CTABand H2 | "Mention financing in your estimate request" | "Get your estimate — and ask about spreading the cost over time." |

**Keep verbatim:** "Three steps. No paperwork pile." H2 · Legal disclaimer · Example card labels · "Most common" pop label · Mini-FAQ H2 ✓

### 6D — Gallery page

| Element | Current | Rewrite |
|---|---|---|
| Hero H1 | "Before & After" | "Before & After — real kitchens across Greater Boston." |
| Stats: "8 / Towns across the ICC zone" | | "8 / Towns from Medford to Winchester" |
| CTABand H2 | "Get your free video estimate" | "Your kitchen — before and after. Get a written estimate today." |

**Keep verbatim:** Hero eyebrow "Real transformations" · Hero lede · Social proof section (eyebrow + H2 + lede) · "7 / Years" stat · "100% / Owner on every job" stat · CTABand eyebrow ✓

### 6E — vs. Replacement page

| Element | Current | Rewrite |
|---|---|---|
| SEO title | "Cabinet Refinishing vs. Replacement \| Jerry & Co." | "Cabinet Refinishing vs. Replacement \| $2,000 vs. $50,000 \| Jerry & Co." |
| Before/After H2 | "See the difference yourself" | "The same kitchen — before refinishing, and 3 days later." |

**Keep verbatim:** Hero eyebrow "The honest comparison" · Hero H1 · Hero lede · Cost chart H2 · Compare table · Decision section · Decision note · CTABand eyebrow + H2 ✓

---

## Phase 7 — Planning Guides
**File:** `src/pages/guides/[service].astro`  
**References:** `personas.md` (P3 primary for cabinet/bathroom, P1+P2 for full reno), `voice-of-customer.md`

### 7A — All 4 guides: Warranty section H2
| Guide | Current | Rewrite |
|---|---|---|
| Cabinet Refinishing | "What's covered" | "2 years. Factory-grade. Backed by the owner." |
| Bathroom Refresh | "What's covered" | "Vanity finish, tile installation, fixtures — here's what holds and for how long." |
| Interior Painting | "What's covered" | "Coverage / adhesion / color match — backed for 1 year." |
| Full Bathroom Reno | "What's covered" | "Waterproofing system / tile / fixtures / permit re-inspection — here's what we stand behind." |

### 7B — Cabinet Refinishing Guide: Hero CTA
| | |
|---|---|
| **Current** | "Get a free video estimate" |
| **Rewrite** | "Get a written cost range — no obligation." |
| **Rationale** | Research-stage visitor isn't ready to book. Lowers friction to match awareness level. |

### 7C — Cabinet Refinishing Guide: Hero eyebrow
| | |
|---|---|
| **Current** | "Planning guide · Cabinet refinishing" |
| **Rewrite** | "Your condo kitchen — before you call anyone." |

### 7D — Interior Painting Guide
| Element | Current | Rewrite |
|---|---|---|
| Hero eyebrow | "Planning guide · Interior painting" | "Planning guide · Lead-safe, low-VOC, condo-compliant painting" |
| Hero H1 | "What to prepare decide and expect before painting your interior" | "Interior painting for condos built before 1978 — lead-safe, low-VOC, and done in 1–4 days." |

### 7E — Full Bathroom Reno Guide: Hero eyebrow
| | |
|---|---|
| **Current** | "Planning guide · Full bathroom renovation" |
| **Rewrite** | "Planning guide · Full gut renovation — permit navigation, board approval, and what it actually costs." |

**Keep verbatim across all 4 guides:** Cabinet guide H1 + subhead + all section H2s except warranty · Bathroom guide H1 + subhead + eyebrow ("gut-free") + all section H2s except warranty · Interior guide subhead + all body callouts · Full reno guide H1 + subhead + pre-planning callout + CTABand H2 ✓

---

## Phase 8 — Keep + Migrate: Surface best-in-class lines
These lines exist on one page but belong on additional pages with higher traffic or conversion intent.

| Copy | Source page | Migrate to |
|---|---|---|
| "Local accountability beats a national warranty." | guarantee.astro | Homepage, near estimate form as trust signal |
| "Not sure which category you're in? A video estimate takes 20 minutes and we'll tell you honestly if refinishing isn't the right call." | vs-replacement.astro | FAQ cost section · About page · Cabinet quiz close |
| "Every tier includes: zero lobby or hallway staging, low-VOC materials only, same-day cleanup, and a certificate of insurance for your HOA." | index.astro (tiers footer) | Estimate form reassurance text · CTABand reassurance |
| "Clients who send 4–6 photos before the walkthrough call typically receive their written quote the same day." | guides/cabinet-refinishing | Homepage estimate form section |
| "A short video walkthrough of your space — even filmed on your phone — gives us everything we need to quote remotely." | guides/interior-painting | Homepage estimate form section |
| "5–12 days · written contract per MA law" | index.astro (full bath card) | Estimate form reassurance + CTABand |
| "If refinishing isn't the right call for your cabinets we'll tell you upfront — not after you've paid a deposit." | cabinet-quiz.astro | about.astro + estimate form |

---

## Phase 9 — SEO Titles + Meta Descriptions
Apply after all body copy is locked. SEO titles for pages not yet covered:

| Page | Update |
|---|---|
| Home SEO title | "Cabinet Refinishing Boston \| From $2,000 \| Factory 2K Finish \| Jerry & Co." |
| About | Keep verbatim ✓ |
| Our Process | Keep verbatim ✓ |
| FAQ | "Cabinet Refinishing FAQ — 2K Finish, Condo Logistics & Cost \| Jerry & Co." |
| Gallery | Keep verbatim ✓ |
| Guarantee | "2-Year Workmanship Guarantee \| Cabinet Refinishing \| Jerry & Co." |
| Financing | "Pay Over Time — Cabinet Refinishing Financing \| Jerry & Co." |
| vs. Replacement | "Cabinet Refinishing vs. Replacement \| $2,000 vs. $50,000 \| Jerry & Co." |
| Colors | "Cabinet Refinishing Colors & Finishes \| 2K Polyurethane Palette \| Jerry & Co." |

**Meta descriptions:** use the Footer blurb as the benchmark — "Factory-grade cabinet refinishing and bathroom refresh for condo owners across Greater Boston — built around your building's rules, your neighbors, and your timeline." — adapt per page.

---

## Phase 10 — P3 Polish (after all P1+P2 complete)
Minor additions to keeper copy — do not rewrite, only append or adjust.

| Item | Action |
|---|---|
| Home Hero CTA-1 "Get my free video estimate" | Consider: "Get my video estimate — reply in 60 min." |
| Home Cabinet Refinishing card body | Append: "Compare to $20,000–$50,000 full replacement." |
| Home Tiers sub-copy | Keep verbatim ✓ — best supporting line on tiers section |
| Financing "Three steps. No paperwork pile." | Consider: "Three steps. 60 seconds. No paperwork pile." |
| TrustBar Item 1 "MA HIC #208336 — Licensed & Verified" | Keep. Consider adding "Mass.gov verified" micro-copy. |
| Gallery "No subcontractors. No rotating crews." | Keep. Add Jeremiah's name to paragraph below. |
| Home Testimonials scores strip | Add verified review count: "5.0 Google (X reviews)" |
| About "You get Jeremiah — not whoever's available." | Consider updating H2 with name for full identity anchoring |
| Footer brand blurb | Append "starting at $2,000." for price transparency |
| VS Page decision note | Migrate and keep ✓ |

---

## Non-Negotiables — Congruence Checklist (QA gate before every PR)

From `SKILL.md` — every rewrite must pass all 12 before shipping:

1. **One persona** named and consistent throughout the page
2. **First line:** town, cost, or outcome — never generic
3. **Cabinet = mechanism-led** — "2K polyurethane" not just "factory-grade"
4. **LF trio:** at least one of LF3 / LF8 / LF5 per section; all three per page
5. **Mental movie present** — sensory, specific, vicarious
6. **Feature → Benefit → Meaning** — no stranded features
7. **Verbatim VoC mirrored** at emotional beats
8. **Price anchored** against $12K–$30K replacement; no "cheap"
9. **Every stat cites** `proof-library.md` source
10. **MA HIC #208336** in every promotional footer
11. **Specific CTA** matched to page awareness stage
12. **Zero generic-contractor phrasing** — no "quality workmanship," "great results," "we take pride"
