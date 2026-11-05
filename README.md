# Mostafizur Rahman — Portfolio

Personal portfolio of **Mostafizur Rahman**, AI Builder & Gen AI Engineer.

**Live:** https://www.mostafizur.me

## Stack

Plain, fast and dependency-free:

- **HTML** — static pages: `index.html` (hand-written) plus generated `about.html`, `contact.html`, `services/` and `projects/`
- **CSS** — `styles.css` with design tokens, responsive layout and a motion system (respects `prefers-reduced-motion`)
- **JavaScript** — `main.js`, vanilla, no frameworks; every page works and is readable without it
- **Fonts** — Sora and DM Sans, self-hosted in `fonts/`
- **Contact form** — delivered by email through [FormSubmit](https://formsubmit.co)
- **Hosting** — Vercel (static, no build step), configured in `vercel.json`

## Editing content

Most text lives in **`scripts/content.mjs`**: services, case studies, FAQ, experience, education and the
structured data facts. After editing it, regenerate the pages:

```
node scripts/build.mjs
```

This rewrites `about.html`, `contact.html`, `services/`, `projects/`, `sitemap.xml`, `llms.txt` and the
generated blocks inside `index.html` (everything between `<!-- build:NAME -->` and `<!-- /build:NAME -->`).
Edit the rest of `index.html` by hand as before. Commit the generated files: Vercel serves them as they are.

- Missing facts are written as `todo('...')` and show on the page as **[ADD REAL DETAIL: …]**.
- Case studies listed in `DRAFTS` (top of `content.mjs`) are built with `noindex`, left out of the sitemap
  and not linked anywhere. Remove a slug from `DRAFTS` once its page has real details.
- The build fails if a title is over 60 characters or a description over 155.

## Run and check locally

```
node scripts/serve.mjs 4173
```

Then open http://localhost:4173. It behaves like Vercel (clean URLs such as `/about`, gzip, the 404 page).
With the server running, check the whole site:

```
node scripts/verify.mjs
```

It checks JSON-LD, canonical URLs, one H1 per page, alt text, internal links, the sitemap, robots.txt and llms.txt.

To regenerate the responsive portrait images (needs Python with Pillow): `python scripts/make-images.py`.

## Project structure

```
index.html          homepage
about.html, contact.html, services/, projects/   generated pages
styles.css          all styles (MOTION block, then inner-page styles at the end)
main.js             interactions, form, animations
fonts/              self-hosted WOFF2 fonts
images/             portraits (AVIF/WebP sizes), education photos, project covers, og.jpg
scripts/            content + page generator, local server, site checks (not deployed)
sitemap.xml, robots.txt, llms.txt   for search engines and AI assistants
cv.pdf, cv-source/  downloadable CV and its HTML source
vercel.json         hosting config (headers, caching, clean URLs, redirects)
404.html            not-found page
DEPLOY.md           deployment guide
SEO-PLAN.md         SEO changelog, open items and the off-site plan
```

## Deploy

Every push to `main` on GitHub (`msajeeb003/new-landing-page`) redeploys the site. See [DEPLOY.md](DEPLOY.md).

---

© 2026 Mostafizur Rahman
