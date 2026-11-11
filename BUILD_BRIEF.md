# Build brief — Yuliia Shevchenko portfolio

You are building Yuliia Shevchenko's product-design portfolio from finished designs.
Read this whole file before writing code. Work in phases (bottom of this file) and stop after each phase so Yuliia can review it in the browser.

## 1. What is in this folder

| Path | What it is |
|---|---|
| `design/home.dc.html` | Final home page design (the source of truth for layout, styles and interactions) |
| `design/cases/*.dc.html` | Six final case-study pages |
| `design/image-slots/*.dc.html` | Versions of the two Care for Kids cases that show where real Figma screenshots will go later |
| `content/home.json` | All home-page copy, already extracted. The site must read text from here |
| `public/images/` | Case images (`.webp`) and `portrait.svg` (a pen-drawing portrait for the About block) |
| `public/cv/` | The CV PDF behind every "CV" / "Download CV" link |

### How to read the `.dc.html` design files

They come from a design tool. Treat them as reference HTML with logic, not as code to ship:

- `{{ name }}` is a value computed in the `renderVals()` method of the `<script type="text/x-dc">` block at the bottom of each file.
- `<sc-for list="{{items}}" as="x">` is a loop, `<sc-if value="{{flag}}">` is a conditional.
- `<helmet>` holds fonts and the few global CSS rules (hover states, keyframes).
- Inline `style="…"` holds the real visual values: copy spacing, sizes, colours, radii and shadows from there exactly.
- The script's `this.state` / `setState` shows the interactive behaviour; rebuild it as React state.

## 2. Stack and principles

- **Next.js (App Router) + TypeScript**, deployed on **Vercel** from Yuliia's **GitHub** repo.
- Every page is **statically generated**: the HTML must contain the real text (the current portfolio is a client-only SPA that shows bots and AI search an empty page; fixing that is a goal).
- Styling: CSS variables for design tokens + CSS Modules (or Tailwind if you prefer, but keep the tokens as CSS variables so the Inspector can switch them at runtime).
- Fonts: **Geist** and **Geist Mono** (`geist` npm package or `next/font/google`).
- Keep dependencies minimal. No UI kit.
- **All copy lives in `content/`** so Yuliia can edit text on GitHub without touching components:
  - `content/home.json` (given).
  - `content/cases/<slug>.mdx` — create one per case (see section 5).
  - Components never hard-code user-facing copy.

## 3. Design tokens

Light (default) and dark mode, four accents (coral default). Values from the design files:

```
light: bg #F5F2EA, surface #FFFFFF, raised #EFEBE1, border #DDD7CA, text #1C1A17, muted #5B564D, dot #D3CBBA
dark:  bg #121316, surface #1A1B1F, raised #24262B, border #2F3137, text #ECECEE, muted #A3A5AD, dot #2C2E34
accents (fill / ink-on-light): coral #FF8A65 / #C2410C · lime #B8F25B / #4D7C0F · sky #7CC4FF / #0369A1 · lilac #C3A6FF / #6D28D9
on-accent text #111214. In dark mode the "ink" colour = the fill colour.
background: dotted grid, radial-gradient(dot 1.2px, transparent 1.2px), 24px.
radii: cards 14–16px, buttons 10px, small 8px.
```

Case pages use the light palette only (they have no Inspector).

## 4. Home page (`/`) — follow `design/home.dc.html`

Sections in order: header → hero (copy + Inspector) → results strip → Selected work → About ("I design with logic") → Changelog → Contact → footer bar. "How I work" is intentionally removed.

**Header:** name + "product designer", nav (Work, About, Changelog), "CV" outline button with download icon, "Email me" accent button. No theme toggle in the header (theme lives in the Inspector).

**Hero:** desktop height about **744px** (Yuliia's adjustment), auto on mobile. Left: two pills ("Viewing as: …", "Open to full-time roles"), headline, paragraph, two buttons. Headline highlight = the word in a selection frame (accent border + two corner handles).

**Inspector panel** (right side of hero):
- Title "Inspector" (18px/600), subtitle, then three controls with code-style labels: `--viewing-as` (Recruiter / Founder / Engineer, 3-column bordered buttons, selected = filled), `--accent` (four 44px swatches with ring), `--mode` (Light / Dark), toggle "Show the 12-column grid", and a code block echoing the current tokens.
- **Viewing as** switches: hero copy (`content/home.json → hero.<audience>`), the order of the work cards (`work.order.<audience>`), the "sorted for …" label.
- **Accent / mode** switch the CSS variables for the whole home page with a 0.3s colour transition.
- **Grid toggle** overlays a 12-column grid tinted with the accent (14% alpha) on the whole page, pointer-events none.
- Persist audience, accent, mode in `localStorage` (try/catch). Respect `prefers-color-scheme` only for the first visit.

**Stickers around the Inspector** (decorative, draggable): yellow sticky note with "Reset board" button, "Aa / Geist 600" type card, vector curve with handles (uses the ink colour), token chip showing the current accent hex, mini button component ("Hire me / Later"). The sticky note sits **below** the Inspector (lower z-index), the others above. Hidden below 760px.

**Drag behaviour** (stickers + the four stat blocks): pointer events with pointer capture; position stored as a translate offset; hover shows a frame in the accent colour with corner handles and a mono label (e.g. "stat / engagement"); the last dragged item goes on top (except the sticky note, which stays under the Inspector); "Reset board" returns everything. Ignore drags that start on buttons/links. Disable dragging on touch devices (`pointer: coarse`) so it never blocks scrolling.

**Cursors:** an animated "Yuliia" cursor (accent ink colour) gliding between points in the hero (CSS keyframes, 12s loop, off for `prefers-reduced-motion`), and a "You" label that follows the visitor's mouse inside the hero (desktop/fine pointer only).

**Selected work cards:** tilted (−1.4°, 1.1°, −0.8°, 1.6°, −1.2°, 0.9°) with uneven top offsets (0, 22, 6, 18, 0, 26px). On hover/focus the card only **straightens** (rotate 0) — **no lift, no scale**. A round 100px "View case study" sticker pops in at the top-right corner (scale 0 → 1 with a bouncy ease, rotated 12°, dashed inner stitch outline, accent fill). On touch devices show the sticker always. Covers: real images, or the three drawn covers from the design (`art:roadmap`, `art:seo`, `art:nda` — rebuild them as small components). Each card links to `/work/<slug>`. Facts are neutral chips (all the same style).

**About:** pen-drawing portrait (`public/images/portrait.svg`) on notebook paper (lines, red margin, tape, slight rotation) + heading "I design with *logic*, not just visuals." (accent highlight) + two paragraphs + tool chips.

**Changelog:** v6 → v1 rows (version tag, years, role, one line). v6 tag uses the accent.

**Contact + footer** (from design B): big heading "Let's ship something *clear*." with accent highlight, line "Open to full-time remote product design roles.", buttons (email in accent, Download CV, LinkedIn, Behance), then a dark footer bar: green dot "Available" · "Barcelona · CET" · email · ©. Add a "Cookie settings" link in the footer bar (reopens the consent banner).

## 5. Case pages (`/work/<slug>`)

Slugs and the "Next case" loop (in this order, last one goes back to the first):

1. `roadmap-to-design-system` ← `design/cases/roadmap-to-design-system.dc.html` (Care for Kids platform; shown as "Childcare marketplace")
2. `evadav` ← `evadav.dc.html`
3. `collectors-hub` ← `collectors-hub.dc.html`
4. `ai-search-website` ← `ai-search-website.dc.html` (Care for Kids website)
5. `qualoo` ← `qualoo.dc.html`
6. `aetlas` ← `aetlas.dc.html`

Build reusable blocks rather than six one-off pages: `CaseHero` (breadcrumb, pill, H1, summary, meta card), `EvidencePanel` (tiles typed Measured / Counted / Shipped / Built / Adopted + optional "Planned" metric table), `StickyNoteGrid`, `DecisionRow` (text + image, alternating), `ProcessSteps`, `Figure` (image or drawn diagram + caption), `LearningsBand`, `NextCase`.

Move every case's copy into `content/cases/<slug>.mdx` (frontmatter for meta, evidence tiles, decisions, captions, learnings, next case; MDX body only where free text is easier). Yuliia must be able to edit any sentence there.

Drawn diagrams in the Care for Kids cases (roadmap board, impact × effort matrix, token architecture, dashboard wireframe, AI-answer illustration, data → hypotheses → tests flow) are part of the design: rebuild them as small components, keep their captions.

**Image slots (later):** `design/image-slots/*` show where real Care for Kids screenshots will go once the company allows it. Build the image component so that each slot can be switched from "drawn diagram" to a real image by adding a file path in the MDX frontmatter. Do not show empty placeholder boxes on the live site.

## 6. Content guardrails (do not change these facts)

- **Collector's Hub** is described in the **past tense**. Never claim it is live, autonomous, or has run "2+ years".
- **Care for Kids** appears as "Childcare marketplace" in case pages; contract role, year **2026**, never months or duration. Do not add any text that implies how long she worked there.
- **Aetlas**: "Designed, not launched"; the front-end tile is a *prototype*.
- **Evadav**: results are "reported by the product team"; the phone mockups are labelled as illustrations because real screens are under NDA.
- No invented numbers anywhere. Only the metrics already in the designs.

## 7. Analytics and consent

Visitors are mostly in the EU, so nothing that sets cookies runs before consent.

- **Cookie banner:** styled like the yellow sticky note (see `content/home.json → cookieBanner`). "Accept" and "Reject" equally prominent; link to `/privacy`. Store the choice (localStorage, ~6 months) and reopen from the footer "Cookie settings" link.
- **Google Analytics 4** with **Google Consent Mode v2**: default `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` = `denied`; on Accept update `analytics_storage` = `granted` (ads stay denied).
- **Microsoft Clarity:** since Oct 31 2025 Clarity enforces consent signals for EEA/UK/CH visitors. Pass consent via Google Consent Mode or the Clarity Consent API — check the current docs before coding: https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management
- **Vercel Web Analytics** (`@vercel/analytics`): cookieless page views, always on.
- IDs come from env vars only: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`. If a var is missing, skip that script silently.
- **Events** (send to GA4 and as Clarity custom events, only after consent):
  `view_as_select {audience}`, `accent_change {accent}`, `mode_change {mode}`, `grid_toggle {on}`, `sticker_drag {id}`, `board_reset`, `case_open {slug, source: card|next}`, `cv_download {location}`, `email_click {location}`, `linkedin_click`, `behance_click`, `case_scroll_depth {slug, percent: 25|50|75|100}`, `cookie_consent {choice}`.
- `/privacy`: a short plain-English page: what is collected, which tools, how to change the choice. Copy in `content/privacy.md`.

## 8. SEO, accessibility, quality

- Per-page `<title>` and description from content; Open Graph image (a simple generated card is fine); `sitemap.xml`, `robots.txt`; JSON-LD `Person` on the home page.
- Real `<button>`/`<a>`; visible focus states; 44px touch targets; text contrast ≥ 4.5:1; decorative SVG `aria-hidden`; `prefers-reduced-motion` disables animations.
- Mobile: hero stacks, Inspector below the copy, stickers hidden, no dragging, cards in one column, work stickers always visible.
- Lighthouse ≥ 90 on Performance, Accessibility, SEO. Images via `next/image`.

## 9. Phases (stop after each)

1. Project setup, tokens, fonts, layout shell, header/footer, content loading.
2. Home page without interactions (static, matches the design at 1440px and on mobile).
3. Home interactions: Inspector, grid overlay, drag + stickers, cursors, card hover.
4. Case pages from MDX, all six, with the Next case loop.
5. Consent banner, GA4, Clarity, Vercel Analytics, events, privacy page.
6. SEO, accessibility and performance pass; push to GitHub; Vercel deploy instructions.

Open items Yuliia will fill later (leave TODO comments, not visible text): Care for Kids screenshots, the exact month Cobalt ended (CV only), any wording she changes after review.
