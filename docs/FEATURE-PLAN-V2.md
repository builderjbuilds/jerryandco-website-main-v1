# Jerry & Co. — Feature Plan V2

**Scope:** Visual identity refresh, homepage rework, footer enhancement, nested-page cleanup, animation polish  
**Build target:** Astro v7 + Cloudflare Workers — prerendered static HTML  
**Cloudinary cloud:** `dxuuydoee` (NEVER `jerryandco`)

---

## Phase 4 — Identity, Tokens & Nav

### 4A · Scroll-aware header
- **File:** `src/components/Header.astro`
- Add `scroll` event listener; after `scrollY > 48` add `.scrolled` to `<header>`. Reset at zero.
- CSS: `.scrolled` → `background: rgba(247,243,234,0.96)` + `backdrop-filter: blur(10px)` + faint bottom shadow.
- All nav text, logo, links flip to dark (`--forest`) via the single `.scrolled` class toggle.
- Transition: `background 0.3s ease, box-shadow 0.3s ease`.

### 4B · Real logo images + hover animation
- **Files:** `src/components/Header.astro`, `src/components/Footer.astro`, `public/img/brand/`
- Copy brand assets from `assets/img/brand/` → `public/img/brand/`.
- Header: replace inline SVG mark + wordmark span with `<img src="/img/brand/logo-horizontal-dark.png">` (height 28–32px). When `.scrolled`, switch to `logo-horizontal-dark.png` (dark version on light bg). At default (dark header) use `logo-horizontal-light.png`.
- Footer: replace inline logo SVG + "Jerry & Co." text with `<img src="/img/brand/logo-mark-light.png">` (height 36px).
- Hover on both logo anchors: `transform: scale(1.04)`, transition `0.2s ease`.

### 4C · Bone palette lighter
- **File:** `src/styles/tokens.css`
- Bump `--bone` to `#FDFAF5` (from current value).
- Bump `--bone-deep` to `#F6F1E7`.
- Verify no component breaks at the new value — check dark-on-light contrast.

### 4D · Font scale +1pt
- **File:** `src/styles/global.css`
- Body base: `17px → 18px`.
- `h4`: `1.0625rem → 1.125rem`.
- `.lede` clamp min: `1.0625rem → 1.125rem`.
- `.section-lede` / `.section-lede-center`: `1.0625rem → 1.125rem`.
- `.eyebrow`: `11.5px → 12px`.

---

## Phase 5 — Homepage Sections Rework

### 5A · Condo-strip → Visual image cards
- **File:** `src/pages/index.astro`
- Replace horizontal text strip with 3 standalone image cards.
- Each card: `PlaceholderImage` (16:9, Cloudinary `dxuuydoee`), bold `<h3>` benefit headline, 1-sentence supporting copy.
- Layout: 3-column grid desktop → 1-column mobile.
- Card CSS: `border-radius`, subtle shadow, hover `translateY(-4px)` + image `scale(1.04)` at `0.22s cubic-bezier(0.22,1,0.36,1)`.
- Card image subjects: HOA / neighbor-friendly process, condo lifestyle, finished kitchen.
- Apply `data-reveal="scale"` + staggered `data-delay` to each card.

### 5B · Estimate band redesign
- **File:** `src/pages/index.astro`
- Remove `estimate-cta-img` from the band (image hidden at 900px anyway; wasted space).
- Rework as a tight contained panel: left = headline + lede + single CTA button; right = `2×2` stat grid (Same-day quote / No obligation / 3 estimate options / MA HIC Licensed).
- Reduce top/bottom padding — let the tier cards below carry the product detail.
- Mobile: stats stack below the copy in a 2-column grid.

---

## Phase 6 — Footer Newsletter

### 6A · Newsletter signup block
- **File:** `src/components/Footer.astro`
- Insert a horizontal `.footer-newsletter` band between `.footer-grid` and `.footer-bottom`.
- Left col: `<h4>` headline ("Design tips, budget guides & project planning — monthly.") + 1-line subtext.
- Right col: email `<input>` + "Subscribe" `<button>`.
- Style: dark-theme input (`--line-dark` border, `--bone` placeholder text), `--gold` submit button.
- Form `action` placeholder (`#`) — wire to Mailchimp / ConvertKit endpoint when ready.
- Mobile: stacks vertically, input goes full-width.
- No backend code — static HTML form only.

---

## Phase 7 — Nested Pages Hero & Breadcrumb Unification

### 7A · vs-hero breadcrumb pattern → all nested pages
- **Reference pattern:** `cabinet-refinishing-vs-replacement.astro` `.vs-hero` with breadcrumb as first child inside the hero section.
- **Target pages:**
  - `about.astro`
  - `faq.astro`
  - `guarantee.astro`
  - `our-process.astro`
  - `financing.astro`
  - `gallery.astro`
  - `projects/index.astro`
  - `guides/[service].astro`
  - `projects/[slug].astro`
  - `cabinet-refinishing-[town].astro`
- Breadcrumb: inline nav, `color: rgba(--bone, 0.55)`, `>` separator, current page muted / not linked.
- Breadcrumb lives as first element inside the existing hero `<section>`, not outside it.

### 7B · Eliminate standalone top banners
- **Target pages:** `about.astro`, `faq.astro`, `guarantee.astro`, `our-process.astro`, `financing.astro`
- Remove the separate `.breadcrumb-wrap` div that floats above the hero.
- `faq.astro` has a `.page-hero` banner — remove it and fold `h1`+`lede` into the first content section (FAQ accordion section), keeping the breadcrumb inside that section's hero container.
- Clean up orphaned CSS classes after removal.

---

## Phase 8 — Animation & Interaction Polish

### 8A · Planning guide scroll-reveal (completeness check)
- **File:** `src/pages/guides/[service].astro`
- Phase 2 wired `data-reveal` to most sections — verify all sections added in Phase 7 edits also carry `data-reveal` attributes.
- Add missing reveals to any newly restructured sections resulting from 7A/7B.

### 8B · Card hover audit — all nested pages
- **Files:** `src/styles/components.css`, `src/pages/index.astro`, `src/pages/projects/index.astro`, `src/pages/guides/[service].astro`
- **Global card hover standard:**
  - Lift: `transform: translateY(-4px)`, `box-shadow` increase
  - Image zoom: inner `<img>` `transform: scale(1.04)`
  - Transition: `0.22s cubic-bezier(0.22,1,0.36,1)` on all properties
- **Targets by page:**
  - `projects/index.astro` — `.proj-card`: lift + shadow + image scale
  - `guides/[service].astro` — `.aq-item`, `.pp-card`, `.maint-card`: lift
  - `index.astro` — `.service-card`, new condo image cards, `.tier-card`: verify + fill gaps
- Add `overflow: hidden` to any card that doesn't already have it (needed for image scale clip).

### 8C · proj-process-grid alignment fix
- **File:** `src/pages/projects/[slug].astro`
- Inspect `.pp-card` at all active breakpoints.
- Fix vertical alignment: `align-items: start` on cards, consistent top-padding on step number badge.
- Ensure step numbers, titles, and body text align uniformly across cards in the same row.

---

## Execution Order

```
Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8
```

Each phase is independently deployable. Phases 4 and 5 have the highest visual impact and should be reviewed on the live URL before 7 and 8 run.

---

## File Change Summary

| File | Phases |
|------|--------|
| `src/components/Header.astro` | 4A, 4B |
| `src/components/Footer.astro` | 4B, 6A |
| `src/styles/tokens.css` | 4C |
| `src/styles/global.css` | 4D |
| `src/pages/index.astro` | 5A, 5B |
| `src/pages/about.astro` | 7A, 7B |
| `src/pages/faq.astro` | 7A, 7B |
| `src/pages/guarantee.astro` | 7A, 7B |
| `src/pages/our-process.astro` | 7A, 7B |
| `src/pages/financing.astro` | 7A, 7B |
| `src/pages/gallery.astro` | 7A |
| `src/pages/projects/index.astro` | 7A, 8B |
| `src/pages/guides/[service].astro` | 7A, 8A, 8B |
| `src/pages/projects/[slug].astro` | 7A, 8C |
| `src/pages/cabinet-refinishing-[town].astro` | 7A |
| `src/styles/components.css` | 8B |
| `public/img/brand/` | 4B (asset copy) |
