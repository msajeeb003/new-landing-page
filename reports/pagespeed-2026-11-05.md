# PageSpeed Insights — https://www.mostafizur.me/

- **Run:** 5 Nov 2026, 10:58 PM (GMT+6), Lighthouse 13.6.0, after all SEO changes were live
- **Report:** https://pagespeed.web.dev/analysis/https-www-mostafizur-me/hpmpllybk3?form_factor=mobile
  (PageSpeed keeps shared reports only for a while; this file is the permanent copy.)

## Scores

| | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
|---|---|---|---|---|---|
| **Mobile** | **96** | 97 | 100 | 100 | 3/3 |
| **Desktop** | **100** | 97 | 100 | 100 | 3/3 |

## Lab metrics

| Metric | Mobile (Moto G Power, slow 4G) | Desktop | Good if under |
|---|---|---|---|
| First Contentful Paint | 1.1 s | 0.3 s | 1.8 s |
| Largest Contentful Paint | 2.3 s | 0.3 s | 2.5 s |
| Total Blocking Time | 0 ms | 0 ms | 200 ms |
| Cumulative Layout Shift | 0 | 0.002 | 0.1 |
| Speed Index | 4.4 s | 0.8 s | 3.4 s |

For comparison, the site before the SEO work scored 40 on mobile in local tests (LCP 5.0 s, TBT 1,990 ms).
Local tests run on a slower computer than Google's, so compare future PageSpeed runs with this file, not with
the local numbers in `SEO-PLAN.md`.

## Real-user data (Chrome UX Report)

**No data yet**, for mobile and desktop. Google shows field data only once enough Chrome users have visited the
site over 28 days. This is normal for a new or low-traffic site. The Core Web Vitals report in Search Console
stays empty for the same reason.

## What's still flagged

### Accessibility (97): colour contrast
Text in the brand orange (`#F26B21`), or white text on it, has a contrast of 3.0:1; the minimum is 4.5:1.
Failing elements in the desktop run (the mobile run lists the same kinds of elements):

- Buttons: "Contact me" (nav), "Hire me" (hero and services pitch), "Details" (results), "Send message" (contact form)
- Accent text: "4+" in the hero card, "n8n · Zapier · Make" in the projects card, the "AI & Automation" chip,
  the "+7" count, the "All projects and case studies →" link, the active "All" filter tab, the footer "Home" link

All of these come from the one accent colour. A darker orange such as `#C2500C` (4.7:1) fixes them all at once.
It's a brand change, so it's your call.

Desktop also notes **"Identical links have the same purpose"**: the nav "Services" link goes to `#services` on the
homepage, and the footer "Services" link goes to `/services`. Small fix: give one of them a different label.

### Performance (all unscored or very small)

| Item | Detail | Worth doing? |
|---|---|---|
| LCP render delay | Mobile: the hero photo loads in 240 ms but waits 1,910 ms to be painted (desktop: 460 ms). LCP is 2.3 s, just under the 2.5 s limit. | Watch it. If LCP goes over 2.5 s, this is the first thing to look at. |
| Render-blocking CSS | `styles.css`, 19.5 KiB, about 150 ms on mobile | No. Inlining critical CSS adds a build step for little gain. |
| Image size | Hero AVIF is 800 px wide, shown at about 540 px: 15 KiB could be saved | No. Phones with sharp screens need the 800 px version. |
| Cache lifetime | Images are cached for 7 days | Optional: 30 days would be fine, since image names rarely change. |
| Minify CSS / JS | 4 KiB + 2 KiB savings | No. Needs a build tool for 6 KiB. |
| Non-composited animations | Mobile: 3 (squiggle, pulse dot, name sheen). Desktop: 10 (adds the education result rings). | No. They start after load and don't affect the score. |
| Long task | One 54 ms task in `main.js` at 1.5 s | No. TBT is 0 ms. |
| Forced reflow | About 50 ms in total from `main.js` | No. |
| DOM size | 1,158 elements, mostly inline SVG logos | No. |

### Best Practices (100): unscored notes
"Ensure CSP is effective against XSS attacks", "Ensure proper origin isolation with COOP" and "Mitigate DOM-based
XSS with Trusted Types" are listed for information only. The easy one is COOP: adding the header
`Cross-Origin-Opener-Policy: same-origin` in `vercel.json` would clear it, with no visible change.
