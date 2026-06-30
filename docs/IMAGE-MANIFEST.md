# Image Manifest — Jerry & Co. Website

**Cloudinary cloud:** `dxuuydoee`  
**URL pattern:** `https://res.cloudinary.com/dxuuydoee/image/upload/f_auto,q_auto,w_{W}/{public_id}.jpg`  
**Upload:** `node scripts/upload-images.mjs`

Every `public_id` in this file is referenced in source code.  
Images not yet uploaded show the `PlaceholderImage` shell (bone-deep background + centered icon) — never a broken browser icon.

---

## Upload priority

| Priority | Folder(s) | Reason |
|---|---|---|
| 1 — LCP | `hero/` | Carousel slide 0 is the LCP element on every homepage visit |
| 2 — Above fold | `brand/`, `areas/`, `financing/aspirational-kitchen` | Hero portraits and area-page heroes; above the fold with `loading="eager"` |
| 3 — Gallery & projects | `featured/`, `projects/` | Visible in the homepage gallery grid and /gallery/ BA sliders |
| 4 — CTAs | `cta/`, `vs-replacement/`, `cost/` | Decision-point imagery on homepage and comparison page |
| 5 — Supporting | `services/`, `process/`, `about/`, `guarantee/`, `financing/small-*` etc. | Below-fold thumbnails; lazy-loaded |
| 6 — Social | `brand/og-default` | OG/Twitter card; crawled on share, not a visible page element |
| 7 — Legacy | `pages/` | One remaining raw-img slot; lower urgency |

---

## brand/ — 2 images

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `brand/og-default` | All pages (OG meta) | *(social share card — no visible alt)* | 1.91:1 | 1200 × 630 px | n/a (meta tag) |
| `brand/founder-jeremiah` | /about/ — hero portrait | Jeremiah, owner of Jerry & Co., in a refinished kitchen | 4/5 | 1600 × 2000 px | eager |

**Notes:** `og-default` is the fallback for every page that doesn't pass an explicit `ogImage` to `Base.astro`. It should be a branded lifestyle shot — e.g., a wide kitchen after shot with the Jerry & Co. wordmark overlaid.

---

## hero/ — 5 images

All hero slides fill 100vw × 100svh behind a dark gradient overlay. Shoot wide — at least 2400 px wide.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `hero/hero-after-kitchen-white` | / (carousel slide 0, **LCP**) | Bright white condo kitchen after factory spray finish, morning light | 16/9 | 2400 × 1350 px | **eager** |
| `hero/hero-before-after-split` | / (carousel slide 1) | Split before-and-after of a Boston condo kitchen cabinet refinish | 16/9 | 2400 × 1350 px | lazy |
| `hero/hero-bathroom-refresh` | / (carousel slide 2) | White subway-tile condo bathroom after a gut-free refresh | 16/9 | 2400 × 1350 px | lazy |
| `hero/hero-hallway-install` | / (carousel slide 3) | Building-compliant condo hallway protection during install | 16/9 | 2400 × 1350 px | lazy |
| `hero/hero-video-poster` | / (carousel video poster) | *(poster frame — same composition as slide 0)* | 16/9 | 1920 × 1080 px | eager |

---

## services/ — 5 images

Homepage `#services` grid. The `cabinet-refinishing` card is the featured (large) card with a different layout at wide viewports.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `services/cabinet-refinishing` | / — featured service card | Factory-grade cabinet refinishing in a Boston condo kitchen | 4/3 (16/10 at 1080px+) | 1600 × 1200 px | lazy |
| `services/bathroom-refresh` | / — service card | Gut-free condo bathroom refresh — new vanity, tile, and fixtures | 4/3 | 1600 × 1200 px | lazy |
| `services/interior-painting` | / — service card | Interior painting — condo pre-listing refresh with low-VOC paint | 4/3 | 1600 × 1200 px | lazy |
| `services/full-bathroom-reno` | / — service card | Full bathroom renovation in a Greater Boston multi-unit property | 4/3 | 1600 × 1200 px | lazy |
| `services/multi-unit` | / — service card | Multi-unit cabinet turnover — coordinated across 6 identical kitchens | 4/3 | 1600 × 1200 px | lazy |

---

## process/ — 7 images

⚠ **Two different sets of public_ids** reference process steps:

- `index.astro` (homepage process band): slugs `video-walkthrough` and `cure-walkthrough`
- `our-process.astro` (/our-process/ page): slugs `video-estimate` and `final-walkthrough`

Steps 02–04 share the same public_id across both pages. Steps 01 and 05 differ. Shoot both named assets (they can be the same physical photo uploaded under two public_ids, or genuinely different shots).

| public_id | Page(s) | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `process/step-01-video-walkthrough` | / homepage | Owner walking a kitchen on a live video estimate call | 4/3 | 1600 × 1200 px | lazy |
| `process/step-01-video-estimate` | /our-process/ (step 1, **eager**) | Jeremiah conducting a video estimate call on a tablet | 4/3 | 1600 × 1200 px | **eager** |
| `process/step-02-prep-containment` | / + /our-process/ | Sealed plastic dust containment inside a condo kitchen | 4/3 | 1600 × 1200 px | lazy |
| `process/step-03-hand-sand` | / + /our-process/ | Hand-sanding a cabinet door with a cork block | 4/3 | 1600 × 1200 px | lazy |
| `process/step-04-spray-finish` | / + /our-process/ | HVLP spray applying 2K polyurethane to a cabinet door | 4/3 | 1600 × 1200 px | lazy |
| `process/step-05-cure-walkthrough` | / homepage | Finished kitchen walkthrough with labeled touch-up bottle | 4/3 | 1600 × 1200 px | lazy |
| `process/step-05-final-walkthrough` | /our-process/ | Final project walkthrough with homeowner sign-off | 4/3 | 1600 × 1200 px | lazy |

---

## featured/ — 8 images

Homepage `#gallery` grid tiles. Aspect 3/4 (portrait). Shoot vertically or crop tight.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `featured/somerville-cabinet` | / gallery | Cabinet refinishing — Somerville condo, deep forest green | 3/4 | 1200 × 1600 px | lazy |
| `featured/cambridge-bathroom` | / gallery | Bathroom refresh — Cambridge triple-decker, gut-free | 3/4 | 1200 × 1600 px | lazy |
| `featured/arlington-painting` | / gallery | Interior painting — Arlington condo pre-listing refresh | 3/4 | 1200 × 1600 px | lazy |
| `featured/medford-cabinet` | / gallery | Cabinet refinishing — Medford condo conversion, bone white | 3/4 | 1200 × 1600 px | lazy |
| `featured/malden-multi` | / gallery | Multi-unit cabinet turnover — Malden 3-unit multi-family | 3/4 | 1200 × 1600 px | lazy |
| `featured/everett-bathroom` | / gallery | Bathroom refresh — Everett condo board-approved update | 3/4 | 1200 × 1600 px | lazy |
| `featured/woburn-painting` | / gallery | Interior painting — Woburn owner-occupied colonial refresh | 3/4 | 1200 × 1600 px | lazy |
| `featured/winchester-kitchen` | / gallery | Kitchen refresh — Winchester cabinets + paint bundle | 3/4 | 1200 × 1600 px | lazy |

---

## projects/ — 18 images

Used in three contexts: `/gallery/` BeforeAfter sliders, area page PlaceholderImage slots, and CTABand background images. Shoot before shots in the same frame/angle as after shots.

### Before / After pairs — gallery sliders (16 images)

| public_id pair | /gallery/ slider | Alt — Before | Alt — After |
|---|---|---|---|
| `projects/somerville-cabinet-01-before` / `-after` | Somerville | Dated oak builder-grade cabinets — Somerville | Factory-smooth deep forest green 2K finish — Somerville |
| `projects/cambridge-bathroom-01-before` / `-after` | Cambridge | Dated bathroom vanity — Cambridge condo | Refreshed condo bathroom vanity — Cambridge |
| `projects/medford-cabinet-01-before` / `-after` | Medford | Builder-grade honey oak cabinets — Medford | Bone white 2K polyurethane finish — Medford |
| `projects/malden-cabinet-01-before` / `-after` | Malden | Dated multi-unit kitchen cabinets — Malden | Refinished multi-unit kitchen — Malden |
| `projects/arlington-painting-01-before` / `-after` | Arlington | Dingy builder beige walls — Arlington condo | Fresh low-VOC interior paint — Arlington |
| `projects/everett-bathroom-01-before` / `-after` | Everett | Dated bathroom vanity — Everett condo | Refreshed gut-free bathroom — Everett |
| `projects/woburn-painting-01-before` / `-after` | Woburn | Original walls, owner-occupied colonial — Woburn | Fresh interior paint throughout — Woburn |
| `projects/winchester-kitchen-01-before` / `-after` | Winchester | Original kitchen and cabinets — Winchester | Complete cabinet + paint refresh — Winchester |

All BA slider images: aspect 4/3, source min 1600 × 1200 px, loading lazy.

### After-only shots — town pages + CTABand backgrounds

| public_id | Used in | Aspect | Source min | Loading |
|---|---|---|---|---|
| `projects/somerville-cabinet-01-after` | /our-process/ CTABand bg | fill | 2400 × 1350 px | lazy (bg) |
| `projects/medford-cabinet-01-after` | /about/ CTABand bg | fill | 2400 × 1350 px | lazy (bg) |
| `projects/cambridge-cabinet-01-after` | /gallery/ CTABand bg + Cambridge area page | fill / 4/3 | 2400 × 1350 px | lazy |
| `projects/malden-cabinet-01-after` | /financing/ CTABand bg | fill | 2400 × 1350 px | lazy (bg) |
| `projects/arlington-painting-01-after` | /faq/ CTABand bg | fill | 2400 × 1350 px | lazy (bg) |
| `projects/woburn-painting-01-after` | /cabinet-refinishing-vs-replacement/ CTABand bg | fill | 2400 × 1350 px | lazy (bg) |
| `projects/winchester-cabinet-01-after` | /guarantee/ CTABand bg + Winchester area page | fill / 4/3 | 2400 × 1350 px | lazy |

Note: `somerville-cabinet-01-after`, `medford-cabinet-01-after`, `malden-cabinet-01-after`, `arlington-painting-01-after`, `woburn-painting-01-after` are also the `-after` half of their BA pairs above — same Cloudinary asset, dual use.

---

## areas/ — 8 images

Each area page hero. Full-bleed behind a left-to-right dark gradient overlay (`rgba(20,36,31,0.92)→0.72→0.38`). Shoot the neighborhood, not the job site — the text overlay identifies the service.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `areas/somerville-hero` | /cabinet-refinishing-somerville/ | Cabinet refinishing in Somerville, MA | 16/9 | 2400 × 1350 px | **eager** |
| `areas/cambridge-hero` | /cabinet-refinishing-cambridge/ | Cabinet refinishing in Cambridge, MA | 16/9 | 2400 × 1350 px | **eager** |
| `areas/medford-hero` | /cabinet-refinishing-medford/ | Cabinet refinishing in Medford, MA | 16/9 | 2400 × 1350 px | **eager** |
| `areas/malden-hero` | /cabinet-refinishing-malden/ | Cabinet refinishing in Malden, MA | 16/9 | 2400 × 1350 px | **eager** |
| `areas/everett-hero` | /cabinet-refinishing-everett/ | Cabinet refinishing in Everett, MA | 16/9 | 2400 × 1350 px | **eager** |
| `areas/arlington-hero` | /cabinet-refinishing-arlington/ | Cabinet refinishing in Arlington, MA | 16/9 | 2400 × 1350 px | **eager** |
| `areas/woburn-hero` | /cabinet-refinishing-woburn/ | Cabinet refinishing in Woburn, MA | 16/9 | 2400 × 1350 px | **eager** |
| `areas/winchester-hero` | /cabinet-refinishing-winchester/ | Cabinet refinishing in Winchester, MA | 16/9 | 2400 × 1350 px | **eager** |

---

## about/ — 4 images

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `about/craft-spray-setup` | /about/ — "Why I do this" right column | Jeremiah setting up his HVLP spray station inside a Boston condo kitchen | ~4/3 | 1600 × 1200 px | lazy |
| `about/jeremiah-spraying` | /about/ — 3-up strip | Jeremiah applying a 2K finish in a condo kitchen | 4/3 | 1600 × 1200 px | lazy |
| `about/finished-cabinet-detail` | /about/ — 3-up strip | Close-up of a flawless refinished cabinet surface | 4/3 | 1600 × 1200 px | lazy |
| `about/client-handoff` | /about/ — 3-up strip | Project completion handoff with a Greater Boston homeowner | 4/3 | 1600 × 1200 px | lazy |

---

## cta/ — 2 images

Homepage decision-point images.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `cta/kitchen-morning-lifestyle` | / — estimate band right column | Homeowner in a bright refinished kitchen with morning coffee | 4/5 | 1200 × 1500 px | lazy |
| `cta/finished-kitchen-wide` | / — "Every estimate comes in three options" band background | Wide shot of a completed kitchen refinishing project | 16/9 | 2400 × 1350 px | lazy |

---

## vs-replacement/ — 2 images

"Proof of concept" side-by-side section on the vs-replacement page. Shoot a real project: same camera position and framing before and after.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `vs-replacement/before` | /cabinet-refinishing-vs-replacement/ | Dated oak builder-grade cabinets before refinishing — Somerville | 4/3 | 1600 × 1200 px | lazy |
| `vs-replacement/after` | /cabinet-refinishing-vs-replacement/ | Same cabinets after 2K polyurethane spray finish in deep forest green | 4/3 | 1600 × 1200 px | lazy |

**Recommended:** use the same Somerville project photos as `projects/somerville-cabinet-01-before/-after` — these can be the same Cloudinary assets uploaded under both IDs, or a curated crop uploaded separately.

---

## cost/ — 2 images

Cost-contrast figure below the SVG bar chart on the vs-replacement page. Small thumbnails; the pricing text is separate.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `cost/refinish-kitchen` | /cabinet-refinishing-vs-replacement/ | Refinished kitchen — Jerry & Co. result | 4/3 | 1600 × 1200 px | lazy |
| `cost/replace-kitchen` | /cabinet-refinishing-vs-replacement/ | Full kitchen cabinet replacement | 4/3 | 1600 × 1200 px | lazy |

**Shot brief:** `refinish-kitchen` = beautiful after shot (warm, inviting). `replace-kitchen` = bare mid-demo shot or stock photo showing the chaos and cost of replacement.

---

## financing/ — 4 images

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `financing/aspirational-kitchen` | /financing/ — hero background | Bright aspirational kitchen — the result financing makes possible | 16/9 | 2400 × 1350 px | **eager** |
| `financing/small-kitchen` | /financing/ — "Small kitchen" tier card | Small condo kitchen, 4–6 cabinet doors | 4/3 | 1600 × 1200 px | lazy |
| `financing/full-kitchen` | /financing/ — "Full kitchen" tier card (featured) | Full condo kitchen, 10–12 cabinet doors | 4/3 | 1600 × 1200 px | lazy |
| `financing/large-kitchen` | /financing/ — "Large / premium" tier card | Large kitchen, 15+ cabinet doors | 4/3 | 1600 × 1200 px | lazy |

---

## guarantee/ — 2 images

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `guarantee/finished-result` | /guarantee/ — "What's Covered" sticky side panel | Close-up of a factory-smooth 2K polyurethane finish on a refinished cabinet door | 4/3 | 1600 × 1200 px | lazy |
| `guarantee/touchup-kit` | /guarantee/ — touch-up program section | Labeled color-matched touch-up bottle included at project close | 1/1 | 1200 × 1200 px | lazy |

**Shot brief:** `touchup-kit` should show the physical labeled bottle clearly — product-style photography, neutral background.

---

## pages/ — 1 image (legacy scheme)

This image uses a raw `<img>` tag rather than `PlaceholderImage`. Has `onerror="this.style.opacity='0'"` so no broken icon appears if the asset is missing. Consider migrating to `PlaceholderImage` when convenient.

| public_id | Page | Alt text | Aspect | Source min | Loading |
|---|---|---|---|---|---|
| `pages/financing-approval-concept` | /financing/ — "How It Works" steps side photo | Homeowner reviewing financing approval on a phone — fast decision, no credit score impact | ~4/3 | 1600 × 1200 px | lazy |

---

## Summary counts

| Folder | Images | Status |
|---|---|---|
| `brand/` | 2 | ⬜ not uploaded |
| `hero/` | 5 | ⬜ not uploaded |
| `services/` | 5 | ⬜ not uploaded |
| `process/` | 7 | ⬜ not uploaded |
| `featured/` | 8 | ⬜ not uploaded |
| `projects/` | 18 (16 BA pairs + 2 CTABand-only) | ⬜ not uploaded |
| `areas/` | 8 | ⬜ not uploaded |
| `about/` | 4 | ⬜ not uploaded |
| `cta/` | 2 | ⬜ not uploaded |
| `vs-replacement/` | 2 | ⬜ not uploaded |
| `cost/` | 2 | ⬜ not uploaded |
| `financing/` | 4 | ⬜ not uploaded |
| `guarantee/` | 2 | ⬜ not uploaded |
| `pages/` | 1 | ⬜ not uploaded |
| **Total** | **70** | |

Mark each row ✅ as assets are uploaded to `dxuuydoee`.

---

## Verification checklist

- [ ] `npm run build` exits 0 and prints `✓ Single-cloud assertion passed`
- [ ] `/` hero slide 0 (`hero/hero-after-kitchen-white`) is `loading="eager"` — confirmed in `HeroCarousel.astro`
- [ ] All other slides and every `PlaceholderImage` below the fold are `loading="lazy"` — confirmed
- [ ] Every `.ph` figure has `style="--ph-aspect:{ratio}"` → reserves exact layout space before image loads → zero CLS
- [ ] Hairline grids (`.services-grid`, `.gallery-grid`, `.gg-grid`, `.about-strip`) all use `gap: 1px; background: var(--line)` — confirmed in `components.css` and page-scoped CSS
- [ ] All raw `<img>` tags have `onerror="this.style.opacity='0'"` — confirmed on founder portrait, craft-spray-setup, step-photo (our-process), steps-photo (financing), BA slider images (BeforeAfter.astro)
- [ ] No visible `⚠ Placeholder image` text on any page — confirmed; all converted to HTML comments or removed
