# TwoMonk Innovations — website

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion · GSAP · React Three Fiber

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (15 static routes)
npm start
```

---

## ⚠️ Before launch — content that needs your confirmation

Everything below is **deliberately unfinished** because inventing it would have
been worse than leaving it. Each item is isolated to one data file.

| What | Where | Status |
|---|---|---|
| **Projects / case studies** | `src/data/projects.ts` | 3 clearly-marked placeholders. Replace copy, add a `cover` image, set `isPlaceholder: false`. A dev-only build notice renders on the page until then. |
| **Team** | `src/data/people.ts` → `team` | Empty. The About page shows written copy instead of stock portraits. Add members and the photo grid appears automatically. |
| **Testimonials** | `src/data/people.ts` → `testimonials` | Empty. The section does not render at all until real, permissioned quotes exist. |
| **Insights / blog** | `src/data/insights.ts` → `insights` | Empty by design. Categories, routing and article pages are built; add a post and the index fills in. |
| **Technology stack** | `src/data/technologies.ts` | **Proposed, not confirmed.** The brochure lists no stack. Delete anything the team does not genuinely work with. |
| **AI / automation** | `src/data/intelligence.ts` | **Proposed, not confirmed.** The brochure does not mention AI. Confirm what TwoMonk delivers today. |
| **Contact form delivery** | `src/app/contact/actions.ts` | Not connected. Set `CONTACT_ENDPOINT` to a webhook and it goes live with no code change. Until then the form validates and falls back to a prefilled mailto, so enquiries are never silently lost. |
| **Budget ranges** | `src/components/sections/ContactForm.tsx` → `BUDGETS` | Currently USD guesses. Confirm currency and bands. |
| **Company name spelling** | `src/data/site.ts` → `site.name` | Brochure body says "TwoMonk", logo lockup is lowercase "two monk", brief said "Twomonk". Currently **TwoMonk Innovations**. One constant changes it everywhere. |
| **LinkedIn / address** | `src/data/site.ts` → `site.contact` | Not in the brochure, so not invented. |

**Confirmed and already in place** (verbatim from the brochure): tagline, brand
themes, positioning, about copy, mission, vision, the seven brochure services,
the six-step process, both phone numbers, email, website, and both social handles.

---

## Design system

Derived from the real brand assets, not guessed. Colours were sampled directly
from the pixels of `logos/Two Monk Logo Colour.png`.

The site is **light "paper"** — matching the brochure stock and the editorial
weight of the benchmark references.

| Token | Value | Use | Contrast on paper |
|---|---|---|---|
| `paper` | `#F4F7F9` | page background | — |
| `surface` | `#FFFFFF` | raised cards | — |
| `paper-deep` | `#E7EEF4` | alternating bands, footer | — |
| `ink` | `#002C54` | primary text — **brand navy** | **12.6:1** |
| `muted` | `#47617A` | secondary text | 5.98:1 |
| `muted-2` | `#55708A` | tertiary / captions | 4.79:1 |
| `line` | `#D5E1EA` | hairlines | — |
| `accent` | `#009F9D` | **brand teal** — fills, graphics | 3.03:1 (large only) |
| `accent-text` | `#007573` | teal at 11px label sizes | **5.15:1** |
| `accent-hot` | `#2FD4D0` | hover blob fill | 7.7:1 vs ink |

The accent exists as two values on purpose: one teal cannot both sit behind
white text and pass AA at 11px on paper. `accent` fills, `accent-text` labels.

Every text pairing meets WCAG AA. The only sub-4.5 value (`accent` at 3.03:1)
is used exclusively for large display type and non-text graphics, where the
3:1 threshold applies.

**Type**

- Display — **Bricolage Grotesque** (variable `opsz`, so one family works at 12px and 112px)
- Body — **Hanken Grotesk**
- Labels / numerals — **JetBrains Mono**
- Emphasis — **Instrument Serif italic**, carrying the brochure cover's own device
  (`Bigger Growth.` set in teal serif italic against the sans)

**Motion** — three curves, used consistently:
`expo (0.16,1,0.3,1)` for reveals · `in-out (0.65,0,0.35,1)` for state ·
`back (0.34,1.56,0.64,1)` for magnetic pops.

### Signature interactions

Three techniques carry most of the premium feel. All three were reverse-engineered
from the benchmark reference's own CSS and GSAP, then rebuilt for TwoMonk.

**1. Accent-word bloom** (`components/hero/WordReveal.tsx`)
Headline words rise individually on a `0.075s` stagger — but the accent word
starts at `scale(1.55) rotate(-2deg) blur(18px)` and resolves into focus with a
teal glow that then decays over 2.2s. One word behaving differently from the
rest is what turns an entrance into a moment. Initial state lives in CSS
(`.tm-word`) so finished type never flashes before the timeline starts.

**2. Blob buttons** (`.tm-blob` in globals.css)
A 1.4rem dot parked in the button's left padding expands to flood the whole
pill on hover while the label inverts. The asymmetric padding (`pl-14 pr-9`) is
what makes room for the resting dot. Pure CSS on a `::before` behind the
content, so it runs on the compositor and never repaints text.

**3. Scrub-linked scroll**
The reference pins almost nothing — one `pin: true` on its entire home page —
and instead ties motion continuously to scroll position (`scrub: 0.8`–`1.2`).
Pinning is used here only where a section genuinely steps through states
(services, process), and it is desktop-only.

---

## Architecture

```
src/
  app/            routes — /, /services, /work, /work/[slug], /about,
                  /insights, /insights/[slug], /contact, sitemap, robots, icons
  components/
    hero/         cinematic hero + WebGL scene + static fallback
    layout/       Nav, Footer, PageHero
    sections/     every home/interior section
    ui/           Button, Magnetic, Reveal, Cursor, Logo
    providers/    Lenis smooth scroll + MotionConfig
    seo/          JSON-LD
  data/           ← all content lives here, nothing duplicated in components
  hooks/  lib/
```

Adding a project or an article is a data edit. Case-study and article pages
generate statically from those arrays via `generateStaticParams`.

---

## The hero visual

Two helical strands of light — teal and navy — winding around a shared axis,
stitched by faint rungs. It is drawn from the logo: **two monk figures standing
side by side**. Density and brightness rise toward the top, so the form reads as
idea rising into growth.

- One `BufferGeometry`, one draw call, 2,300 GPU points; all motion in the vertex shader
- DPR capped at 1.75, no post-processing
- Skipped entirely under `prefers-reduced-motion` or when WebGL is unavailable —
  a static CSS composition in the same brand colours renders instead
- Never server-rendered (`next/dynamic`, `ssr: false`), so three.js stays out of
  the initial HTML

---

## Accessibility & performance notes

- Semantic landmarks, skip link, visible teal focus ring on every interactive element
- Mobile menu is a real `role="dialog" aria-modal`, closes on Escape, locks body scroll,
  moves focus in, and its close control lives **inside** the overlay
  (a header-level button sits under the overlay's stacking context and is unclickable)
- `MotionConfig reducedMotion="user"` — CSS alone cannot reach JS-driven animations
- Scroll-linked text reveals bottom out at 0.16 opacity, never 0, so content is
  readable at any scroll position and never depends on JS to become visible
- Marquees animate `transform` only, in CSS, on the compositor
- Pinned scroll storytelling is **desktop-only**; below `lg` the same sections become
  a tappable accordion and a plain list. Swapped with CSS, not JS — no hydration flash.

### Verified in-browser

Driven through a real Chromium session (`agent-browser`), not assumed.

**Responsive sweep — 30 combinations, zero horizontal overflow:**

| Viewport | `/` | `/services` | `/work` | `/about` | `/contact` |
|---|---|---|---|---|---|
| 4K 3840×2160 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Desktop 1920×1080 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Laptop 1280×800 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tablet 768×1024 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mobile 390×844 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Small 320×568 | ✓ | ✓ | ✓ | ✓ | ✓ |

**Also verified:** zero console/page errors · no hydration mismatches ·
reduced-motion drops WebGL and Lenis while leaving all content at opacity 1 ·
mobile menu opens, traps scroll, closes via button and Escape ·
all 9 routes 200 with unique title/description/canonical, exactly one `<h1>`,
zero images missing `alt` · `next build` and `eslint` both clean.

**Not done:** no Lighthouse run, and no testing on real hardware or in
Safari/Firefox — everything above is Chromium at simulated viewports.

---

## Known non-issues

- `THREE.Clock has been deprecated` — emitted by `@react-three/fiber` internals, not this code.
- Marquee tracks measure wider than the viewport; they sit inside `overflow-hidden` and are masked at both edges.
