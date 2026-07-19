# Jerry & Co. Universal Design System

Canonical spec. Every interface Jerry & Co. ships — the marketing site, the
estimating-engine admin tools, the client proposal/portal, and any future
app — is built on this one brand: bone/ink/gold/forest, Fraunces + Inter.

There is no shared package between repos (the site is Astro/Pages, the
estimating engine is a separate Cloudflare Worker, no monorepo/build step
links them). This document is the source of truth; each repo keeps its own
copy of the token values and they must be kept in sync by hand:

- **Website** (canonical origin): `src/styles/tokens.css`
- **Estimating engine**: `src/admin/design-tokens.ts` — exports
  `LIGHT_TOKENS_CSS`, `DARK_TOKENS_CSS`, `GOOGLE_FONTS_IMPORT` as string
  constants, imported into every admin page and the client proposal page.

If you change a value here, change it in both places.

## Two modes, one brand

- **Light** — matches the marketing site exactly. Bone background, ink
  text, gold accent. Used for anything client-facing: the proposal/portal
  page, printable estimates.
- **Dark** — same tokens, flipped surface roles (ink becomes the
  background instead of bone; gold stays the accent in both modes).
  Conventional for long data-entry sessions. Used for internal/admin
  tools: Pipeline console, Rate Console, Subcontractors, DB Inspector.

Component CSS should be written against the **semantic** names
(`--surface-0/1/2/3`, `--text`, `--text-muted`, `--border`,
`--border-strong`), never the brand names directly — that's what makes one
stylesheet work in both modes.

## Brand tokens (identical in both modes)

| Token | Value | Use |
|---|---|---|
| `--gold` | `#C8A055` | Primary accent — CTAs, prices, active nav, focus rings |
| `--gold-deep` | `#8A6A33` | Gold on light backgrounds (better contrast than `--gold`) |
| `--ink` | `#14241F` | Dark brand anchor — dark-mode background base, text-on-gold |
| `--ink-soft` | `#1E332D` | Secondary dark tone |
| `--forest` | `#1E3934` | Secondary dark tone |
| `--bone` | `#FDFAF5` | Light brand anchor — light-mode background base |
| `--bone-deep` | `#F6F1E7` | Secondary light tone |
| `--err` | `#B5442E` | Error/destructive state |
| `--ok` | `#6B8F71` | Success state |
| `--warn` | `#C08A3E` | Warning state (distinct from `--gold` so it doesn't read as a brand accent) |

## Semantic tokens (differ by mode)

| Token | Light | Dark |
|---|---|---|
| `--surface-0` (page bg) | `#FDFAF5` (bone) | `#14241F` (ink) |
| `--surface-1` (recessed) | `#F6F1E7` | `#192923` |
| `--surface-2` (cards/panels) | `#FFFFFF` | `#1E332D` (ink-soft) |
| `--surface-3` (inputs) | `#F1EAD9` | `#253A31` |
| `--text` | `#20281F` | `#FDFAF5` (bone) |
| `--text-muted` | `#5C5853` | `rgba(253,250,245,.65)` |
| `--border` | `rgba(30,57,52,.10)` | `rgba(247,243,234,.12)` |
| `--border-strong` | `rgba(30,57,52,.20)` | `rgba(247,243,234,.22)` |

## Typography

- **Display / headings**: `Fraunces` (serif) — logo wordmarks, page titles,
  price emphasis. Fallback: `Georgia, 'Iowan Old Style', serif`.
- **Body / UI**: `Inter` — everything else. Fallback: `-apple-system,
  'Segoe UI', Roboto, sans-serif`.
- Loaded via Google Fonts (`GOOGLE_FONTS_IMPORT`) on every surface. The
  fallback stack means a slow/blocked font request degrades to system
  fonts, not breakage — this was a deliberate call given some surfaces
  (lead intake, estimate documents) may be viewed on a job site's cell
  connection.
- Type scale: `--text-2xs`(11px) `--text-xs`(12px) `--text-sm`(13px)
  `--text-base`(14px) `--text-lg`(16px) `--text-xl`(20px) `--text-2xl`(28px).

## Spacing, radius, motion

- Spacing (4px base): `--space-1`(4px) through `--space-8`(32px).
- Radius: `--radius-sm`(6px) `--radius-md`(8px) `--radius-lg`(10px)
  `--radius-xl`(14px) `--radius-full`(999px).
- Motion: `--ease: cubic-bezier(.2,.7,.3,1)`, `--dur-fast`(120ms),
  `--dur-base`(180ms). Every interactive element (buttons, inputs, rows,
  disclosures) transitions on hover/focus — no instant state changes.
- Focus ring: `--focus-ring: 0 0 0 3px rgba(200,160,85,.28)` (gold-based),
  paired with `border-color: var(--gold)` on `:focus-visible`.

## Component conventions

- **Buttons**: gold-filled primary, `--ink` text; `.ghost` variant
  (transparent, gold border/text) for secondary actions; `.danger`
  (`--err` fill) reserved for real-money or destructive actions — never
  style a high-stakes action the same weight as a routine one.
- **Modals**: native `<dialog>` + `.showModal()` — free focus trap,
  Escape-to-close, and correct ARIA semantics. Don't hand-roll overlay
  divs.
- **Disclosures** (collapsible sections): native `<details>/<summary>` —
  don't hand-roll toggle JS.
- **Forms**: every input gets a real, visible `<label>` — placeholder text
  is not a label.
- **Price/decision-critical numbers**: serif display font, largest text
  size in context, gold color — the number that matters most on a screen
  should look like it matters most.

## Provenance

Built starting from the marketing site's existing bone/ink/gold/forest
identity (`src/styles/tokens.css`, `Header.astro`, `BeforeAfter.astro`).
Extended into a full semantic system (spacing/type/radius/motion scales,
light+dark modes) during the estimating-engine Pipeline console refactor,
then rolled out as the universal standard across every Jerry & Co.
interface. Any new app should start from `design-tokens.ts` (or this doc
if it's a new repo with no existing token file) rather than inventing new
values.
