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

Derived from the real brand assets, not guessed.

**Colour** — sampled directly from `logos/Two Monk Logo Colour.png`:

| Token | Value | Use |
|---|---|---|
| `navy` | `#002C54` | brand primary (from logo) |
| `teal` | `#009F9D` | brand accent (from logo) |
| `ink` | `#00121F` | page background — navy driven to near-black |
| `ink-raised` / `ink-line` | `#041B2D` / `#0A3049` | surfaces, hairlines |
| `paper` | `#F2F6F9` | off-white, matches the brochure stock |
| `teal-bright` | `#14D6CF` | accents on dark — 10.4:1 contrast |
| `fog` / `fog-dim` | `#8FA6B8` / `#5A7285` | secondary / tertiary text — 7.5:1 |

All text pairings meet WCAG AA; `fog` on `ink` also clears AAA.

**Type**

- Display — **Bricolage Grotesque** (variable `opsz`, so one family works at 12px and 112px)
- Body — **Hanken Grotesk**
- Labels / numerals — **JetBrains Mono**
- Emphasis — **Instrument Serif italic**, carrying the brochure cover's own device
  (`Bigger Growth.` set in teal serif italic against the sans)

**Motion** — three curves, used consistently:
`expo (0.16,1,0.3,1)` for reveals · `in-out (0.65,0,0.35,1)` for state ·
`back (0.34,1.56,0.64,1)` for magnetic pops.

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

Desktop 1440×900 and mobile 390×844: no horizontal overflow on any route,
zero console errors, zero page errors. All nine routes return 200 with unique
titles, descriptions and canonicals, exactly one `<h1>` each, and no image
missing `alt`.

---

## Known non-issues

- `THREE.Clock has been deprecated` — emitted by `@react-three/fiber` internals, not this code.
- Marquee tracks measure wider than the viewport; they sit inside `overflow-hidden` and are masked at both edges.
