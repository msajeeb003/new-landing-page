# PageSpeed Insights — https://www.mostafizur.me/

- **Run:** 10 Nov 2026, 2:40 PM (GMT+6), Lighthouse 13.6.0, after the blue recolour went live
- **Report:** https://pagespeed.web.dev/analysis/https-www-mostafizur-me/sp4l889bgs?form_factor=mobile
  (PageSpeed keeps shared reports only for a while; this file is the permanent copy.)

## Scores

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| **Mobile** | **95** | **100** | 100 | 100 |
| **Desktop** | **100** | **100** | 100 | 100 |

Accessibility was 97 on 5 Nov. The contrast failures came from the orange accent (3.04:1); the blue accent is 5.17:1.
The one remaining failure after the recolour, small green text in the hero's platforms card, now uses the darker
green (5.34:1).

## Lab metrics

| Metric | Mobile (Moto G Power, slow 4G) | Desktop |
|---|---|---|
| First Contentful Paint | 1.2 s | 0.3 s |
| Largest Contentful Paint | 2.4 s | 0.4 s |
| Total Blocking Time | 70 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0.001 |
| Speed Index | 4.2 s | 0.7 s |

Mobile performance was 96 on 5 Nov and 95 in both runs today; one point is normal run-to-run variation.
Mobile LCP (2.4 s) is still just under the 2.5 s limit, so it remains the number to watch.

## Later the same day: new hero photo and aurora palette (3:10 PM run)

Report: https://pagespeed.web.dev/analysis/https-www-mostafizur-me/t3hhmt7cvm?form_factor=mobile

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| **Mobile** | 95 | 100 | 100 | 100 |
| **Desktop** | 100 | 100 | 100 | 100 |

Mobile: FCP 1.2 s, LCP 2.4 s, TBT 80 ms, CLS 0. Desktop: FCP 0.3 s, LCP 0.4 s, TBT 0 ms, CLS 0.001.

Right after the photo swap, mobile LCP was 2.5 s: the new photo is more detailed, and the phone downloaded the 800px
file (46 KB). Adding 640px and 960px versions with accurate `sizes` cut the photo's download from 390 ms to 170 ms.
