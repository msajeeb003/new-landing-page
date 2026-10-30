# Build prompt — Personal Portfolio Landing Page

> Paste this whole file into your IDE's AI (Cursor / Claude Code / Copilot / Windsurf), or save it in the repo as `PROMPT.md` and say: **"Build exactly what PROMPT.md describes."**
> Build it section by section in the order given. Do not skip, merge, rename or "improve" sections. Every value below (colors, sizes, radii, timings) is intentional — use it exactly.

---

## 0. Ground rules for the AI

1. **Stack:** one `index.html`, one `styles.css`, one `main.js`. Semantic HTML5, plain CSS with custom properties, vanilla JS (no frameworks, no jQuery, no animation libraries). Google Fonts are the only external dependency.
2. **Folder structure:**
   ```
   /index.html
   /styles.css
   /main.js
   /images/hero-pointing.webp      (+ .png fallback)
   /images/about-thumbsup.webp     (+ .png fallback)
   /images/cta-armscrossed.webp    (+ .png fallback)
   /images/spare-thinking.webp     (+ .png fallback, not used yet)
   /images/edu-1.jpg, edu-2.jpg, edu-3.jpg   (institute HQ photos — use a styled placeholder until provided)
   ```
3. **Placeholders:** every text in `[square brackets]` is a placeholder. Keep it as visible text exactly as written so I can find and replace it later. Never invent names, numbers, companies or quotes.
4. **Layout:** content max-width `1216px`, centered, side padding `32px` desktop / `16px` mobile. Use CSS grid and flex with `gap` — no margin hacks between siblings.
5. **Breakpoints:** desktop ≥ `1024px`, tablet `768–1023px`, mobile ≤ `767px`. Design is desktop-first in this spec; every section lists its mobile behaviour.
6. **No horizontal page scroll at any width.** Anything wide (logo strip, tabs, testimonials on mobile) scrolls inside its own container.
7. **Accessibility:** real `<button>`, `<a href>`, `<label for>`; visible focus ring `outline: 3px solid var(--accent); outline-offset: 3px`; all decorative SVG `aria-hidden="true"`; every `<img>` has meaningful `alt`; text contrast ≥ 4.5:1.
8. **Icons:** inline SVG, 24×24 viewBox, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`. Use Lucide/Feather-style shapes. **No emoji anywhere.**
9. **Motion** is specified in section 15. Implement it as a separate block at the end of `styles.css` and in `main.js`. All motion must switch off under `prefers-reduced-motion: reduce`.

---

## 1. Design tokens (put in `:root` at the top of `styles.css`)

```css
:root {
  /* Core palette */
  --bg:          #FFF7F2;  /* page ground, warm white */
  --surface:     #FFFFFF;  /* cards */
  --ink:         #16193A;  /* headings, main text, dark panels */
  --ink-soft:    #5C6180;  /* body text */
  --ink-mute:    #9A9EBF;  /* captions on dark */
  --line:        #F3E6DD;  /* card borders, dividers */
  --line-strong: #E6D9D0;  /* ghost button border */

  /* Accent (the ONE brand color — buttons, highlights, active states) */
  --accent:      #F26B21;
  --accent-dark: #D9560F;  /* hover */
  --accent-soft: #FFE3D4;  /* tinted chip background */
  --accent-text: #C2500C;  /* accent text on soft background */

  /* Support colors — only for icon chips, number badges, chart bars, covers, rings */
  --lilac: #7C5CFF;  --lilac-soft: #EDE6FF;  --lilac-text: #5A3EDB;
  --mint:  #3ECF8E;  --mint-soft:  #DDF6EA;  --mint-text:  #177A4F;  --mint-deep: #1E9E66;
  --sky:   #3B82F6;  --sky-soft:   #DCEBFF;  --sky-text:   #1F5FCC;
  --sun:   #FFC53D;  --sun-soft:   #FFF1C7;  --sun-deep:   #D99A00;
  --pink:  #FF6FAE;
  --red:   #FF4D4D;

  /* Gradients */
  --hero-wash:  linear-gradient(120deg, #FFE9DD 0%, #FFF5EF 48%, #EDE6FF 100%);
  --photo-arch: linear-gradient(180deg, #FFD6C2 0%, #FFE4D6 55%, #E6DDFF 100%);
  --brand-mark: linear-gradient(135deg, #F26B21, #FF6FAE);
  --ring-rainbow: conic-gradient(#F26B21, #FF6FAE, #B9A4FF, #3ECF8E, #F26B21);
  --border-glow: linear-gradient(120deg, #FF9A62, #FF6FAE 50%, #B9A4FF);

  /* Type */
  --font-display: "Sora", "DM Sans", system-ui, sans-serif;
  --font-body:    "DM Sans", system-ui, sans-serif;

  /* Radii */
  --r-sm: 12px;   /* buttons, inputs */
  --r-md: 16px;   /* small cards */
  --r-lg: 18px;   /* standard cards */
  --r-xl: 28px;   /* big panels, photo frames */
  --r-pill: 999px;

  /* Shadows */
  --shadow-float:  0 18px 44px rgba(22, 25, 58, 0.12);
  --shadow-dark:   0 24px 50px rgba(22, 25, 58, 0.25);
  --shadow-accent: 0 10px 24px rgba(242, 107, 33, 0.28);

  /* Motion */
  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 180ms;
  --dur-base: 320ms;
  --dur-slow: 700ms;
}
```

**Fonts** — in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type scale

| Token | Font | Size desktop / mobile | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `.h1` | Sora | 68px / 40px | 800 | 1.02 / 1.05 | -0.02em |
| `.h2` | Sora | 46px / 30px | 800 | 1.08 / 1.12 | -0.02em |
| `.h3` | Sora | 20px / 17px | 700 | 1.3 | -0.01em |
| `.p` (body) | DM Sans | 17px / 15px | 400 | 1.65 / 1.6 | 0 |
| `.sm` (small) | DM Sans | 14px / 13px | 400 | 1.5 | 0 |
| `.label` (section eyebrow) | DM Sans | 13px / 12px | 700, uppercase | 1.2 | 0.06em, color `--accent` |
| Stat number | Sora | 30–34px / 22–26px | 800 | 1 | -0.02em |

All headings: `text-wrap: balance`. Body paragraphs: `max-width: 460–520px` (≈65 characters).

### Reusable components (build these first as CSS classes)

- **`.card`** — `background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg);`
- **`.card--float`** — adds `box-shadow: var(--shadow-float);`
- **`.btn`** (primary) — height `52px` (mobile `50px`), padding `0 26px`, radius `--r-sm`, background `--accent`, white text, DM Sans 15px/700, `box-shadow: var(--shadow-accent)`. Hover: background `--accent-dark`. Optional trailing arrow icon 18px.
- **`.btn--ghost`** — same size, white background, `1.5px solid var(--line-strong)`, text `--ink`. Hover: border `--ink`.
- **`.chip`** — inline-flex, height `30px`, padding `0 12px`, radius pill, 13px/600. Variants use the `*-soft` background + `*-text` color pairs.
- **`.icon-badge`** — circle 48px (sizes 40/56/60 also used), background = a `*-soft` color, icon color = matching strong color, icon 22px centered.
- **`.dot-ring`** — decorative 12px circle, `2.5px solid` border in red / sky / mint, transparent fill, absolutely positioned.
- **`.ring-badge`** — a rotating rainbow ring (`--ring-rainbow`, 5–6px thick) wrapped around a white circle card holding an icon. See motion M5.

---

## 2. Page skeleton (order is fixed)

```
<header>  Sticky floating nav
<main>
  #home        Hero (with logo strip at its bottom)
  #services    Services
  #process     Process
  #about       Why me
  #education   Education & certifications
  #results     Results
  #work        Recent projects
  #testimonials
  #contact     CTA band
</main>
<footer>
<div class="mobile-cta">  (mobile only, sticky bottom bar)
```

Section vertical padding: `100px` desktop, `48px` mobile. Backgrounds alternate: `--bg` → white → `--bg` … exactly as listed per section below.

---

## 3. Navigation (sticky, floating)

**Desktop**
- Wrapper `<header>`: `position: sticky; top: 0; z-index: 50; padding: 20px 32px 0;` transparent background.
- Inside: a `.card.card--float` bar, max-width 1216px, centered, radius `20px`, padding `14px 16px 14px 28px`, flex row, `justify-content: space-between`, `align-items: center`.
- **Left — logo:** 34×34 square, radius 10px, background `--brand-mark`, then text `[Studio]` in Sora 20px/800, gap 10px. Links to `#home`.
- **Center — links:** Home, Services, Work, About, Education. DM Sans 15px/600, color `--ink-soft`, gap 32px. Active link color `--ink`. Hover color `--ink`.
- **Right — button:** `.btn` "Contact me", height 46px, links to `#contact`.
- **Scroll behaviour:** see M1 (shrinks + gains stronger shadow after 40px of scroll). Active link updates with scroll-spy (M12).

**Mobile (≤767px)**
- Padding `12px 16px 0`. Bar radius 16px, padding `10px 10px 10px 16px`.
- Logo 28×28, text 17px.
- Center links + Contact button hidden. Right side shows a 44×44 menu `<button aria-label="Open menu" aria-expanded="false">` with a 3-line hamburger icon, white, `1px solid --line`, radius 12px.
- Tap opens a dropdown `.card.card--float` 8px below the bar: links stacked (Sora 18px/600, gap 14px, padding 18px) + full-width `.btn` "Contact me". See M11. Tapping a link closes the menu.

---

## 4. Hero (`#home`)

**Background:** full-width band with `--hero-wash`, `position: relative; overflow: hidden`. Two soft blurred orbs (decorative `div`s, `aria-hidden`):
- Orb A: 560×560 circle, `radial-gradient(circle, rgba(255,186,150,.55), transparent 70%)`, top `-140px`, right `-120px`.
- Orb B: 420×420 circle, `radial-gradient(circle, rgba(185,164,255,.5), transparent 70%)`, bottom `-160px`, left `-140px`.

**Grid:** 2 equal columns, gap 48px, padding `84px 32px 56px`, `align-items: center`.

### Left column (stack, gap 26px)
1. **Availability chip** — white background, `1px solid --line`, text "Available for new projects" (13px/600, `--ink`). Leading 9px green dot `--mint` that pulses (M3).
2. **H1** — three lines: `Hi! I'm [Name],` / `I design products` / `people love.` — `[Name]` in `--accent`. Use `<br>` on desktop only; on mobile let it wrap naturally.
3. **Intro paragraph** — `.p`, max-width 500px: "[Role] with [N] years in [specialty]. I turn messy ideas into clear, beautiful interfaces that ship."
4. **Buttons row** (gap 14px, wrap): `.btn` "Hire me" + arrow icon → `#contact`; `.btn--ghost` "View work" → `#work`.
5. **Social proof row** (gap 14px, margin-top 6px): three overlapping 38px circles (`--sun`, `--sky`, `--pink`, each with `3px solid #FFF5EF` border, `margin-right: -10px` overlap) — these are avatar placeholders. Then `.sm`: **"[N]+ happy clients"** (bold, `--ink`) + " · ★★★★★ [4.9] rating".

### Right column — photo stage (`position: relative; min-height: 580px`)
Layer order, back to front:
1. **Arch backdrop** — absolute, `left/right: 80px; top: 70px; bottom: 0`, radius `260px 260px 32px 32px`, background `--photo-arch`.
2. **Portrait** — `<picture>` with `hero-pointing.webp` / `.png`, absolute `left/right: 20px; top: 0; bottom: 0`, `object-fit: contain; object-position: center bottom`, `filter: drop-shadow(0 24px 40px rgba(22,25,58,.18))`. `alt="[Name] pointing at himself"`. `fetchpriority="high"`, no lazy loading.
3. **Decorations** (all `aria-hidden`):
   - `.dot-ring` red at top 10px / left 70px; sky at top 120px / right 10px; mint at bottom 150px / left 10px. (M4 drift)
   - 4-point star sparkle, 34px, fill `--sun`, top 40px / left 0. (M4 twinkle)
   - Hand-drawn squiggle arrow SVG, 110×56, stroke `--accent` 3px, near bottom-left of the portrait (bottom 44px / left 150px), pointing toward the skill card. Path: `M4 50c30-40 60-40 100-10 M96 32l10 8-12 6`. (M2 draw-on)
4. **Floating card — Award** (top 110px / right 0, width 206px, padding 14px, `.card.card--float`): `.icon-badge` sun-soft/sun-deep with award-ribbon icon + text stack: "Best design awards" (14px/700) and "[Award], [year]" (12px, `--ink-soft`). (M5 float, 5s)
5. **Floating card — Skill** (bottom 60px / left 0, width 224px): `.icon-badge` lilac-soft/lilac with pen-tool icon + "UI / UX design" / "[N]+ products shipped". (M5 float, 6.5s, reverse phase)
6. **Ring badge — Platform** (bottom -10px / right 30px): 136px rotating rainbow ring (M6) around a 124px white circle card containing a 40px mint `.icon-badge` with shopping-bag icon and text "[Platform] expert" (12px/700).

### Logo strip (still inside the hero band, below the grid)
- Padding `8px 32px 72px`. Heading "Worked with all these brands & clients" — Sora 16px/700.
- Row (gap 14px, wrap): five 60×60 white circle `.card.card--float` items with a letter placeholder (A–E) colored accent / sky / red / mint / lilac, plus one pill (height 60, padding 0 22px) with "[logo wordmark]". Replace letters with real logo SVGs later. Logos are greyscale by default and turn full colour on hover (M9).

**Mobile:** single column. Order: chip → H1 (40px) → paragraph → buttons (two equal-width buttons side by side) → photo stage (height 360px, arch inset 50px, award card 150px wide top-right, skill card 158px bottom-left, ring badge 86px) → social proof → "Worked with" (14px) → logos as a horizontal scroll row of 48px circles.

---

## 5. Services (`#services`, white background)

**Grid:** 2 columns, gap 72px, `align-items: center`.

### Left — service card stack
Container: padding 20px, radius `--r-xl`, background `linear-gradient(180deg, #FFF3EC, #FFF8F4)`, flex column gap 16px.

Three service rows. Each row: `.card`, padding 22px, flex row, gap 16px, `align-items: flex-start`:
- 60px `.icon-badge` (icon 26px)
- Text stack (gap 6px): `.h3` title, `.sm` one-line description, "Learn more →" link (14px/700, `--accent`, no underline; underline on hover).

| # | Title | Badge colors | Icon | Description |
|---|---|---|---|---|
| 1 (featured) | Developer | accent-soft / accent | code brackets `</>` | Responsive front-ends and clean, maintainable code. Built to be handed over. |
| 2 | UI / UX | lilac-soft / lilac | layout grid | Flows, wireframes and polished interfaces grounded in user research. |
| 3 | Brand design | mint-soft / mint-deep | target / crosshair | Logo, color system and typography that hold together everywhere. |

**Featured card (#1):** wrapped in a 4px gradient border — outer `div` with `padding: 4px; border-radius: 20px; background: var(--border-glow)`; inner card `border: 0; border-radius: 16px`. (M7 glow shift)

Under the stack, centered: 40px dark circle (`--ink`) with a white chevron-down icon. Clicking it cycles which service is "featured" (moves the gradient border to the next card). (M8)

### Right — pitch
Stack gap 22px: `.label` "SERVICES" → `.h2` "My awesome" / "services" (second line `--accent`) → two `.p` paragraphs (placeholders: how you work; your edge) → `.btn` "Hire me".

**Mobile:** pitch text first (label, h2, one paragraph), then the card stack (padding 14px, cards padding 16px, badges 48px), then full-width "Hire me".

---

## 6. Process (`#process`, `--bg` background)

- **Header row:** left stack (`.label` "PROCESS", `.h2` "How a project runs"); right `.p` max-width 400px "Clear milestones, weekly check-ins, no surprises. Here's the path from first call to launch." Flex, `space-between`, `align-items: flex-end`, wraps.
- **Steps:** 4-column grid, gap 22px, `position: relative`. A dashed connector line behind the cards: absolute, `left/right: 60px; top: 46px; border-top: 2px dashed #E6D4C8`.
- Each step = `.card.card--float`, padding 26px, stack gap 12px:
  - Number tile: 44×44, radius 14px, solid color, white Sora 18px/800 number.
  - `.h3` title, `.sm` description, duration `.chip`.

| Step | Tile color | Title | Description | Chip (soft/text) |
|---|---|---|---|---|
| 1 | accent | Discover | Call, goals, constraints and the metric we'll measure success by. | "[X] days" accent |
| 2 | lilac | Design | Wireframes, visual direction, two review rounds. | "[X] weeks" lilac |
| 3 | mint | Build | Development, QA on real devices, handover docs. | "[X] weeks" mint |
| 4 | sky | Launch | Go-live, measurement, and a plan for the next iteration. | "ongoing" sky |

Motion: M10 (dashed line draws left→right, then cards pop in one after another).

**Mobile:** steps stack vertically as horizontal rows (tile 40px on the left, title + "description · duration" on the right), no connector line. Tablet: 2×2 grid.

---

## 7. Why me (`#about`, background `linear-gradient(180deg, #FFFFFF 0%, #FFF1EA 100%)`)

**Grid:** 2 columns, gap 72px.

### Left (stack gap 24px)
- `.label` "WHY ME", `.h2` "Clients always get exceptional work from me", `.p` bio placeholder ("Short first-person bio: background, years, what you care about.").
- Three proof rows (gap 14px). Each: 40px `.icon-badge` with check icon (stroke 2.6) + stack: bold 16px title + `.sm` line.
  1. accent-soft/accent — "Top-quality work" — "Pixel-level care on every screen."
  2. lilac-soft/lilac — "Clear commitments" — "Fixed scope, agreed milestones."
  3. mint-soft/mint-deep — "24 hours active" — "Replies within a day, every day."
- `.btn--ghost` "Download CV" (`href="[cv.pdf]"`, `download` attribute).

### Right — photo stage (min-height 540px)
- Arch backdrop: `left: 90px; right: 70px; top: 50px; bottom: 0`, radius `240px 240px 28px 28px`, background `linear-gradient(180deg, #E6DDFF 0%, #F3EEFF 50%, #DDF6EA 100%)`.
- Portrait `about-thumbsup.webp`, contain, bottom-aligned, same drop-shadow as hero. `alt="[Name] giving a thumbs up"`. `loading="lazy"`.
- Dot rings: mint top 30 / left 50; red top 220 / left 0; sky bottom 150 / right 10.
- Ring badge top 40 / right 0: 112px ring (`conic-gradient(#FFC53D, #FF6FAE, #B9A4FF, #FFC53D)`), 96px white circle, 48px mint badge with shield-check icon. (M6)
- Floating card bottom 10 / left 0, width 176px, padding 20px, centered stack: 56px sun-soft badge with clock icon; "**24** hours active" (Sora 15px, "24" in accent); "chat your problem anytime" (12px, accent). (M5 float)

**Mobile:** label → h2 → photo stage (height 300px) → bio → proof rows → full-width ghost button.

---

## 8. Education & certifications (`#education`, background `linear-gradient(180deg, #FFF1EA 0%, #FFFFFF 100%)`)

### Header row (flex, space-between, align bottom, wraps)
- Left: `.label` "EDUCATION", `.h2` "Education & certifications" ("certifications" in `--accent`).
- Right: three count chips, height 36px, padding 0 16px: "[N] degrees" (accent pair), "[N] certifications" (lilac pair), "[N]+ courses" (mint pair).

### Timeline list
- Container: flex column, gap 24px, `padding-left: 44px`, `position: relative`.
- Vertical dashed rail: absolute, `left: 11px; top: 30px; bottom: 30px; border-left: 2px dashed #E6D4C8`. (M13 draws top→bottom)
- Each entry = `<article class="card card--float edu-card">`, padding 16px, **3-column grid** `1.1fr 1.4fr 0.6fr`, gap 32px, `align-items: center`, `position: relative`.
- **Timeline dot:** absolute, `left: -44px`, vertically centered, 24px circle, white fill, `5px solid` entry color.

**Column 1 — Institute HQ photo**
- `<figure>` with `aspect-ratio: 16 / 10`, width 100%, radius 14px, `overflow: hidden`.
- Real photo: `<img src="images/edu-N.jpg" alt="[Institute name] main building" loading="lazy">`, `object-fit: cover`. Request UHD: min 2400×1500. Serve `srcset` at 800w / 1600w / 2400w.
- **Until a photo exists**, render a placeholder: background `linear-gradient(160deg, <entry soft color>, #FFFFFF)`, centered stack: 40px building icon in entry color, "Institute HQ photo" (14px/600, `#7A6F9C`), "UHD · 16:10 · min 2400 × 1500" (12px/500).
- Hover: image zooms (M14).

**Column 2 — Details** (stack gap 10px)
- Chip row: type chip (entry soft/text pair) + year chip (background `--bg`, `1px solid --line`, `--ink`, leading 14px calendar icon).
- Title: Sora 23px/700 — certification or degree name.
- Institute row: 18px graduation-cap icon in entry color + institute name (15px/700).
- Location row: 16px map-pin icon + city, country (`.sm`).
- Major / thesis / credential line (`.sm`).

**Column 3 — Result ring** (centered stack gap 10px)
- 124px circle. Background `conic-gradient(<entry color> 0 <pct>%, #F3E6DD <pct>% 100%)` where `pct = score ÷ scale × 100`.
- Inside, a 96px white circle: score (Sora 26px/800) above "of <scale>" (11px).
- Below: label in entry text color (13px/700 — "CGPA" / "GPA" / "Score") and result line (12px, `--ink-soft`).
- Ring fills from 0 to pct and the number counts up when scrolled into view (M15).

**Entries (placeholder data — keep in a JS array so it's easy to edit, render with a template):**

```js
const education = [
  { type: "Degree", title: "[B.Sc. in Computer Science & Engineering]",
    institute: "[University name]", location: "[City, Country]", years: "[2019 – 2023]",
    detail: "[Major / thesis topic]", label: "CGPA", score: 3.85, scale: 4.00,
    result: "[First class with distinction]", photo: "images/edu-1.jpg",
    color: "var(--accent)", soft: "var(--accent-soft)", text: "var(--accent-text)" },
  { type: "Higher secondary", title: "[HSC — Science group]",
    institute: "[College name]", location: "[City, Country]", years: "[2016 – 2018]",
    detail: "[Board / group]", label: "GPA", score: 5.00, scale: 5.00,
    result: "[Result / division]", photo: "images/edu-2.jpg",
    color: "var(--lilac)", soft: "var(--lilac-soft)", text: "var(--lilac-text)" },
  { type: "Certification", title: "[Certification name]",
    institute: "[Issuing institute]", location: "[Online / City]", years: "[2024]",
    detail: "[Credential ID: XXXX-XXXX]", label: "Score", score: 92, scale: 100,
    result: "[Grade / honours]", photo: "images/edu-3.jpg",
    color: "var(--mint-deep)", soft: "var(--mint-soft)", text: "var(--mint-text)" }
];
```
Because conic-gradient can't read a CSS variable inside JS string math reliably, set `--c` (color) and `--p` (percent) as inline custom properties on each ring and use `background: conic-gradient(var(--c) 0 calc(var(--p) * 1%), #F3E6DD 0)` in CSS. Animate `--p` via `@property --p { syntax: '<number>'; inherits: false; initial-value: 0; }`.

**Mobile:** no rail or dots. Each card stacks: photo (16:10, radius 12px) → chips → title (18px) → institute → location → a divider (`1px solid --line`) → row with a 72px result ring (56px inner, score 16px) beside label / result / detail. Only two count chips (degrees, certifications).

---

## 9. Results (`#results`, white background)

**Grid:** 2 columns, gap 72px.

### Left — dashboard collage (min-height 420px, `position: relative`)
1. **Dark stat tile** (top 0 / left 0, width 290px, padding 24px, radius 22px, background `--ink`, white text, `--shadow-dark`, z-index 2): "[X]k" (Sora 34px/800) / "Number of people reached" (13px, 75% opacity) / a 70px donut: `conic-gradient(--accent 0 40%, --mint 40% 65%, --sky 65% 85%, --sun 85% 100%)` with a 38px `--ink` hole. (M16 donut sweep)
2. **Bar chart card** (top 40 / left 190 / right 0, height 270px, padding 24px, `.card`, background `linear-gradient(180deg, #F2FBF6, #FFFFFF)`): 4 bars bottom-aligned, flex `space-around`. Each bar column: month label (12px) above a bar max-width 54px, radius 12px.
   - sep: 90px, `linear-gradient(180deg, #B9A4FF, #EDE6FF)`
   - oct: 170px, `linear-gradient(180deg, #FF6B6B, #FFD3D3)`
   - nov: 120px, `linear-gradient(180deg, #3B82F6, #DCEBFF)`
   - dec: 200px, `linear-gradient(180deg, #F26B21, #FFE3D4)`
   (M17 bars grow up, staggered)
3. **Projects card** (bottom 0 / left 60, width 230px, padding 22px, `.card.card--float`, z-index 3): 22px red-tint circle with heart icon + "Projects" (14px/600) / "[X]" (Sora 30px/800) / "**+[Y]** in the last year" (+Y in `--mint-deep`). (M5 float)

### Right — copy
`.label` "RESULTS" → `.h2` "Perfect solution" / "for your business" (line 2 accent) → `.p` "Explain what these numbers mean and where they come from. Only real figures go here." → 3-column stat row: "[X]+" Years (accent), "[X]+" Clients (lilac), "[X]%" Repeat rate (mint-deep), Sora 30px/800 numbers, `.sm` labels (M18 count-up) → `.btn` "Details" → `#work`.

**Mobile:** label → h2 → collage (height 300px, stat tile 180px wide, bars 30px wide) → 3 stat mini-cards in a row.

---

## 10. Recent projects (`#work`, `--bg` background)

- Centered header: `.label` "RECENT WORK", `.h2` "Recent projects".
- **Filter tabs** row (gap 10px, centered, wraps): `<button>`s "All", "Web", "Mobile", "Branding". Height 42px, padding 0 20px, pill, `1.5px solid #EADCD2`, white, `--ink-soft` 14px/600. Hover: border + text `--accent`. **Active:** background `--accent`, white text, `box-shadow: 0 8px 20px rgba(242,107,33,.3)`. Use `aria-pressed`.
- **Grid:** 3 columns, gap 24px. 6 project cards; each `<a class="card card--float">`, padding 12px, stack gap 12px:
  - Cover: height 230px, radius 14px, gradient placeholder (replace with `<img>` later, `object-fit: cover`).
  - Body (padding 6px 8px 8px): category chip (Web = sky pair, Mobile = lilac pair, Branding = accent pair), `.h3` "[Project name]", `.sm` "One-line outcome: what changed for the client."
- Cover placeholder gradients (in order): `#3B82F6→#8FD3FF`, `#2B2C8A→#7C5CFF`, `#5A3EDB→#B9A4FF`, `#F26B21→#FFC53D`, `#1E9E66→#3ECF8E`, `#FF4D4D→#FF6FAE` (all 140deg).
- Categories in order: Web, Mobile, Branding, Web, Mobile, Web.
- Centered `.btn--ghost` "View all work" below.
- Filtering: clicking a tab shows only matching cards (M19). Card hover: M9.

**Mobile:** tabs become a horizontal scroll row; cards single column, cover 190px; show the first 3.

---

## 11. Testimonials (`#testimonials`, white background)

- Header: `.label` "TESTIMONIALS", `.h2` "What clients say".
- 3-column grid, gap 24px. Each card padding 30px, stack gap 18px, tinted:
  1. background `#FFF3EC`, border `#FFE3D4`, quote mark accent, avatar `--sun`
  2. background `#F3EEFF`, border `#E4DAFF`, quote mark lilac, avatar `--sky`
  3. background `#EAF9F2`, border `#CFF0DF`, quote mark mint-deep, avatar `--pink`
- Card content: big opening quote "“" (Sora 56px/800, line-height 0.6) → quote text (`.p` 16px, `--ink`; placeholder "Two or three sentences from a real client. A specific result beats generic praise.") → footer row pushed to bottom (`margin-top: auto`): 44px avatar circle + "[Client name]" (14px/700) / "[Role], [Company]" (12px).
- Use `<figure><blockquote>…</blockquote><figcaption>…</figcaption></figure>`.

**Mobile:** horizontal scroll-snap carousel, cards 280px wide, `scroll-snap-type: x mandatory`.

---

## 12. CTA band (`#contact`, `--bg` background)

- Outer padding `100px 32px 60px`.
- Dark panel: radius 30px, background `--ink`, white text, `position: relative; overflow: hidden`, min-height 340px, padding `64px 0 64px 64px`, **3-column grid** `1.1fr 1fr 0.55fr`, gap 40px, `align-items: center`.
- Two glow orbs inside (decorative): accent orb 420px `radial-gradient(rgba(242,107,33,.6), transparent 70%)` top -160 / right -100; lilac orb 320px `rgba(124,92,255,.5)` bottom -160 / left -80. (M20 slow drift)
- **Column 1:** `.h2` white "Ready to get started?" + `.p` `#C9CCE0` "You know about me. Now let's talk about you — I reply within 24 hours."
- **Column 2 — form:** `<form>` with `<label for="cta-email">` "YOUR EMAIL" (13px/700, uppercase, `#C9CCE0`), then a row: email `<input>` (height 56px, radius 14px, white, `--ink` text, border `1px solid #3A3F6B`, placeholder "name@company.com") + round 56px `.btn` (radius 50%, paper-plane icon, `aria-label="Send message"`). Below: "Or email directly: [hello@yourdomain.com]" (12px, `#9A9EBF`).
  - On submit: `preventDefault`, validate email; invalid → red helper text "Enter a valid email, like name@company.com" under the field; valid → swap the row for a success line "Message sent. I'll reply within 24 hours." with a check icon. (M21)
- **Column 3 — photo:** `cta-armscrossed.webp`, absolutely positioned inside the column, `bottom: -64px` (so it sits flush on the panel's bottom edge), height = column height + 110px, `object-fit: contain`, bottom-aligned. `alt="[Name] with arms crossed"`.

**Mobile:** panel padding `28px 22px`, single column: h2 → paragraph → label → full-width input → full-width "Send message" button → email line. Hide the photo.

---

## 13. Footer (`--bg` background)

- Row 1 (padding `24px 32px 40px`, flex, space-between, wraps): logo (30px mark + "[Studio]" Sora 18px/800) · links Home / Services / Work / About (15px/600, `--ink-soft`; Home in accent) · three 42px circular social buttons (white, `1px solid --line`, LinkedIn / GitHub / Instagram line icons, `aria-label`s). Social hover: M9.
- Row 2 (padding `0 32px 36px`, space-between): "© [Year] [Name]. All rights reserved." · pulsing green dot + "Available for new projects · [City, Country]" (both 12px, `--ink-soft`).

**Mobile:** logo + socials on one row, copyright line below, `padding-bottom: 96px` to clear the sticky bar.

---

## 14. Mobile sticky CTA bar (≤767px only)

`position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;` padding `12px 16px calc(12px + env(safe-area-inset-bottom))`, background `rgba(255,247,242,.92)` with `backdrop-filter: blur(10px)`, top border `1px solid --line`. Contents: `.btn` "Hire me" (flex 1) + `.btn--ghost` "Work" (auto width). Hidden while the hero is in view; slides up once the hero leaves the viewport (M22).

---

## 15. Motion & animation spec

Put all of this in a clearly commented `/* ===== MOTION ===== */` block at the end of `styles.css`, and a `// ===== MOTION =====` block in `main.js`.

**Principles:** motion is soft and purposeful — floating widgets, a few scroll reveals, responsive hovers. Nothing bounces aggressively, nothing loops faster than 1.8s, no parallax on text. Every element is fully visible at rest if JS fails (reveal classes are added by JS, so without JS nothing stays hidden).

### Global reveal system (used by many items below)
- JS adds `.js` to `<html>` on load. CSS: `.js [data-reveal] { opacity: 0; transform: translateY(24px); }` and `.js [data-reveal].is-in { opacity: 1; transform: none; transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out); }`.
- One shared `IntersectionObserver` (`threshold: 0.15`, `rootMargin: "0px 0px -10% 0px"`). When an element enters, add `.is-in` and unobserve it (animates once).
- Stagger: children with `data-reveal` inside a `[data-stagger]` parent get `transition-delay: calc(var(--i) * 80ms)`; set `--i` via JS from the child index.
- Variants: `data-reveal="up"` (default), `data-reveal="left"` (`translateX(-24px)`), `data-reveal="right"` (`translateX(24px)`), `data-reveal="scale"` (`scale(.94)`).

### Per-element motions

| ID | Element | Trigger | Animation |
|---|---|---|---|
| **M0** | Hero load sequence (the one big orchestrated moment) | Page load | 0ms chip fades up · 120ms H1 line 1, 220ms line 2, 320ms line 3 (each `translateY(28px)→0`, opacity, 700ms ease-out; wrap each line in a span) · 460ms paragraph · 560ms buttons · 640ms social proof · photo: arch scales `0.92→1` + fades 900ms from 200ms; portrait rises `translateY(40px)→0` + fades 900ms from 300ms · floating cards pop in `scale(.8)→1` + fade, 500ms ease-out, at 900ms / 1050ms / 1200ms · then the loops (M3–M6) begin. |
| **M1** | Nav bar | Scroll > 40px | Toggle `.is-scrolled` on header: bar padding shrinks 14→10px, shadow goes from `--shadow-float` to `0 12px 30px rgba(22,25,58,.16)`, background becomes `rgba(255,255,255,.88)` with `backdrop-filter: blur(12px)`. Transition 320ms. Use a passive scroll listener + `requestAnimationFrame`. |
| **M2** | Hero squiggle arrow | After M0 (at 1300ms) | SVG stroke draw-on: `stroke-dasharray` = path length, `stroke-dashoffset` from length→0 over 900ms ease-in-out. |
| **M3** | Availability dots (hero chip, footer) | Loop | `@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(62,207,142,.55) } 60% { box-shadow: 0 0 0 8px rgba(62,207,142,0) } }` — 1.8s ease-in-out infinite. |
| **M4** | Dot rings + star sparkle | Loop | Dot rings drift: `translate(0,0) → (6px,-8px) → (0,0)`, 7s ease-in-out infinite, each with a different negative `animation-delay` (-1s, -3s, -5s). Star twinkles: `scale(1)→scale(1.25)→scale(1)` + `rotate(0→20deg→0)`, 3.2s infinite. |
| **M5** | Floating cards (hero award + skill, about 24h card, results projects card) | Loop | `@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }`. Award: 5s. Skill: 6.5s `animation-direction: reverse`. About 24h: 5.5s. Projects: 6s reverse. Mobile: amplitude 8px. |
| **M6** | Rainbow ring badges | Loop | Ring element only (not the white card or icon on top): `rotate(360deg)` 14s linear infinite. |
| **M7** | Featured service gradient border | Loop | Set `background-size: 200% 200%` on the border wrapper and animate `background-position` `0% 50% → 100% 50% → 0% 50%` over 6s ease-in-out infinite. |
| **M8** | Service chevron button | Click | Moves the featured state to the next card: old card's gradient wrapper fades out (200ms), new card's fades in (300ms) and that card nudges `scale(1)→1.02→1` (400ms). Chevron icon rotates 180° each click (300ms). Wraps from card 3 to card 1. |
| **M9** | Hover states (desktop pointer only, wrap in `@media (hover:hover)`) | Hover | **Buttons:** `translateY(-2px)` + shadow grows, 180ms; active `translateY(0) scale(.98)`. Arrow icon in "Hire me" slides `translateX(4px)`. **Project cards:** lift `translateY(-6px)`, shadow to `0 28px 60px rgba(22,25,58,.16)`, cover image `scale(1.05)` inside `overflow:hidden`, 320ms ease-out. **Service rows / process cards / testimonial cards:** `translateY(-4px)` 240ms. **Logos:** `filter: grayscale(1) opacity(.7)` → `grayscale(0) opacity(1)` + `scale(1.08)`, 240ms. **Social buttons:** background → `--ink`, icon → white, 200ms. **Text links ("Learn more →"):** arrow `translateX(4px)`. |
| **M10** | Process section | Scroll into view | Dashed connector: animate `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` over 900ms ease-in-out. Then the 4 cards reveal with `data-reveal="up"` staggered 120ms, starting 300ms after the line begins. Number tiles pop `scale(.6)→1` with a slight overshoot `cubic-bezier(.34,1.56,.64,1)` 450ms as each card lands. |
| **M11** | Mobile menu | Tap | Dropdown: `opacity 0→1`, `translateY(-8px)→0`, `scale(.98)→1`, 240ms ease-out; links stagger 40ms. Hamburger morphs to an X (top/bottom lines rotate ±45°, middle fades) 240ms. Close reverses in 180ms. Toggle `aria-expanded`. Close on Escape and on outside tap. |
| **M12** | Scroll-spy | Scroll | IntersectionObserver on each section (`rootMargin: "-45% 0px -50% 0px"`); active nav link gets `--ink` color and a 6px accent dot underneath that slides between links (`transform: translateX`, 320ms). Smooth scrolling via `html { scroll-behavior: smooth }` with `scroll-margin-top: 110px` on sections. |
| **M13** | Education timeline rail | Scroll into view | Rail draws top→bottom: `transform: scaleY(0)→1`, `transform-origin: top`, 1200ms ease-in-out. Each timeline dot pops `scale(0)→1` (overshoot easing, 400ms) as the rail passes it (delays 200 / 500 / 800ms). Cards reveal `data-reveal="right"` staggered 150ms. |
| **M14** | Education photo | Hover | Image `scale(1)→1.06` over 600ms ease-out inside the 14px-radius frame; a soft dark gradient overlay (`linear-gradient(0deg, rgba(22,25,58,.35), transparent 60%)`) fades in 300ms. |
| **M15** | Education result rings | Scroll into view | Register `@property --p`. Transition `--p` from 0 to the entry percentage over 1200ms ease-out (start 300ms after the card reveals). Simultaneously count the score up with JS `requestAnimationFrame`, easing out, respecting decimals (3.85 → two decimals, 92 → integer). |
| **M16** | Results donut | Scroll into view | Rotate the donut `-90deg→0` and fade in, 900ms; mask reveal using a second conic-gradient overlay animated with `@property` from 0→360deg. |
| **M17** | Results bars | Scroll into view | Each bar `transform: scaleY(0)→1`, `transform-origin: bottom`, 800ms `cubic-bezier(.34,1.56,.64,1)`, staggered 100ms (sep, oct, nov, dec). Month labels fade in after their bar. |
| **M18** | Stat numbers (results [X]k, [X]+, [X]%) | Scroll into view | Count from 0 to target over 1400ms ease-out with `requestAnimationFrame`. Read the target from `data-count="…"` and suffix from `data-suffix`. While placeholders are still in brackets, skip counting and just fade in. |
| **M19** | Work filter | Tab click | Cards leaving: `opacity 1→0`, `scale(1)→.96`, 200ms, then `hidden`. Cards entering: un-hide, `opacity 0→1`, `translateY(12px)→0`, 320ms, staggered 60ms. Animate the grid container height smoothly (FLIP or `grid-template-rows` transition). Active tab background slides between tabs (pill indicator `transform: translateX` + width, 320ms ease-out). |
| **M20** | CTA glow orbs | Loop | Accent orb: `translate(0,0)→(-30px,20px)→(0,0)` 12s ease-in-out infinite. Lilac orb: `translate(0,0)→(25px,-15px)→(0,0)` 14s, delayed -4s. |
| **M21** | CTA form | Submit | Button press `scale(.94)` 120ms → paper-plane icon flies `translate(18px,-18px) rotate(15deg)` + fades 400ms → success line fades up 320ms. Invalid email: input shakes `translateX(0,-6,6,-4,4,0)` 400ms and border turns `--red`. |
| **M22** | Mobile sticky bar | Hero leaves viewport | `transform: translateY(110%)→0`, 320ms ease-out; reverse when hero re-enters. |
| **M23** | Section headings | Scroll into view | Each section's `.label` + `.h2` + intro paragraph use `data-reveal="up"` with `data-stagger` (80ms). Apply only to section headers — not to every card — except where a section above explicitly asks for card reveals (M10, M13, M19). |
| **M24** | Photo portraits in Why me and CTA | Scroll into view | Arch backdrop scales `.92→1`, portrait rises `translateY(30px)→0`, both fade, 800ms ease-out, portrait 150ms later. |

### Reduced motion (required)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .js [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```
In JS, check `matchMedia('(prefers-reduced-motion: reduce)')`; if true, skip count-ups (show final numbers), skip the squiggle draw-on (show it drawn), and set rings to their final percentage immediately.

### Performance rules
- Animate only `transform`, `opacity`, `filter`, `clip-path`, and registered custom properties. Never animate `width`, `height`, `top`, `left`, or `box-shadow` in a loop (the M3 pulse is the single allowed shadow loop).
- Add `will-change: transform` only to looping elements (M4, M5, M6, M20), nothing else.
- Pause all infinite loops when the tab is hidden (`document.visibilitychange` → toggle `.is-paused { animation-play-state: paused }` on `<html>`).
- Pause off-screen loops: an IntersectionObserver toggles `animation-play-state` on each looping element.

---

## 16. Images & quality

- Portraits are background-removed cut-outs (transparent PNG/WebP). Serve with `<picture>`: WebP first, PNG fallback. Give every `<img>` explicit `width` and `height` attributes to prevent layout shift.
- Hero portrait: `fetchpriority="high"`; all others `loading="lazy" decoding="async"`.
- Institute HQ photos: request originals at min 2400×1500 (UHD), export JPG/WebP at 800w, 1600w, 2400w and use `srcset` + `sizes="(max-width: 767px) 92vw, 440px"`.
- Preload the hero WebP: `<link rel="preload" as="image" href="images/hero-pointing.webp" type="image/webp">`.

---

## 17. SEO & meta

- `<title>[Name] — [Role] Portfolio</title>`
- `<meta name="description" content="[One sentence: who you are and what you do]">`
- Open Graph title / description / image (`images/og.jpg`, 1200×630, placeholder).
- `<html lang="en">`. One `<h1>` only (the hero). Section headings are `<h2>`, card titles `<h3>`.

---

## 18. Acceptance checklist (the AI must verify each before finishing)

- [ ] Sections appear in exactly this order: Nav, Hero (+ logos), Services, Process, Why me, Education, Results, Work, Testimonials, CTA, Footer, Mobile bar.
- [ ] All colors come from the `:root` tokens; no other hex values in component rules except the gradients listed in this spec.
- [ ] Sora on headings and numbers, DM Sans everywhere else; font sizes match the type scale.
- [ ] All `[placeholder]` text is still present and visible.
- [ ] Layout checked at 1440px, 1024px, 768px, 390px, 360px — no horizontal scroll, nothing overlapping, nothing clipped.
- [ ] Hero load sequence (M0) plays once; looping widgets (M3–M6, M20) run smoothly and pause when off-screen or the tab is hidden.
- [ ] Scroll reveals, count-ups, ring fills and bar growth fire once when the section enters view.
- [ ] Work filter tabs, service chevron, mobile menu, and CTA form validation all work with mouse, touch and keyboard.
- [ ] With `prefers-reduced-motion: reduce` turned on, the page is fully static and everything is visible.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, no layout shift from images.
