# Jerry & Co. — Animations, Hover Effects & Mobile UI Optimization
### Technical Implementation Plan

**Project:** Jerry & Co. Home Improvement LLC — jerryandco-website2  
**Stack:** Astro v7 · Cloudflare Workers · Vanilla JS · CSS Custom Properties  
**Prepared:** June 2026  
**Phases:** 3 · Estimated total: ~4.5 days implementation

---

## Table of Contents

1. [Guiding Principles](#guiding-principles)
2. [Phase 1 — Hover Effect Polish](#phase-1--hover-effect-polish)
3. [Phase 2 — Load-in & Scroll Animation System](#phase-2--load-in--scroll-animation-system)
4. [Phase 3 — Mobile Layout Optimization](#phase-3--mobile-layout-optimization)
5. [Implementation Order](#implementation-order)
6. [Out of Scope](#out-of-scope)

---

## Guiding Principles

| Rule | Reason |
|------|--------|
| **Transform + opacity only** | No layout-triggering properties (`top`, `width`, `height`, `padding`) in any animation — zero repaints |
| **Single lightweight utility** | ~70 lines of vanilla JS + one CSS keyframe file. No GSAP, no AOS, no external libraries |
| **Reduced motion respected** | Existing `prefers-reduced-motion` query in `global.css` covers all durations — zero per-animation work needed |
| **Progressive enhancement** | Every element reads correctly with JS disabled; animations are purely additive |
| **Fire once, unobserve** | IntersectionObserver removes itself after triggering — no continuous scroll listener overhead |

---

## Phase 1 — Hover Effect Polish

**Files touched:** `src/styles/components.css`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/TestimonialsCarousel.astro`  
**Risk:** Zero — pure CSS, no JS, additive only  
**Estimated time:** ~1 day

---

### 1A. Navigation

#### Desktop Dropdown — Slide-down instead of hard cut

Currently `.nav-item:focus-within .dropdown { display: block }` is a hard cut with no transition.

**Replace with opacity + transform reveal:**

```css
/* src/styles/components.css */
.dropdown {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
  pointer-events: none;
}
.nav-item:focus-within .dropdown,
.nav-item:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: auto;
}
```

Add `:hover` alongside `:focus-within` so mouse users get the same reveal.

#### Hamburger → X Morph

The three `.hamburger span` elements already have `transition: transform/opacity 0.2s` but no active-state transforms are defined.

**Add to `Header.astro` `<style>` block:**

```css
header.nav-open .hamburger span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
header.nav-open .hamburger span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
header.nav-open .hamburger span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
```

Toggle `nav-open` on `<header>` from the existing mobile-nav open/close JS block.

#### Nav Phone Underline Draw

```css
.nav-phone {
  position: relative;
}
.nav-phone::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.2s ease;
}
.nav-phone:hover::after { width: 100%; }
```

---

### 1B. Buttons

The shimmer `::after` already exists. These are the missing pieces:

#### Primary CTA Lift — `.btn-gold`

```css
.btn-gold {
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}
.btn-gold:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(200, 160, 85, 0.28);
}
.btn-gold:active { transform: translateY(0); }
```

#### Outline Button Lift — `.btn-outline`

```css
.btn-outline {
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
}
.btn-outline:hover { transform: translateY(-1px); }
.btn-outline:active { transform: translateY(0); }
```

---

### 1C. Service Cards

Currently: `::before` accent bar scaleY + image scale. Missing: card lift.

```css
.service-card {
  transition: background 0.2s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(20, 36, 31, 0.09);
}
.service-card.featured:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(20, 36, 31, 0.13);
}
```

---

### 1D. Gallery Items

The `gi-overlay` `translateY(8px)` shift is barely perceptible. Increase the drama:

```css
.gi-overlay {
  transform: translateY(16px);   /* was 8px */
  transition: opacity 0.3s ease, transform 0.3s ease;  /* was 0.25s */
}
.gallery-item:hover .gi-overlay {
  opacity: 1;
  transform: translateY(0);
}
```

Add image scale (currently absent on gallery items):

```css
.gallery-item img,
.gallery-item .ph-img {
  transition: transform 0.55s ease;
}
.gallery-item:hover img,
.gallery-item:hover .ph-img {
  transform: scale(1.06);
}
```

---

### 1E. Process Steps

Currently background tint only. Add lift:

```css
.process-step {
  transition: background 0.2s ease, transform 0.2s ease;
}
.process-step:hover { transform: translateY(-2px); }
```

---

### 1F. Tier Cards

```css
.tier-card {
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.tier-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 28px rgba(20, 36, 31, 0.08);
}
.tier-card.best:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 36px rgba(20, 36, 31, 0.11);
}
```

---

### 1G. Footer Social Icons

Currently color only (0.2s). Add micro-lift and scale:

```css
.social-row a {
  transition: color 0.2s ease, transform 0.2s ease;
}
.social-row a:hover {
  transform: translateY(-2px) scale(1.15);
}
```

---

### 1H. Before/After Knob

No hover state currently exists on the knob. Add a glow that invites interaction:

```css
.ba-knob {
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.ba-slider:hover .ba-knob {
  box-shadow: 0 2px 14px rgba(0,0,0,0.22), 0 0 0 4px rgba(200,160,85,0.22);
  transform: scale(1.1);
}
```

---

### 1I. Testimonial Carousel Arrows

Currently background + border (0.2s). Add slight scale:

```css
.tc-arrow {
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
}
.tc-arrow:hover { transform: scale(1.08); }
```

---

### 1J. Breadcrumb Links — Underline Draw

```css
.breadcrumb-item a {
  position: relative;
  transition: color 0.15s;
}
.breadcrumb-item a::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--text);
  transition: width 0.2s ease;
}
.breadcrumb-item a:hover::after { width: 100%; }
```

---

## Phase 2 — Load-in & Scroll Animation System

**New files:**
- `src/styles/animations.css` — keyframes + reveal utility classes
- `src/scripts/reveal.ts` — 70-line IntersectionObserver utility

**Modified files:**
- `src/layouts/Base.astro` — import both new files
- `src/components/HeroCarousel.astro` — CSS-only above-fold entrance
- All page `.astro` files — `data-reveal` attribute placement

**Estimated time:** ~2 days

---

### 2A. Animation Keyframes — `src/styles/animations.css`

```css
/* ── Keyframes ────────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Reveal utility — JS adds .is-visible to trigger ──────── */
[data-reveal] { opacity: 0; }

[data-reveal].is-visible {
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-duration: 0.65s;
}
[data-reveal="up"].is-visible    { animation-name: fadeUp; }
[data-reveal="in"].is-visible    { animation-name: fadeIn; }
[data-reveal="scale"].is-visible { animation-name: scaleIn; }
[data-reveal="left"].is-visible  { animation-name: slideRight; }
[data-reveal="right"].is-visible { animation-name: slideLeft; }

/* ── Stagger delay tokens ─────────────────────────────────── */
[data-delay].is-visible { animation-duration: 0.55s; }
[data-delay="1"].is-visible { animation-delay: 0.08s; }
[data-delay="2"].is-visible { animation-delay: 0.16s; }
[data-delay="3"].is-visible { animation-delay: 0.24s; }
[data-delay="4"].is-visible { animation-delay: 0.32s; }
[data-delay="5"].is-visible { animation-delay: 0.40s; }
[data-delay="6"].is-visible { animation-delay: 0.50s; }

/* ── Mobile — tighter motion and faster stagger ───────────── */
@media (max-width: 600px) {
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  [data-delay="2"].is-visible { animation-delay: 0.10s; }
  [data-delay="3"].is-visible { animation-delay: 0.18s; }
  [data-delay="4"].is-visible { animation-delay: 0.24s; }
  [data-delay="5"].is-visible { animation-delay: 0.30s; }
}
```

---

### 2B. Reveal Utility — `src/scripts/reveal.ts`

```ts
(function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;

  // Respect prefers-reduced-motion — mark everything visible immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => {
      el.style.opacity = '1';
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);  // fire once only
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px',  // trigger 48px before element hits viewport bottom
    }
  );

  els.forEach(el => observer.observe(el));
})();
```

Add to `Base.astro` inside `<head>`:

```html
<link rel="stylesheet" href="/styles/animations.css" />
```

Add before `</body>`:

```html
<script src="/scripts/reveal.js" defer></script>
```

---

### 2C. Hero Entrance Sequence — CSS-Only (Above the Fold)

The hero is visible before any scroll. IntersectionObserver fires instantly and stagger logic doesn't apply. Use hard-coded CSS delays instead of `data-reveal`.

**Add to `HeroCarousel.astro` `<style>` block:**

```css
.hero-content .eyebrow {
  animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.10s both;
}
h1 {
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.20s both;
}
.hero-lede {
  animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
}
.hero-actions {
  animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.48s both;
}
.hero-credibility {
  animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.56s both;
}
.hero-meta {
  animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.64s both;
}
```

Reading order on screen: eyebrow → headline → subtext → buttons → meta stats. Each element settles before the next begins.

---

### 2D. Homepage — `src/pages/index.astro` Data Attribute Map

#### Trust Bar (5 items)

```html
<div class="trust-item" data-reveal="up" data-delay="1">
<div class="trust-item" data-reveal="up" data-delay="2">
<div class="trust-item" data-reveal="up" data-delay="3">
<div class="trust-item" data-reveal="up" data-delay="4">
<div class="trust-item" data-reveal="up" data-delay="5">
```

#### Condo Strip (3 cards)

```html
<div class="condo-card" data-reveal="up">
<div class="condo-card" data-reveal="up" data-delay="2">
<div class="condo-card" data-reveal="up" data-delay="4">
```

#### Services Section

```html
<div class="section-head" data-reveal="up">

<div class="service-card" data-reveal="scale" data-delay="1">
<div class="service-card" data-reveal="scale" data-delay="2">
<div class="service-card featured" data-reveal="scale" data-delay="3">
<div class="service-card" data-reveal="scale" data-delay="4">
<div class="service-card" data-reveal="scale" data-delay="5">
```

#### Process Band (5 steps)

```html
<div class="process-step" data-reveal="up" data-delay="1">
<div class="process-step" data-reveal="up" data-delay="2">
<div class="process-step" data-reveal="up" data-delay="3">
<div class="process-step" data-reveal="up" data-delay="4">
<div class="process-step" data-reveal="up" data-delay="5">
```

#### Gallery

Animate the container, not individual cells (performance):

```html
<div class="section-head" data-reveal="up">
<div class="filter-row" data-reveal="in" data-delay="2">
<div class="gallery-grid" data-reveal="in" data-delay="3">
```

#### Testimonials

```html
<div class="section-head" data-reveal="up">
<!-- carousel: no reveal — internally animated -->
<div class="testimonial-score-item" data-reveal="up" data-delay="1">
<div class="testimonial-score-item" data-reveal="up" data-delay="3">
<div class="testimonial-score-item" data-reveal="up" data-delay="5">
```

#### Estimate Section

```html
<div class="estimate-info" data-reveal="left">
<div class="form-card" data-reveal="scale" data-delay="2">
<div class="estimate-cta-img" data-reveal="right" data-delay="3">
```

#### Tiers / Close CTA

```html
<div class="section-head" data-reveal="up">
<div class="tier-card" data-reveal="scale" data-delay="1">
<div class="tier-card best" data-reveal="scale" data-delay="2">
<div class="tier-card" data-reveal="scale" data-delay="3">
```

---

### 2E. About Page — `src/pages/about/index.astro`

#### Hero (above fold) — CSS-Only

```css
/* In about/index.astro <style> block */
.founder-img  { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
.hero-text .eyebrow { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.20s both; }
.hero-text h1 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
.hero-text .lede { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
.hero-creds   { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.58s both; }
```

#### Scroll sections — Data Attributes

```html
<!-- Why I Do This: text left, photo right -->
<div class="why-body"  data-reveal="left">
<div class="why-photo" data-reveal="right" data-delay="2">

<!-- Compare columns: slide from opposite sides -->
<div class="compare-col"          data-reveal="left">
<div class="compare-col compare-us" data-reveal="right" data-delay="2">

<!-- Condo expertise cards -->
<div class="condo-card" data-reveal="up" data-delay="1">
<div class="condo-card" data-reveal="up" data-delay="3">
<div class="condo-card" data-reveal="up" data-delay="5">

<!-- Photo strip -->
<div class="about-strip" data-reveal="in" data-delay="2">
```

---

### 2F. Project Detail Pages — `src/pages/projects/[slug].astro`

#### Hero (above fold) — CSS-Only

```css
.proj-hero-content {
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}
```

#### Scroll Sections

```html
<!-- Fast facts strip -->
<div class="proj-facts" data-reveal="up" data-delay="1">

<!-- Challenge + before photo -->
<div class="proj-challenge-text" data-reveal="left">
<div class="proj-before"         data-reveal="right" data-delay="2">

<!-- Before/after slider — scale entrance + knob pulse -->
<figure class="ba-figure" data-reveal="scale">

<!-- Process steps -->
<div class="process-step" data-reveal="up" data-delay="1">
<!-- through data-delay="5" -->

<!-- Gallery (whole grid) -->
<div class="proj-gallery" data-reveal="in" data-delay="1">

<!-- Testimonial -->
<div class="proj-testimonial" data-reveal="scale" data-delay="1">
```

#### Before/After Knob — One-Shot Pulse on Reveal

Add to `[slug].astro` `<style>` block. Fires once when the slider scrolls into view, directing user attention to the interactive handle:

```css
@keyframes knobPulse {
  0%   { transform: scale(1);    box-shadow: 0 2px 14px rgba(0,0,0,0.18); }
  50%  { transform: scale(1.18); box-shadow: 0 2px 14px rgba(0,0,0,0.18),
                                              0 0 0 8px rgba(200,160,85,0.20); }
  100% { transform: scale(1);    box-shadow: 0 2px 14px rgba(0,0,0,0.18); }
}

.ba-figure.is-visible .ba-knob {
  animation: knobPulse 0.65s ease 0.5s both;
}
```

This is the highest-value single animation on the site — it communicates interactivity without any instruction text.

---

### 2G. Project Index — `src/pages/projects/index.astro`

```html
<div class="section-head" data-reveal="up">

<a class="proj-card" data-reveal="scale" data-delay="1">
<a class="proj-card" data-reveal="scale" data-delay="2">
<a class="proj-card" data-reveal="scale" data-delay="3">
<a class="proj-card" data-reveal="scale" data-delay="4">
<a class="proj-card" data-reveal="scale" data-delay="5">
```

---

### 2H. Guide Pages — `src/pages/guides/[service].astro`

```html
<!-- Hero: CSS-only (above fold), same pattern as other heroes -->

<!-- Self-assessment items -->
<div class="sa-item" data-reveal="up" data-delay="1">
<!-- through data-delay="5" -->

<!-- Pre-planning cards -->
<div class="pp-card" data-reveal="scale" data-delay="1">
<div class="pp-card" data-reveal="scale" data-delay="2">
<div class="pp-card" data-reveal="scale" data-delay="3">

<!-- Decisions group -->
<div class="decision-group" data-reveal="up">

<!-- Workbook phases -->
<div class="wb-phase" data-reveal="up" data-delay="1">
<div class="wb-phase" data-reveal="up" data-delay="3">
<div class="wb-phase" data-reveal="up" data-delay="5">

<!-- Outcomes before/after pair -->
<div class="out-before" data-reveal="left">
<div class="out-after"  data-reveal="right" data-delay="2">

<!-- Maintenance cards -->
<div class="maint-card" data-reveal="scale" data-delay="1">
<div class="maint-card" data-reveal="scale" data-delay="2">
<div class="maint-card" data-reveal="scale" data-delay="3">
```

---

## Phase 3 — Mobile Layout Optimization

**Breakpoint targets:** 320px · 375px · 390px (iPhone 15) · 430px (iPhone 15 Pro Max) · 768px (tablet) · 1024px  
**Estimated time:** ~1.5 days

---

### 3A. Mobile Navigation — Slide-in Animation (`Header.astro`)

Currently `.mobile-nav` uses `hidden` attribute for a hard cut with zero transition.

**Replace hard cut with transform-based reveal:**

```css
/* src/components/Header.astro <style> */
.mobile-nav {
  transform: translateX(100%);
  visibility: hidden;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
              visibility 0.32s;
}
.mobile-nav.is-open {
  transform: translateX(0);
  visibility: visible;
}
```

**Update mobile nav JS to use class toggle instead of `hidden` attribute:**

```js
// Replace: nav.hidden = true/false
// With:
nav.classList.toggle('is-open');
nav.setAttribute('aria-hidden', nav.classList.contains('is-open') ? 'false' : 'true');
```

**Add a backdrop scrim behind the sliding nav:**

```html
<!-- In Header.astro markup, sibling to .mobile-nav -->
<div class="nav-scrim" aria-hidden="true"></div>
```

```css
.nav-scrim {
  position: fixed;
  inset: 0;
  background: rgba(5, 14, 10, 0.55);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.32s ease, visibility 0.32s;
  z-index: 48;
}
header.nav-open .nav-scrim {
  opacity: 1;
  visibility: visible;
}
```

---

### 3B. Hero at Small Viewports (`HeroCarousel.astro`)

At 320px, the `.hero-meta` 3-stat row crowds horizontally.

```css
@media (max-width: 420px) {
  .hero-meta {
    gap: 16px;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 16px;
  }
  .hero-meta div { display: flex; align-items: center; gap: 10px; }
  .hero-meta strong {
    display: inline;
    margin-bottom: 0;
    font-size: 1.1rem;
  }
}
```

**CTA buttons — force clean stack at 320px:**

```css
@media (max-width: 420px) {
  .hero-actions { flex-direction: column; align-items: stretch; }
  .hero-actions .btn { width: 100%; justify-content: center; }
}
```

---

### 3C. Condo Strip (`index.astro`)

Hairline vertical dividers (pseudo-elements on `.condo-strip-grid`) don't collapse cleanly when the grid goes 1-column at 560px. The vertical rules remain structurally vertical but read as misaligned on single-column mobile layout.

```css
@media (max-width: 640px) {
  .condo-strip-grid::before,
  .condo-strip-grid::after { display: none; }

  .condo-strip-item {
    border-bottom: 1px solid var(--line);
    padding-bottom: 24px;
    margin-bottom: 24px;
  }
  .condo-strip-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}
```

---

### 3D. Gallery Overlay on Touch Devices

On mobile, `:hover` never fires — `.gi-overlay` is permanently invisible and the room-type/location labels are never seen.

```css
@media (max-width: 768px) {
  .gi-overlay {
    opacity: 0.92;
    transform: translateY(0);
  }
}
```

Desktop hover-reveal remains intact. On mobile the overlay is always-on at 0.92 opacity so it informs without fully blocking the image.

---

### 3E. Process Band Ghost Watermark

`.process-band::before` is `20vw` font-size. At 375px this renders at 75px and can bleed over step content.

```css
@media (max-width: 600px) {
  .process-band::before {
    font-size: 40vw;
    opacity: 0.018;
    top: -20px;
  }
}
```

---

### 3F. Footer Grid Collapse (`Footer.astro`)

Currently: 5-column → 2-column (880px) → 1-column (560px). At 1-column, five link sections stacked vertically creates excessive scroll. Replace full 1-column with a 2-column sub-grid for the link columns, keeping the brand column full-width.

```css
@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 36px 24px;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 380px) {
  .footer-grid { grid-template-columns: 1fr; }
}
```

---

### 3G. Guide Pages (`[service].astro`)

**Hero text at 600px:**

```css
@media (max-width: 600px) {
  .guide-hero-inner { padding: var(--sp-6) 0; }
  .guide-hero h1 { font-size: clamp(1.625rem, 5.5vw, 2.5rem); }
}
```

**Self-assessment status chips:**

```css
@media (max-width: 600px) {
  .sa-status { padding: 5px 10px; font-size: 9px; }
}
```

**Outcomes before/after pair — force stack:**

```css
@media (max-width: 640px) {
  .out-ba { grid-template-columns: 1fr; }
}
```

---

### 3H. Project Detail Pages (`[slug].astro`)

**Process steps — missing 1-column breakpoints:**

```css
/* Currently only goes to 3-column at 1080px — add finer steps */
@media (max-width: 540px) {
  .proj-process-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 360px) {
  .proj-process-grid { grid-template-columns: 1fr; }
}
```

**Before/after labels — too small at 320px:**

```css
@media (max-width: 420px) {
  .ba-label { font-size: 10px; padding: 3px 8px; }
}
```

**Gallery grid:**

```css
@media (max-width: 540px) {
  .proj-gallery-grid { grid-template-columns: 1fr 1fr; }
}
```

---

### 3I. Testimonials Carousel (`TestimonialsCarousel.astro`)

Attribution row (avatar + name + project link) wraps awkwardly on very small viewports:

```css
@media (max-width: 420px) {
  .testimonial-attribution {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .tc-project-link { margin-top: 0; }
}
```

---

### 3J. Tap Target Audit

All interactive elements must be minimum 44×44px per WCAG 2.5.5.

| Element | Current Size | Fix |
|---------|-------------|-----|
| `.tc-arrow` at 540px | Shrinks to 32px | Keep at 40px, reduce gap instead: `.tc-carousel { gap: 8px; }` |
| `.carousel-dots .dot` on hero | 8px visible, no padding | Add `padding: 18px; margin: -18px;` to create 44px hit area |
| `.filter-btn` in gallery | 44px min-height from `.btn-sm` | Confirm in markup — no change needed |
| `.ba-range` thumb | 44px wide, 100% tall (invisible) | Already correct — no change |
| `.hamburger` | 44px tap area | Confirm min-width/height in Header.astro |

---

## Implementation Order

| Phase | Duration | Gate |
|-------|----------|------|
| **Phase 1 — Hover Polish** | ~1 day | CSS-only, zero risk. Deploy as standalone. |
| **Phase 2 — Animation System** | ~2 days | Day 1: Create files, wire Base.astro, implement homepage + hero. Day 2: Remaining pages. |
| **Phase 3 — Mobile Fixes** | ~1.5 days | Day 1: Nav slide, hero, gallery overlay, footer grid. Day 0.5: Per-page fixes, cross-device QA at 320/375/430px. |

Phases can ship independently. Phase 1 alone is a visible improvement and zero-risk deploy. Phase 2 and 3 can run concurrently if desired.

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| **Parallax scrolling on backgrounds** | Requires continuous scroll listener + constant repaints. Rejected for performance |
| **Number count-up animations** (scores, stats) | JS timer + IntersectionObserver combo; high complexity for low visual payoff at this site scale |
| **Page transition animations** | Astro serves full HTML per route. Requires View Transitions API or JS router. Viable post-launch |
| **Video hero background** | `HeroCarousel.astro` already has `.hero-video` class. Content decision, not animation work |
| **Scroll-linked progress indicators** | Continuous `scroll` listener is layout-janking at scale — not appropriate for a static marketing site |

---

*All animation values use the existing CSS custom property token system (`--forest`, `--gold`, `--bone`, `--sp-*`, `--radius-*`). No new tokens required.*
