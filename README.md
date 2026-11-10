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

- Missing facts are written as `todo('...')`, which renders as **[ADD REAL DETAIL: …]**. It's only allowed in
  case studies listed in `DRAFTS` (top of `content.mjs`): drafts are not built, not linked and not in the
  sitemap, so no placeholder reaches the live site. The build and `verify.mjs` fail if one does.
- Remove a slug from `DRAFTS` once its case study has real details, then rebuild.
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

The hero photo's source is `images/hero-thinking.png` (cut-out, transparent background). The web sizes are brightened slightly by the `TONE` setting in `scripts/make-images.py`; the source file stays untouched.

## Tell Bing about changes (IndexNow)

After a push has finished deploying, tell Bing (and Copilot, Yandex, Seznam, Naver, Yep) which pages changed,
so they recrawl them within minutes instead of days:

```
node scripts/indexnow.mjs                          # every page in sitemap.xml
node scripts/indexnow.mjs about projects/signpro   # only these pages
node scripts/indexnow.mjs --dry-run                # show what would be sent
```

It only sends pages that are in `sitemap.xml`, so drafts are never sent. It needs the key file
`d5fae8ef4241de774725087c261af3c3.txt` in the site root: keep it deployed and don't rename it.
Google doesn't use IndexNow; it finds changes through the sitemap in Search Console.

## Project structure

```
index.html          homepage
about.html, contact.html, services/, projects/   generated pages
styles.css          all styles (MOTION block, then inner-page styles at the end)
main.js             interactions, form, animations
fonts/              self-hosted WOFF2 fonts
images/             portraits (AVIF/WebP sizes), education photos, project covers, og.jpg
scripts/            content + page generator, local server, site checks, IndexNow ping (not deployed)
sitemap.xml, robots.txt, llms.txt   for search engines and AI assistants
d5fae8ef….txt       IndexNow key file (must stay deployed)
cv.pdf, cv-source/  downloadable CV and its HTML source
vercel.json         hosting config (headers, caching, clean URLs, redirects)
404.html            not-found page
DEPLOY.md           deployment guide
SEO-PLAN.md         SEO changelog, open items and the off-site plan
```

## Deploy

Every push to `main` on GitHub (`msajeeb003/new-landing-page`) redeploys the site. See [DEPLOY.md](DEPLOY.md).
Once the deploy is live, run `node scripts/indexnow.mjs` so Bing picks up the changes.

---

© 2026 Mostafizur Rahman
