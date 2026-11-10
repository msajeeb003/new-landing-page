# SEO & GEO plan — mostafizur.me

Status on 5 Nov 2026: everything in the changelog is live on https://www.mostafizur.me. Google Search Console and Bing Webmaster Tools are verified. Bing has read the sitemap (14 pages, no errors), and all 14 pages were submitted through Bing's URL Submission.

---

## 1. Results (Phase 3)

### Google PageSpeed Insights, live site (5 Nov 2026)

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Mobile | **96** | 97 | 100 | 100 |
| Desktop | **100** | 97 | 100 | 100 |

Mobile: LCP 2.3 s, FCP 1.1 s, TBT 0 ms, CLS 0. The 95+ mobile target is met on Google's test. Full saved report,
including what's still flagged: [reports/pagespeed-2026-11-05.md](reports/pagespeed-2026-11-05.md).
Compare future PageSpeed runs with that file. The local numbers below come from a slower computer.

### Lighthouse, mobile (local)

Measured on this computer against a local copy of the site. The computer's speed changed a lot between runs, so the old and new sites were run in turns (old, new, old, new…) and the median is shown.

| Homepage | Performance | Accessibility | Best Practices | SEO | LCP | FCP | Total Blocking Time |
|---|---|---|---|---|---|---|---|
| Before | 40 | 97 | 100 | 100 | 5.0 s | 3.0 s | 1,990 ms |
| After | 63 | 97 | 100 | 100 | 3.6 s | 2.8 s | 820 ms |

On single runs at quieter moments, the new inner pages scored 80–91 for performance and 96–97 for accessibility. The homepage LCP dropped from about 4.1 s to about 2.6 s.

Locally the homepage stayed below 95 on mobile, but Google's PageSpeed test (above) gives 96, so no design trade-offs are needed for speed.

**Accessibility was 96–97, not 100,** because white text on the old brand orange (`#F26B21`) had a contrast of 3.0:1 against a 4.5:1 minimum. Since 10 Nov 2026 the accent passes (first blue `#2563EB`, 5.2:1; now violet `#6D3DF5`, 5.8:1), which removes that cause. Confirmed on 10 Nov 2026: accessibility is 100 on mobile and desktop ([reports/pagespeed-2026-11-10.md](reports/pagespeed-2026-11-10.md)).

Re-run https://pagespeed.web.dev/ on `https://www.mostafizur.me/` after big changes, and save each report in `reports/`.

### Validation

- `node scripts/verify.mjs`: all checks pass. That covers 17 pages, 80 JSON-LD nodes (all parse, standard schema.org types and properties), canonicals, one H1 per page, alt text, every internal link and #anchor, the sitemap (14 URLs, well-formed XML), robots.txt, llms.txt and the 404 page.
- After deploying, also run https://search.google.com/test/rich-results and https://validator.schema.org/ on `/`, `/about` and `/projects/signpro`.

---

## 2. Changelog (all commits)

| Commit | What changed | Files |
|---|---|---|
| `dc4a3fa` (live) | Canonical, Open Graph, robots and sitemap now point to www.mostafizur.me instead of the dead vercel.app address | `index.html`, `robots.txt`, `sitemap.xml`, `README.md`, `DEPLOY.md` |
| `a07234e` | Self-hosted fonts; AVIF/WebP portraits in 480/800/1200 px | `fonts/*`, `images/*-480/800/1200.*`, `scripts/make-images.py` |
| `f627000` | Faster first paint: hero no longer starts invisible, no forced layout at startup, visitor counter and looping animations start after load | `main.js`, `styles.css` |
| `68b6fab` | New title/description/H1, JSON-LD (Person, WebSite, FAQPage, ProfilePage, Service, SoftwareApplication, CreativeWork, BreadcrumbList), static education, FAQ, 16 new pages, sitemap, llms.txt | `index.html`, `styles.css`, `main.js`, `about.html`, `contact.html`, `services/*`, `projects/*`, `sitemap.xml`, `llms.txt`, `scripts/content.mjs`, `scripts/build.mjs` |
| `5ab76c5` | AI crawlers named in robots.txt, 308 redirect from the vercel.app duplicate, font caching, CSP without Google Fonts, better 404 page | `robots.txt`, `vercel.json`, `404.html`, `.vercelignore` |
| `d935280` | Local preview server and site checker | `scripts/serve.mjs`, `scripts/verify.mjs` |
| `9a5ab18` | New link-preview image with the new title, README, this plan | `images/og.jpg`, `og-source/og.html`, `README.md`, `SEO-PLAN.md`, `.vercelignore` |
| `ded2605` | The vercel.app homepage now redirects too | `vercel.json` |
| (n8n page) | New `/n8n-expert-bangladesh` page (exact-match URL, title and H1, FAQ markup); automation page H1 now includes "in Bangladesh" and its n8n section links to the new page; 5 pages link to it. Diagnosis in KEYWORD-PLAN.md section 7 | scripts/content.mjs, scripts/build.mjs |
| (new hero, aurora palette) | Hero photo replaced with the thinking-pose cut-out (`images/hero-thinking.png`, web sizes brightened by `TONE` in make-images.py); old hero-pointing files and the shirt-recolour script removed. "Google certified" card anchored to the photo's face edge with container units so it never covers the face (320-1920px). Palette changed from blue to "aurora": violet accent #6D3DF5 with gradient buttons and headline words, lavender backgrounds, violet/cyan/mint glow behind the hero photo, old lilac category colour moved to blue. New link-preview image (og.jpg?v=3). All text pairings pass 4.5:1 | styles.css, index.html, images/hero-thinking*, images/og.jpg, og-source/og.html, scripts/make-images.py, scripts/content.mjs, site.webmanifest |
| (blue palette) | Site recoloured from orange to blue: accent #2563EB (white-on-accent contrast 5.17:1, was 3.04:1), cool backgrounds, hero t-shirt recoloured to match, new link-preview image. Removed a stray control character from the homepage (tiny box above the contact section, live since 5 Nov); the checker now fails on control characters | styles.css, index.html, images/hero-pointing*, images/og.jpg, og-source/og.html, site.webmanifest, scripts/recolor-shirt.py, scripts/make-images.py, scripts/verify.mjs |
| (links, article 3) | Fixed the Search Console "Redirect error" (https://mostafizur.me/blog was a stale 6 Nov crawl; it now 308s once to www; validation started 9 Nov). Contextual links to the articles from the homepage FAQ, AI app/automation pages, hire page and operations case study. New article "What an AI automation expert builds: 4 real workflows". Sitemap 20 URLs | scripts/content.mjs, blog/ |
| (guide) | Article "How to find the best AI developer in Bangladesh" (checklist, questions, red flags, where to look, how my work measures up) + hire-page FAQ linking to it. Targets the "best AI developer in Bangladesh" search without a self-claim | scripts/content.mjs, scripts/build.mjs, blog/ |
| (blog) | /blog section and first article: n8n vs Zapier vs Make.com for AI lead qualification (BlogPosting markup, sources with check date, linked from the AI automation page and the footer). Dev.to version with canonical link in drafts/ | scripts/content.mjs, scripts/build.mjs, styles.css, blog/ |
| (keywords, Part A) | Keyword plan Part A: titles with Bangladesh/expert/freelance wording, new /hire-ai-developer-bangladesh page, Who-is FAQ, Person disambiguatingDescription + hasOccupation, llms.txt identity, footer link to the hire page. See KEYWORD-PLAN.md | scripts/content.mjs, scripts/build.mjs, index.html, generated pages, KEYWORD-PLAN.md |
| (placeholders) | No [ADD REAL DETAIL] text on public pages: results rewritten from facts, drafts no longer built, build and checker fail on placeholders. EurekaEDU expanded with its real stack and pipeline; Fiverr button removed | `scripts/content.mjs`, `scripts/build.mjs`, `scripts/verify.mjs`, generated pages |
| (IndexNow) | IndexNow key file and `node scripts/indexnow.mjs`, which tells Bing and Copilot which pages changed | `d5fae8ef4241de774725087c261af3c3.txt`, `scripts/indexnow.mjs`, `scripts/verify.mjs`, `README.md`, `SEO-PLAN.md`, `.vercelignore` |

New URLs (none of the old URLs changed, so no redirects were needed):
`/about`, `/contact`, `/services`, `/services/ai-automation`, `/services/ai-app-development`, `/services/seo-social-media`, `/projects`, `/projects/signpro`, `/projects/socipro`, `/projects/operations-automation`, `/projects/b2b-lead-generation`, `/projects/seo-content-program`, `/projects/social-content-system`.
Published later: `/projects/eurekaedu` (5 Nov 2026).
Drafts (not built, so these URLs return 404 until published): `/projects/linkedin-bioster`, `/projects/leads-generation-app`. No public page shows [ADD REAL DETAIL] placeholders.

---

## 3. Needs your input

Edit `scripts/content.mjs`, then run `node scripts/build.mjs`.

1. **Real numbers, when you have them (optional).** The SignPro, SociPRO, EurekaEDU and operations automation case studies end with a factual result and no placeholders. If you get figures such as documents signed, posts published, sign-ups or hours saved, send them and I'll add them.
2. **LinkedIn Bioster and the leads app.** Each needs who it's for, the stack, how it works, a result and a live URL. Then remove the slug from `DRAFTS` so the page is built and linked. (EurekaEDU was published on 5 Nov 2026 from its live app and private repo.)
2a. **EurekaEDU's live app shows 0 scholarships** (https://eureka-edu-gules.vercel.app/find, checked 5 Nov 2026). The n8n pipeline publishes valid listings automatically, so check that the n8n workflow is active and running, that the Supabase project isn't paused, and publish any open drafts in `/admin`.
3. **More profiles.** If you have X/Twitter, Medium, Dev.to or Product Hunt, add the URLs to `SITE.profiles`. They feed the `sameAs` links that tie your accounts together for Google and AI assistants.
4. **"Vibe coder" wording.** It appears in the FAQ and on the AI app development page, but not in the homepage headline. Tell me if you want it more prominent.
5. **Testimonials.** The section is commented out in `index.html` until you have real client quotes.
6. **Your CV** (`cv-source/cv.html` → `cv.pdf`) still says "Gen AI Engineer · Automation Specialist". Update it to match the site if you're happy with the new title.
7. ~~Optional: the darker button orange for contrast.~~ Not needed: the accent is now blue and passes contrast.
8. ~~Optional: design trade-offs for 95+ mobile performance.~~ Not needed: Google's PageSpeed test gives 96 on mobile.

---

## 4. Deploy

```
git push origin main
```

Vercel redeploys in about a minute. Then check that https://www.mostafizur.me/about, /services, /projects/signpro and /llms.txt load, and that https://new-landing-page-coral-zeta.vercel.app/ redirects to www.mostafizur.me.

Then tell Bing which pages changed:

```
node scripts/indexnow.mjs
```

Add page paths to send only those, for example `node scripts/indexnow.mjs about projects/signpro`.

---

## 5. Off-site plan (Phase 4)

### 5.1 Google Search Console (day 1)
1. https://search.google.com/search-console → **Add property → Domain** → `mostafizur.me`.
2. Copy the TXT record. In Namecheap → Domain List → Manage → Advanced DNS, add **TXT Record**, Host `@`, Value = the record. Save, wait 5–30 minutes, then click **Verify**. A domain property covers both `mostafizur.me` and `www`.
3. **Sitemaps** → submit `https://www.mostafizur.me/sitemap.xml`.
4. **URL Inspection** → paste each URL → **Request indexing**: `/`, `/about`, `/services`, `/projects`, `/projects/signpro`, `/projects/socipro`. Google limits how many requests you can make a day, so spread them over two days if needed.
5. Check back after 7 days: **Pages** (indexed vs not) and **Performance** (searches for your name).

### 5.2 Bing Webmaster Tools (day 1, 5 minutes)
https://www.bing.com/webmasters → **Import from Google Search Console**. This verifies the site and imports the sitemap. Bing's index is also used by Microsoft Copilot and by several AI search tools.

Done on 5 Nov 2026: the sitemap was read (14 pages) and all 14 pages were submitted. From now on, run `node scripts/indexnow.mjs` after each deploy instead of submitting pages by hand. Check **IndexNow** in Bing Webmaster Tools to see what was received.

### 5.3 Profile consistency (week 1)
Use the same name, title and link everywhere: **Mostafizur Rahman · AI Builder & Gen AI Engineer · https://www.mostafizur.me**

**Headline** (LinkedIn headline, Upwork title, Fiverr tagline):
> AI Builder & Gen AI Engineer | AI apps, SaaS MVPs and n8n, Zapier & Make.com automations for teams in the USA, UK & EU

**Short bio** (GitHub, X, Product Hunt, Dev.to; under 160 characters):
> AI builder & Gen AI engineer in Bangladesh. I build AI apps, SaaS MVPs and n8n/Zapier/Make automations for US, UK & EU teams. mostafizur.me

**Long bio** (LinkedIn About, Medium, Dev.to, Upwork overview):
> I'm Mostafizur Rahman, an AI builder and Gen AI engineer based in Kushtia, Bangladesh. I build AI-powered web apps, SaaS MVPs and n8n, Zapier and Make.com automations for remote teams in the USA, UK and EU.
>
> I've worked remotely for US companies since 2021. Today I'm a Junior Full Stack Developer & Executive Assistant at Artech Digital, building web apps, automations and LLM integrations. Earlier roles brought +25% organic search rankings (ICMG LLC), +15% qualified leads (Digital Gregg) and +20% audience engagement (Crushvertise).
>
> Recent builds: SignPro, an e-signature platform (React, Node.js, PostgreSQL), and SociPRO, an autonomous social media agent (Node.js, Google Gemini, FFmpeg). BSc in Computer Science & Engineering; Google Prompting Essentials certified.
>
> Portfolio and case studies: https://www.mostafizur.me

Where to paste:
- **LinkedIn** (linkedin.com/in/mostafiz9221): headline, About (long bio), Contact info → Website → `https://www.mostafizur.me`, and a **Featured** link to `/projects/signpro`.
- **GitHub** (msajeeb003): Bio = short bio, Website = `https://www.mostafizur.me`. Add a profile README (a repo named `msajeeb003`) with the long bio and links to the case studies. Add the website to the SignPro and SociPRO repo "About" boxes too.
- **Upwork / Fiverr**: title = headline, overview = long bio, portfolio items linking to the case study pages.
- **X, Product Hunt, Dev.to, Medium**: create them with the short bio and website, then add the URLs to `SITE.profiles` in `scripts/content.mjs`.

### 5.4 Five articles to publish
Publish on Dev.to, Hashnode or Medium and share on LinkedIn. Each article is new writing (not a copy of the case study) and links to its case study with descriptive anchor text.

| # | Title | Target keyword | Links to |
|---|---|---|---|
| 1 | How I built a legally binding e-signature app with Claude Code | build SaaS with AI | /projects/signpro |
| 2 | Building an autonomous social media agent with Google Gemini and FFmpeg | AI automation developer | /projects/socipro |
| 3 | Vibe coding a real product: what I test before anything goes live | vibe coder | /services/ai-app-development |
| 4 | n8n vs Zapier vs Make.com for AI lead qualification | AI automation freelancer | /projects/operations-automation |
| 5 | From virtual assistant to Gen AI engineer: four years of remote work from Bangladesh | gen AI developer Bangladesh | /about |

### 5.5 Where to list the portfolio
Most profile links are "nofollow", so their value is consistent identity signals, referral traffic and being findable by AI assistants, not ranking power on their own. The articles and launches carry more weight.

- **Launch platforms (one project each, spaced out):** Product Hunt (SociPRO), Hacker News "Show HN" (SignPro, since the code is open source), Peerlist, Uneed, DevHunt, Indie Hackers.
- **Communities:** n8n community forum (share a workflow template, which links to your profile), Make and Zapier communities, Reddit r/SideProject, r/n8n and r/nocode (follow each subreddit's self-promotion rules).
- **Freelance and talent profiles:** Upwork and Fiverr (update), Contra, Wellfound, Arc.dev.
- **Developer profiles:** Dev.to, Hashnode, Medium, GitHub profile README.

### 5.6 30-day schedule

| Week | Publish | Post / do |
|---|---|---|
| 1 | — | Deploy. Search Console + Bing. Update LinkedIn, GitHub, Upwork, Fiverr with the bios above. Create Dev.to/Hashnode and Peerlist profiles. |
| 2 | Article 1 (SignPro) | LinkedIn post with a 30-second demo clip of the signing flow. Show HN for SignPro. Add the GitHub website links. |
| 3 | Article 2 (SociPRO) | Launch SociPRO on Product Hunt (Tuesday–Thursday). Share in r/SideProject and the n8n community. LinkedIn post. |
| 4 | Articles 3 and 4 | List on Uneed and DevHunt. LinkedIn post on vibe coding. Check Search Console for searches on your name, and request indexing for any page that is still "Discovered – not indexed". |
| After | Article 5, then one article a month | Fill the [ADD REAL DETAIL] items and publish the three draft case studies as their details arrive. |
