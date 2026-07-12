# Aathman Studios

A cinematic, single-page editorial portfolio site for **Aathman Studios**, a luxury wedding photography and film studio ("Capturing Souls, Not Just Moments"). Built as a fully custom React SPA — no CMS, no page router — with scroll-driven Framer Motion animation, an editorial art-direction system, and a multi-step inquiry form.

**Repo:** `mellviin/aathman` · **Package name:** `aathmanstudios`

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Page Sections](#page-sections)
7. [Architecture & Data Flow](#architecture--data-flow)
8. [Components](#components)
9. [Media & Asset System](#media--asset-system)
10. [Animation System](#animation-system)
11. [Styling System](#styling-system)
12. [Fonts](#fonts)
13. [Inquiry Form & Formspree Setup](#inquiry-form--formspree-setup)
14. [Build & Performance](#build--performance)
15. [Deployment](#deployment)
16. [Known Placeholders / TODOs](#known-placeholders--todos)
17. [Browser Support](#browser-support)
18. [License](#license)

---

## Overview

The site is a single `App.jsx` page (~790 lines) composed of self-contained `<section>` blocks, each scroll-animated independently. There is no routing library — navigation is done via in-page anchor links (`#mosaic`, `#films`, `#stories`, `#journal`, `#begin`). All copy, images, and video references live in one central data file (`src/data/media.js`), so the entire site's content can be updated without touching layout code.

Design language: warm cream/ivory background (`#f6f1e8`), near-black ink text (`#111111`), a bronze/taupe accent (`#8b7864`), generous whitespace, small-caps tracked labels, and two custom display typefaces layered with Cormorant Garamond and Inter for body text. Decorative rotating mandala artwork sits fixed in the page corners as a subtle brand motif.

## Tech Stack

| Layer            | Technology | Notes |
|-------------------|-----------|-------|
| UI framework      | React 19.2 | Function components + hooks only |
| Build tool        | Vite 8 | Dev server + production bundler |
| Styling           | Tailwind CSS 4 (`@tailwindcss/vite` plugin) | Utility-first, no `tailwind.config.js` needed (CSS-first config) |
| Animation         | Framer Motion 12 | Scroll-triggered reveals, hover states, page/splash transitions |
| Linting           | ESLint 10 (flat config) + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` | |
| Fonts             | Self-hosted `CoreSansD` & `ITC Garamond Std Condensed Light Italic` (`.woff2`) + Google Fonts `Cormorant Garamond` / `Inter` | |
| Media hosting     | Local imported assets (Vite-bundled) + remote Pexels/Vimeo placeholder URLs | |
| Forms             | [Formspree](https://formspree.io) (client-side `fetch` POST, no backend) | |

No backend, database, or API server — this is a fully static frontend.

## Project Structure

```
aathman/
├── index.html                          # Vite entry HTML, <title>aathmanstudios</title>
├── vite.config.js                      # Build config: manual chunking, dep pre-bundling
├── eslint.config.js                    # Flat ESLint config
├── package.json
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── mandala-corner.png              # Decorative corner artwork (used 4x, rotated/flipped)
│   └── fonts/
│       ├── CoreSansD.woff2
│       └── ITCGaramondStdCondensedLightItalic.woff2
└── src/
    ├── main.jsx                        # ReactDOM root render
    ├── App.jsx                         # Entire page: SplashScreen, HeroStart, App (root)
    ├── App.css                         # Section-level component styles
    ├── index.css                       # Global styles, @font-face, base typography
    ├── data/
    │   └── media.js                    # Central content/asset registry ("mediaLibrary")
    ├── components/
    │   ├── media/
    │   │   ├── OptimizedImage.jsx      # <picture>-based responsive image, lazy-load, fade-in
    │   │   ├── EditorialImage.jsx      # Wraps OptimizedImage with scroll-reveal motion
    │   │   └── EditorialVideoCard.jsx  # Poster image → click-to-play inline video card
    │   └── shared/
    │       └── MandalaCorners.jsx      # Fixed, pulsing decorative corner graphics
    └── utils/
        └── animationVariants.js        # Centralized Framer Motion variants/easings
```

## Getting Started

### Prerequisites
- Node.js 18+ (Vite 8 requirement)
- npm (comes with Node)

### Installation

```bash
git clone https://github.com/mellviin/aathman.git
cd aathman
npm install
```

### Run locally

```bash
npm run dev
```

Opens the Vite dev server (default `http://localhost:5173`) with hot module reloading.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite dev server with HMR |
| `npm run build` | Production build → outputs to `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally to sanity-check a production build |
| `npm run lint` | Runs ESLint across the project |

## Page Sections

The page is one continuous scroll, made up of the following sections in order (anchor id noted where present):

| # | Section | Anchor | Purpose |
|---|---------|--------|---------|
| 1 | **Splash Screen** | — | 3-second animated intro (ambient video background + logo wordmark) shown once on load, then fades out |
| 2 | **Hero** | — | Full-screen monochrome hero image, sticky top nav bar, tagline strip |
| 3 | **Curated Wedding Mosaic** | `#mosaic` | Asymmetric editorial photo/video grid (8 tiles across a 12-col grid) |
| 4 | **Black & White Emotional Sequence** | — | 3-image monochrome storytelling block |
| 5 | **Signature Wedding Films** | `#films` | 3-up grid of film cards (poster image → click to play embedded video) |
| 6 | **Editorial Film Spread** | — | 2-up large-format video card spread |
| 7 | **Destination Wedding Stories** | `#stories` | Alternating image/text "journal" narrative blocks per destination |
| 8 | **Luxury Couple Portrait Spreads** | — | 4-image portrait grid |
| 9 | **Wedding Journal Grid** | `#journal` | 12-image tiled archive grid + closing video tile, each tagged with a destination label |
| 10 | **Closing Editorial Image** | — | Full-bleed closing image + "Forever Begins Here" statement |
| 11 | **Footer** | — | Brand mark, social/contact links, secondary nav |
| 12 | **Booking / Contact** | `#begin` | Multi-step animated inquiry form → Formspree |

Top nav links map to: `Stories` → `#stories`, `Films` → `#films`, `Editorial` → `#mosaic`, `Journal` → `#journal`, `Contact` → `#begin`.

## Architecture & Data Flow

```
media.js (mediaLibrary)
   │
   ├─ imported local assets (hero, portraits, b&w set, logo, video)
   ├─ remote Pexels image URLs (placeholders)
   └─ remote Vimeo video URLs (placeholders)
        │
        ▼
   App.jsx reads mediaLibrary.* per section
        │
        ├─ EditorialImage  → OptimizedImage   (static photography)
        └─ EditorialVideoCard → OptimizedImage / <video>  (poster ⇄ inline playback)
```

- **`App.jsx`** is the root component and owns all page-level state:
  - `showSplash` — controls the splash screen, auto-dismissed after 3s via `setTimeout`
  - `step` / `formData` / `status` — drive the multi-step inquiry form
  - `activeVideoId` — a single shared id so only one `EditorialVideoCard` plays at a time across the whole page
  - `journalFrames` — a `useMemo`'d combined array of mosaic + film + story images used to populate the journal grid
- **Preloading**: on mount, `preloadAsset()` injects `<link rel="preload">` tags for the hero image and first two mosaic images so the most visually important content is ready immediately.
- **Code splitting**: `EditorialVideoCard` and `MandalaCorners` are loaded via `React.lazy()` + `Suspense`, so their code (and the video/mandala assets they reference) isn't in the initial bundle.

## Components

### `<OptimizedImage />`
Low-level responsive image primitive (`src/components/media/OptimizedImage.jsx`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | — | Image source — imported local asset or remote URL |
| `alt` | string | — | Alt text |
| `className` | string | `''` | Sizing/layout classes applied to the wrapper |
| `priority` | boolean | `false` | `true` → `loading="eager"`, `fetchPriority="high"`, sync decode (use for above-the-fold images) |
| `sizes` | string | `'(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw'` | Responsive `sizes` hint |
| `monochrome` | boolean | `false` | Applies a CSS grayscale/contrast filter |
| `overlay` | boolean | `false` | Adds a subtle bottom gradient overlay |
| `children` | node | — | Rendered absolutely inside the image frame (captions, badges, gradients) |

Behavior:
- Builds a Pexels-specific `srcSet` at `[480, 800, 1200, 1600, 2000]`px widths (only for `pexels.com` URLs — local imports are left to Vite).
- Shows a cream placeholder background (`#f2ece2`) until the image fires `onLoad`, with a synchronous `.complete` check to avoid a flash on cached images.
- Fades opacity 0 → 1 over 0.4s once loaded.

### `<EditorialImage />`
Wraps `OptimizedImage` with scroll-triggered Framer Motion reveal (`src/components/media/EditorialImage.jsx`). Same props as `OptimizedImage`, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disableAnimation` | boolean | `false` | Skip the scroll-reveal wrapper entirely (used for the hero) |

Animation is skipped automatically when `priority` is `true` or `disableAnimation` is set — priority/hero images render immediately rather than waiting for a scroll-into-view trigger.

### `<EditorialVideoCard />`
Poster-image-to-inline-video card used in the films/mosaic/journal sections (`src/components/media/EditorialVideoCard.jsx`).

| Prop | Description |
|------|-------------|
| `item` | Object with `{ id, title, couple, location, year, runtime, phrase, image, video }` |
| `activeVideoId` / `setActiveVideoId` | Shared state (lifted to `App`) so only one video plays at a time |
| `className` | Sizing classes |

Shows the poster image by default; clicking the play button swaps in a `<video autoPlay muted loop playsInline preload="none">` element, deferring the video fetch until interaction.

### `<MandalaCorners />`
Fixed, decorative, non-interactive corner graphics (`src/components/shared/MandalaCorners.jsx`). Renders `/mandala-corner.png` four times at different corners/sizes/rotations with a slow, infinite, reversing opacity pulse via Framer Motion. `aria-hidden="true"` and `pointer-events-none` — purely visual.

## Media & Asset System

All content lives in **`src/data/media.js`**, exporting a single `mediaLibrary` object:

| Key | Shape | Used in |
|-----|-------|---------|
| `splash` | `{ video, poster }` | Splash screen background |
| `hero` | `{ image, layered, blackAndWhite }` | Hero section, reused in mosaic/portraits |
| `philosophy` | `{ image }` | Mosaic tile, contact section backdrop |
| `mosaic` | `[{ id, image }]` (6 items) | Curated Wedding Mosaic grid |
| `films` | `[{ id, title, couple, location, year, runtime, phrase, image, video }]` (3 items) | Signature Wedding Films |
| `editorialVideoCards` | same shape as `films` (3 items) | Mosaic featured card, Editorial Film Spread, Journal closer |
| `stories` | `[{ title, image }]` (2 items) | Destination Wedding Stories |
| `monochrome` | `[image, image, image]` | Black & White Emotional Sequence |
| `destinations` | `string[]` | Labels cycled across the Journal grid tiles |
| `booking` | `{ image }` | Closing editorial image, portrait spread |

**Adding or replacing an asset:**
1. Drop the file into `src/assets/images/...` or `src/assets/videos/...`.
2. `import` it at the top of `media.js` (do **not** reference it as a raw string path — Vite needs to bundle/fingerprint it).
3. Point the relevant `mediaLibrary` entry at the imported identifier.

Currently the site mixes **local imported assets** (hero, portraits, monochrome set, logo, logo animation) with **remote Pexels image URLs and Vimeo video URLs** as placeholders for content that hasn't been shot/edited yet — see [Known Placeholders](#known-placeholders--todos).

## Animation System

All motion values are centralized in **`src/utils/animationVariants.js`** rather than inlined per component, so the site's motion language stays consistent. Categories:

- **Easings** — `easing.soft`, `easing.gentle`, `easing.smooth` (custom cubic-bezier curves)
- **Reveals/fades** — `imageReveal`, `fadeUp`, `blurToFocus`
- **Scroll-triggered** — `scrollReveal`, `scrollFadeIn`, `scrollSlideUp`
- **Hover** — `hoverImageScale`, `hoverImageOpacity`, `navItemHover`, `underlineHover`, `buttonHover`
- **Ambient/looping** — `ambientFloat`, `ambientOpacity` (used by `MandalaCorners`)
- **Section headings** — `sectionHeadingReveal`, `sectionCopyReveal`
- **Hero** — `heroImageZoom` (3.8s scale-in on load), `heroImageAmbient`
- **Viewport config** — `viewportSettings` (`{ once: true, amount: 0.25 }`), `viewportSettingsSensitive` (`{ once: true, amount: 0.4 }`) — passed to Framer Motion's `viewport` prop so reveals fire once, when 25–40% of the element is visible.

Most section headings/copy use `whileInView` + `viewport={{ once: true, amount: 0.3 }}` inline rather than importing the shared variants directly — the shared file mainly backs the reusable components (`EditorialImage`, `EditorialVideoCard`, `MandalaCorners`).

## Styling System

- **Tailwind CSS 4** via the `@tailwindcss/vite` plugin — no `tailwind.config.js`; Tailwind 4 is configured directly in CSS (`src/index.css`).
- **`src/index.css`** — global resets, `@font-face` declarations, base typography, and shared utility classes: `.section-label`, `.section-copy`, `.section-copy-compact`, `.image-frame`.
- **`src/App.css`** — section/component-specific styles: `.footer-panel`, `.contact-input`, image-frame loading/loaded states, additional `.section-label` / `.section-copy` refinements.
- **Color palette** (used as arbitrary Tailwind values throughout, not CSS variables):

  | Token | Hex | Use |
  |-------|-----|-----|
  | Ivory background | `#f6f1e8` | Page background, splash |
  | Ink | `#111111` | Headings, primary text |
  | Body text | `#2a2622` | Paragraph copy |
  | Bronze/taupe accent | `#8b7864` | Labels, hover states, borders, CTA outline |
  | Warm border | `#b7a07f` (various alpha) | Dividers, card borders |

## Fonts

| Family | Source | Usage |
|--------|--------|-------|
| **CoreSansD** | Self-hosted `.woff2` (`public/fonts/CoreSansD.woff2`) | Wordmark, labels, headings |
| **ITC Garamond Std Condensed Light Italic** | Self-hosted `.woff2` | "studios" wordmark suffix, italic accents |
| **Cormorant Garamond** | Google Fonts | Serif display/body accents |
| **Inter** | Google Fonts | Body/UI text |

`@font-face` rules and the Google Fonts `@import` live at the top of `src/index.css`.

## Inquiry Form & Formspree Setup

The booking form (`#begin` section) is a 5-step animated wizard driven by the `bookingPrompts` array in `App.jsx`:

1. **name** — "What should we call your story?" (text)
2. **date** — "When does your forever begin?" (date picker)
3. **location** — "Where will this memory live?" (text)
4. **celebration** — style select: *Intimate & Romantic / Grand & Elegant / Destination Paradise / Cultural Heritage / Modern Minimalist*
5. **story** — free-form textarea

Each step advances via `submitInquiry()`; only the final step performs the actual network request — a `fetch` POST to `FORM_ENDPOINT` with a JSON body (`name`, `wedding_date`, `location`, `celebration_type`, `story`). On success the form is replaced with a confirmation message; on failure a status message is shown ("Something went wrong. Please set a valid Formspree endpoint or try again.").

**Required setup before deploying:** create a free form at [formspree.io](https://formspree.io) and replace the placeholder endpoint in `src/App.jsx`:

```js
// src/App.jsx
const FORM_ENDPOINT = 'https://formspree.io/f/your-form-id'
```

There is no server-side validation or spam protection beyond whatever Formspree provides on your plan.

## Build & Performance

`vite.config.js` includes several deliberate optimizations:

- **Manual chunk splitting** — `react`/`react-dom`/`scheduler` → `vendor-react`; `framer-motion` → `vendor-motion` (isolated since it's ~100KB gzipped); everything else from `node_modules` → `vendor-misc`. This lets browsers cache React and Framer Motion independently of app code and of each other.
- **`chunkSizeWarningLimit: 600`** — raised because chunking is intentional, not accidental bloat.
- **`assetsInlineLimit: 8192`** — small assets (<8KB) are inlined as base64 to save round-trips.
- **`optimizeDeps.include`** — pre-bundles `react`, `react-dom`, `framer-motion` for faster dev server cold starts.
- **Lazy-loaded components** (`EditorialVideoCard`, `MandalaCorners`) via `React.lazy` + `Suspense`, keeping them out of the critical initial bundle.
- **Asset preloading** — hero image and first two mosaic images are preloaded via injected `<link rel="preload">` tags on mount.
- **Responsive images** — Pexels-sourced images get a generated `srcSet` at five breakpoints; local assets rely on Vite's own asset hashing/optimization.
- **Deferred video loading** — inline videos use `preload="none"` and only mount once a user clicks play.

## Deployment

Static Vite build — deploys to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.):

```bash
npm run build
# → dist/ contains the full static site, deploy this folder
```

No environment variables or server config required. Remember to set the real Formspree endpoint (see above) **before** building for production, since it's inlined into the client bundle at build time.

## Known Placeholders / TODOs

These are visible in the current codebase and should be addressed before a public launch:

- `FORM_ENDPOINT` in `App.jsx` is still the Formspree placeholder (`your-form-id`).
- Several `mediaLibrary` entries (`mosaic`, `films`, `editorialVideoCards`, `stories`, `philosophy`) point to **Pexels stock photos** and a **Vimeo demo video** rather than real studio work — swap these for actual shoot assets via `src/data/media.js`.
- Footer contact details (`hello@aathmanstudios.com`, `+91 98765 43210`, Instagram link) are placeholder values.
- Hero caption/tagline slot (empty `aria-hidden` `<p>` tags in `HeroStart`) is intentionally blank pending final copy.
- The `films` array's inline comment notes that React keys were switched from `film.title` to the stable `film.id` — double-check any future data additions include a unique `id`.

## Browser Support

Targets evergreen modern browsers (Chrome, Firefox, Safari, Edge — latest 2 versions). Uses modern CSS (`backdrop-blur`, CSS grid, `mix-blend-mode`), the `<picture>` element, and native lazy-loading — no polyfills included.

## License

Private project — all rights reserved.