# Mostafizur Rahman — Portfolio

Personal portfolio of **Mostafizur Rahman**, Gen AI Engineer & Automation Specialist.

**Live:** https://www.mostafizur.me

## Stack

Plain, fast and dependency-free:

- **HTML** — one semantic `index.html`
- **CSS** — `styles.css` with design tokens, responsive layout and a motion system (respects `prefers-reduced-motion`)
- **JavaScript** — `main.js`, vanilla, no frameworks
- **Fonts** — Sora and DM Sans (Google Fonts)
- **Contact form** — delivered by email through [FormSubmit](https://formsubmit.co)
- **Hosting** — Vercel (static), configured in `vercel.json`

## Features

- Animated hero, scroll reveals, count-ups and a looping platform-logo marquee
- Project grid with category filters and a "View all work" expander
- Education timeline rendered from data in `main.js`
- Working contact form with validation and a spam trap
- Downloadable one-page CV (`cv.pdf`, generated from `cv-source/cv.html`)
- Security headers (CSP), SEO meta, link previews, sitemap, favicon set and a 404 page

## Project structure

```
index.html        page markup
styles.css        all styles (MOTION block at the end)
main.js           interactions, education data, form, animations
images/           portraits, education photos, project covers, og.jpg
cv.pdf            downloadable CV (privacy-safe)
cv-source/        HTML source of the CV
vercel.json       hosting config (headers, caching, clean URLs)
404.html          not-found page
DEPLOY.md         step-by-step deployment guide
```

## Run locally

Any static server works, for example:

```
python -m http.server 5500
```

Then open http://127.0.0.1:5500.

## Deploy

See [DEPLOY.md](DEPLOY.md). In short: `npx vercel` (project name `mostafizur-ai`), then `npx vercel --prod`.

---

© 2026 Mostafizur Rahman
