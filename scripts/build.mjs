// =========================================================
// Static page generator (no dependencies). Run from the repo root:
//   node scripts/build.mjs
// Writes: about.html, contact.html, services/*.html, projects/*.html,
// sitemap.xml, llms.txt, and refreshes the generated blocks inside index.html
// (between <!-- build:NAME --> and <!-- /build:NAME --> markers).
// Commit the output: Vercel serves these files as-is, with no build step.
// =========================================================
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE, SUMMARY, EXPERIENCE, EDUCATION, PROCESS, FAQ, SERVICES, PROJECTS, FREELANCE, DRAFTS,
} from './content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TODAY = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
const YEAR = TODAY.slice(0, 4);
const abs = (p) => SITE.url + p;
const isDraft = (slug) => DRAFTS.has(slug);
const live = (list) => list.filter((p) => !isDraft(p.slug));

// Escape text for HTML (keeps entities that are already escaped).
const esc = (s) => String(s)
  .replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// HTML -> plain text (for JSON-LD and word counts).
const plain = (html) => String(html).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const jsonLd = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1)
  .replace(/</g, '\\u003c')}</script>`;

const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const ext = (label, sr) => `${label}<span class="sr-only"> ${sr} (opens in a new tab)</span>${icon('i-external')}`;

// ---------------------------------------------------------
// Structured data nodes
// ---------------------------------------------------------
const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;
const personRef = { '@id': PERSON_ID };

const personFull = () => ({
  '@type': 'Person', '@id': PERSON_ID,
  name: SITE.name, alternateName: SITE.alternateName, givenName: 'Mostafizur', familyName: 'Rahman',
  jobTitle: SITE.jobTitle, description: SUMMARY,
  url: `${SITE.url}/`, image: abs(SITE.image), email: `mailto:${SITE.email}`,
  sameAs: Object.values(SITE.profiles),
  address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressCountry: SITE.country },
  knowsAbout: SITE.knowsAbout, knowsLanguage: ['en', 'bn'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Dhaka International University' },
    { '@type': 'EducationalOrganization', name: 'Jhenaidah Polytechnic Institute' },
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential', name: 'Google Prompting Essentials',
    credentialCategory: 'certificate', recognizedBy: { '@type': 'Organization', name: 'Google' },
  },
  worksFor: { '@type': 'Organization', name: 'Artech Digital' },
});
const personShort = () => ({
  '@type': 'Person', '@id': PERSON_ID, name: SITE.name, jobTitle: SITE.jobTitle,
  url: `${SITE.url}/`, sameAs: Object.values(SITE.profiles),
});
const website = () => ({
  '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE.url}/`, name: SITE.name,
  description: `Portfolio of ${SITE.name}, ${SITE.jobTitle}.`, inLanguage: 'en', publisher: personRef,
});
const webPage = (page, type = 'WebPage', extra = {}) => ({
  '@type': type, '@id': `${abs(page.path)}#webpage`, url: abs(page.path), name: page.title,
  description: page.description, inLanguage: 'en', isPartOf: { '@id': WEBSITE_ID },
  ...(page.crumbs ? { breadcrumb: { '@id': `${abs(page.path)}#breadcrumb` } } : {}), ...extra,
});
const breadcrumb = (page) => ({
  '@type': 'BreadcrumbList', '@id': `${abs(page.path)}#breadcrumb`,
  itemListElement: page.crumbs.map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, ...(path ? { item: abs(path) } : {}),
  })),
});
const faqPage = (path) => ({
  '@type': 'FAQPage', '@id': `${abs(path)}#faq`, url: abs(path),
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
});
const AREA = [
  { '@type': 'Country', name: 'United States' }, { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Place', name: 'European Union' },
];

// ---------------------------------------------------------
// Shared HTML pieces
// ---------------------------------------------------------
const index = await readFile(join(ROOT, 'index.html'), 'utf8');
const SPRITE = index.match(/<svg class="sprite"[\s\S]*?<\/svg>/)[0];

const LOGO_INNER = '<span class="logo__mark loop" aria-hidden="true"><span class="logo__ring"></span><span class="logo__initials">M<span>R</span></span></span>\n      <span class="logo__text">Mostafizur <span class="logo__accent loop">Rahman</span></span>';

const NAV = [['/', 'Home', 'home'], ['/services', 'Services', 'services'], ['/projects', 'Projects', 'projects'], ['/about', 'About', 'about'], ['/#faq', 'FAQ', 'faq']];

const header = (section) => {
  const link = ([href, label, key]) => `<a href="${href}"${key === section ? ' class="is-active" aria-current="page"' : ''}>${label}</a>`;
  return `<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" id="top">
  <nav class="nav card card--float" aria-label="Main">
    <a class="logo" href="/">
      ${LOGO_INNER}
    </a>

    <div class="nav__links">
      ${NAV.map(link).join('\n      ')}
      <span class="nav__dot" aria-hidden="true"></span>
    </div>

    <a class="btn nav__cta" href="/contact">Contact me</a>

    <button class="nav__toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      <span class="burger" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
  </nav>

  <div class="mobile-menu card card--float" id="mobile-menu">
    ${NAV.map(link).join('\n    ')}
    <a class="btn" href="/contact">Contact me</a>
  </div>
</header>`;
};

const SOCIALS = `<div class="socials">
      <a class="social" href="${SITE.profiles.upwork}" target="_blank" rel="noopener noreferrer" aria-label="Upwork (opens in a new tab)"><svg class="icon icon--fill" aria-hidden="true"><use href="#b-upwork"/></svg></a>
      <a class="social" href="${SITE.profiles.fiverr}" target="_blank" rel="noopener noreferrer" aria-label="Fiverr (opens in a new tab)"><svg class="icon icon--fill" aria-hidden="true"><use href="#b-fiverr"/></svg></a>
      <a class="social" href="${SITE.profiles.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><svg class="icon icon--fill" aria-hidden="true"><use href="#b-linkedin"/></svg></a>
      <a class="social" href="${SITE.profiles.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><svg class="icon icon--fill" aria-hidden="true"><use href="#b-github"/></svg></a>
      <a class="social" href="mailto:${SITE.email}" aria-label="Email"><svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg></a>
    </div>`;

const footer = (homeHref = '/') => `<footer class="footer">
  <div class="container footer__row">
    <a class="logo logo--footer" href="${homeHref}">
      ${LOGO_INNER}
    </a>
    <nav class="footer__links" aria-label="Footer">
      <a href="/" class="is-home">Home</a>
      <a href="/services">Services</a>
      <a href="/projects">Projects</a>
      <a href="/about">About</a>
      <a href="/#faq">FAQ</a>
      <a href="/contact">Contact</a>
    </nav>
    ${SOCIALS}
  </div>
  <div class="container footer__row footer__row--small">
    <p>© ${YEAR} ${SITE.name}. All rights reserved.</p>
    <!-- Total visitor counter (filled in by main.js; stays hidden if the counter service is unreachable) -->
    <p class="footer__visits" hidden>
      <svg class="icon" aria-hidden="true"><use href="#i-eye"/></svg>
      <strong class="footer__visits-num" data-visits>0</strong>
      <span>total visitors</span>
    </p>
    <p class="footer__avail"><span class="pulse-dot loop" aria-hidden="true"></span>Available for new projects · Kushtia, Bangladesh · Open to EU relocation</p>
  </div>
</footer>`;

const crumbsHtml = (crumbs) => `<nav class="crumbs" aria-label="Breadcrumb">
        <ol role="list">
          ${crumbs.map(([name, path], i) => (i === crumbs.length - 1
    ? `<li><span aria-current="page">${esc(name)}</span></li>`
    : `<li><a href="${path}">${esc(name)}</a></li>`)).join('\n          ')}
        </ol>
      </nav>`;

const chips = (list) => `<ul class="pg-chips" role="list">${list.map((t) => `<li class="chip chip--year">${esc(t)}</li>`).join('')}</ul>`;

const steps = () => `<div class="steps" data-inview>
      <span class="steps__line" aria-hidden="true"></span>
      <ol class="steps__grid" role="list">
${PROCESS.map((s, i) => `        <li class="step-wrap" style="--i:${i}">
          <article class="card card--float step">
            <span class="step__num" style="background:${s.color}">${s.n}</span>
            <div class="step__body">
              <h3 class="h3">${s.title}</h3>
              <p class="sm">${esc(s.text)}<span class="step__dur-inline"> · ${esc(s.chip)}</span></p>
              <span class="chip step__chip" style="--soft:${s.soft};--text:${s.ctext}">${esc(s.chip)}</span>
            </div>
          </article>
        </li>`).join('\n')}
      </ol>
      </div>`;

const processSection = (title = 'How a project runs') => `<section class="section" aria-labelledby="process-title">
    <div class="container">
      <div class="head-row">
        <div class="stack-head">
          <p class="label">PROCESS</p>
          <h2 class="h2" id="process-title">${title}</h2>
        </div>
        <p class="p head-row__p">Clear milestones, regular check-ins, no surprises. Here's the path from first call to launch.</p>
      </div>

      ${steps()}
    </div>
  </section>`;

const ctaBand = (title = 'Ready to get started?', text = 'Tell me what you want to build or automate. Open to remote projects worldwide and EU relocation.') => `<section class="cta-section" aria-labelledby="cta-title">
    <div class="container">
      <div class="cta cta--band">
        <span class="cta__orb cta__orb--accent loop" aria-hidden="true"></span>
        <span class="cta__orb cta__orb--lilac loop" aria-hidden="true"></span>
        <div class="cta__copy stack-head">
          <h2 class="h2" id="cta-title">${title}</h2>
          <p class="p">${text}</p>
        </div>
        <div class="cta__actions">
          <a class="btn btn--arrow" href="/contact">Start a project ${icon('i-arrow', 'icon btn__icon')}</a>
          <a class="btn btn--ghost" href="mailto:${SITE.email}">Email me</a>
        </div>
      </div>
    </div>
  </section>`;

// Project card, shared by the homepage grid, /projects and "related" lists.
const workCard = (p, { headingTag = 'h3' } = {}) => {
  const page = p.slug && !isDraft(p.slug) ? `/projects/${p.slug}` : null;
  const links = [];
  if (page) links.push(`<a href="${page}">Case study<span class="sr-only"> for ${esc(p.name)}</span>${icon('i-arrow')}</a>`);
  if (p.live) links.push(`<a href="${p.live}" target="_blank" rel="noopener noreferrer">${ext('Live demo', `for ${esc(p.name)}`)}</a>`);
  if (p.code) links.push(`<a href="${p.code}" target="_blank" rel="noopener noreferrer">${ext('Code', `for ${esc(p.name)}`)}</a>`);
  if (p.other) links.push(`<a href="${p.other.url}" target="_blank" rel="noopener noreferrer">${ext(p.other.label, `for ${esc(p.name)}`)}</a>`);
  if (p.url) links.push(`<a href="${p.url}" target="_blank" rel="noopener noreferrer">${ext('Upwork profile', `for ${esc(p.name)}`)}</a>`);
  const title = page ? `<a href="${page}">${esc(p.title || p.name)}</a>` : esc(p.title || p.name);
  return `<li class="work-item" data-cat="${p.cat.filter}">
          <article class="card card--float work-card">
            <span class="work-card__cover"><img class="work-card__img" src="/images/work/${p.img}-1280.webp" srcset="/images/work/${p.img}-640.webp 640w, /images/work/${p.img}-1280.webp 1280w" sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 380px" alt="${esc(p.alt)}" width="1280" height="800" loading="lazy" decoding="async"></span>
            <span class="work-card__body">
              <span class="chip" style="--soft:${p.cat.soft};--text:${p.cat.text}">${esc(p.cat.label)}</span>
              <${headingTag} class="h3">${title}</${headingTag}>
              <span class="sm">${esc(p.summary)}</span>
              <span class="work-card__stack">${p.stack.map(esc).join(' · ')}</span>
              ${links.length ? `<span class="work-card__links">${links.join('')}</span>` : ''}
            </span>
          </article>
        </li>`;
};

// Education card (static HTML so crawlers see it; main.js only animates it).
const eduCard = (e) => {
  const graded = typeof e.score === 'number' && typeof e.scale === 'number';
  const pct = graded ? +((e.score / e.scale) * 100).toFixed(2) : 100;
  const dec = graded ? 2 : 0;
  const ringInner = graded
    ? `<span class="result-ring__score">${e.score.toFixed(dec)}</span>
              <span class="result-ring__scale">of ${e.scale.toFixed(dec)}</span>`
    : '<svg class="icon result-ring__check" aria-hidden="true"><use href="#i-check"/></svg>';
  const ringLabel = graded ? `${e.label} ${e.score.toFixed(dec)} of ${e.scale.toFixed(dec)}` : `${e.label}: ${e.result}`;
  const base = e.photo.replace(/\.(jpe?g|webp|png)$/i, '');
  const ext2 = (e.photo.match(/\.(jpe?g|webp|png)$/i) || ['.jpg'])[0];
  const srcset = e.srcset === false ? '' : ` srcset="${base}-800${ext2} 800w, ${base}-1600${ext2} 1600w, ${e.photo} 2400w" sizes="(max-width: 767px) 92vw, 440px"`;
  const img = `<img src="${e.photo}"${srcset} alt="${esc(e.alt || `${e.institute} main building`)}" width="2400" height="1500" loading="lazy" decoding="async">`;
  return `
        <article class="card card--float edu-card" data-reveal="right" style="--c:${e.color};--soft:${e.soft};--t:${e.text}">
          <span class="edu-dot" aria-hidden="true"></span>
          <figure class="edu-photo${e.fit === 'contain' ? ' edu-photo--contain' : ''}">
            <div class="edu-photo__ph" aria-hidden="true">${icon('i-building')}</div>
            ${e.link ? `<a class="edu-photo__link" href="${e.link}" target="_blank" rel="noopener">${img}<span class="sr-only"> (opens full size in a new tab)</span></a>` : img}
          </figure>
          <div class="edu-details">
            <div class="edu-chips">
              <span class="chip" style="--soft:${e.soft};--text:${e.text}">${e.type}</span>
              ${e.years ? `<span class="chip chip--year">${icon('i-calendar')}${esc(e.years)}</span>` : ''}
            </div>
            <h3 class="edu-title">${esc(e.title)}</h3>
            <p class="edu-row edu-inst">${icon('i-cap')}${esc(e.institute)}</p>
            <p class="edu-row edu-loc sm">${icon('i-pin')}${esc(e.location)}</p>
            <p class="sm edu-detail">${esc(e.detail)}</p>
          </div>
          <div class="edu-result">
            <div class="result-ring" role="img" aria-label="${esc(ringLabel)}" style="--p:${pct}" data-pct="${pct}" data-score="${graded ? e.score : ''}" data-dec="${dec}">
              <div class="result-ring__inner" aria-hidden="true">
              ${ringInner}
              </div>
            </div>
            <div class="edu-result__text">
              <span class="edu-result__label">${esc(e.label)}</span>
              <span class="edu-result__line">${esc(e.result)}</span>
              <span class="edu-result__line edu-detail-m">${esc(e.detail)}</span>
            </div>
          </div>
        </article>`;
};

const faqSection = () => `<section class="section section--white" id="faq" aria-labelledby="faq-title">
    <div class="container faq-wrap">
      <div class="stack-head" data-stagger>
        <p class="label" data-reveal>FAQ</p>
        <h2 class="h2" id="faq-title" data-reveal>Questions clients <span class="accent">ask</span></h2>
        <p class="p" data-reveal>Straight answers about how I work, the tools I use and how to hire me.</p>
      </div>
      <div class="faq">
${FAQ.map((f) => `        <details class="card faq__item">
          <summary class="faq__q"><h3 class="faq__title">${esc(f.q)}</h3>${icon('i-chevron', 'icon faq__icon')}</summary>
          <div class="faq__a"><p>${f.a}</p></div>
        </details>`).join('\n')}
      </div>
    </div>
  </section>`;

// ---------------------------------------------------------
// Page shell
// ---------------------------------------------------------
const shell = (page) => {
  const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="robots" content="${robots}">
  <meta name="author" content="${SITE.name}">
  <link rel="canonical" href="${abs(page.path)}">

  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:url" content="${abs(page.path)}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:image" content="${abs(SITE.ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${SITE.name}, ${esc(SITE.jobTitle)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${abs(SITE.ogImage)}">
  <meta name="theme-color" content="#FFF7F2">

  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <link rel="preload" href="/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <script>document.documentElement.classList.add('js');</script>
  <script src="/main.js" defer></script>
  ${jsonLd(page.schema)}
</head>
<body class="page">

${SPRITE}

${header(page.section)}

<main id="main">
  ${page.main}
</main>

${footer()}

<div class="mobile-cta" aria-label="Quick actions" role="region">
  <a class="btn mobile-cta__hire" href="${page.path === '/contact' ? '#contact' : '/contact'}">Hire me</a>
  <a class="btn btn--ghost" href="/projects">Work</a>
</div>

</body>
</html>
`;
};

const hero = ({ crumbs, eyebrow, h1, lead, actions = '', media = '' }) => `<section class="pg-hero" aria-labelledby="page-title">
    <div class="hero__orb hero__orb--a" aria-hidden="true"></div>
    <div class="hero__orb hero__orb--b" aria-hidden="true"></div>
    <div class="container">
      ${crumbsHtml(crumbs)}
      <div class="pg-hero__grid${media ? ' pg-hero__grid--media' : ''}">
        <div class="pg-hero__copy">
          ${eyebrow}
          <h1 class="h1 pg-title" id="page-title">${h1}</h1>
          <p class="p pg-lead">${lead}</p>
          ${actions}
        </div>
        ${media}
      </div>
    </div>
  </section>`;

// ---------------------------------------------------------
// Pages
// ---------------------------------------------------------
const pages = [];
const servicePage = (s) => `/services/${s.slug}`;
const projectPage = (p) => `/projects/${p.slug}`;
const projectBySlug = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));
const serviceBySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

// --- Services index ---
{
  const page = {
    path: '/services', section: 'services',
    title: 'AI Builder Services: Apps & Automation | Mostafizur Rahman',
    description: 'Services from AI builder Mostafizur Rahman: AI app and SaaS MVP development, n8n, Zapier and Make.com automation, and SEO and lead generation.',
    crumbs: [['Home', '/'], ['Services']],
  };
  page.main = `${hero({
    crumbs: page.crumbs, eyebrow: '<p class="label">SERVICES</p>',
    h1: 'Services: AI apps, automation and growth',
    lead: 'One hire, end to end. I build AI-powered apps and SaaS MVPs, automate the manual work between your tools, and run the SEO, social media and lead generation that bring people in.',
    actions: `<div class="pg-actions"><a class="btn btn--arrow" href="/contact">Hire me ${icon('i-arrow', 'icon btn__icon')}</a><a class="btn btn--ghost" href="/projects">View projects</a></div>`,
  })}

  <section class="section section--white" aria-labelledby="svc-list-title">
    <div class="container">
      <h2 class="sr-only" id="svc-list-title">All services</h2>
      <ul class="pg-cards" role="list">
${SERVICES.map((s) => `        <li class="card card--float pg-card">
          <span class="icon-badge icon-badge--60" style="--soft:${s.soft};--strong:${s.strong}">${icon(s.icon)}</span>
          <h3 class="h3"><a href="${servicePage(s)}">${esc(s.h1)}</a></h3>
          <p class="sm">${esc(s.card)}</p>
          ${chips(s.tools.slice(0, 5))}
          <a class="text-link" href="${servicePage(s)}">About ${esc(s.name.toLowerCase())} <span class="text-link__arrow" aria-hidden="true">→</span></a>
        </li>`).join('\n')}
      </ul>
    </div>
  </section>

  ${processSection()}

  ${ctaBand()}`;
  page.schema = [personShort(), website(), webPage(page, 'CollectionPage', {
    about: personRef,
    hasPart: SERVICES.map((s) => ({ '@id': `${abs(servicePage(s))}#service` })),
  }), breadcrumb(page)];
  pages.push(page);
}

// --- Service pages ---
for (const s of SERVICES) {
  const page = {
    path: servicePage(s), section: 'services', title: s.metaTitle, description: s.metaDesc,
    crumbs: [['Home', '/'], ['Services', '/services'], [s.name]],
  };
  const projects = s.projects.map((slug) => projectBySlug[slug]).filter((p) => p && !isDraft(p.slug));
  const others = SERVICES.filter((o) => o !== s);
  page.main = `${hero({
    crumbs: page.crumbs,
    eyebrow: `<span class="icon-badge icon-badge--56" style="--soft:${s.soft};--strong:${s.strong}">${icon(s.icon)}</span>`,
    h1: esc(s.h1), lead: esc(s.lead),
    actions: `<div class="pg-actions"><a class="btn btn--arrow" href="/contact">Start a project ${icon('i-arrow', 'icon btn__icon')}</a><a class="btn btn--ghost" href="/projects">View projects</a></div>`,
  })}

  <section class="section section--white">
    <div class="container pg-layout">
      <article class="prose">${s.body}
      </article>
      <aside class="pg-aside" aria-label="Service details">
        <div class="card card--float facts">
          <h2 class="facts__title">At a glance</h2>
          <dl>
            <div><dt>Provider</dt><dd><a href="/about">${SITE.name}</a>, ${esc(SITE.jobTitle)}</dd></div>
            <div><dt>For</dt><dd>Remote teams in the USA, UK and EU</dd></div>
            <div><dt>Tools</dt><dd>${chips(s.tools)}</dd></div>
          </dl>
          <a class="btn facts__btn" href="/contact">Start a project</a>
          <p class="facts__more">Other services: ${others.map((o) => `<a href="${servicePage(o)}">${esc(o.name)}</a>`).join(' · ')}</p>
        </div>
      </aside>
    </div>
  </section>

  ${processSection()}

  <section class="section section--white" aria-labelledby="rel-title">
    <div class="container">
      <div class="stack-head pg-section-head">
        <p class="label">RELATED WORK</p>
        <h2 class="h2" id="rel-title">${esc(s.name)} projects</h2>
      </div>
      <ul class="work-grid pg-work-grid" role="list">
        ${projects.map((p) => workCard(p)).join('\n        ')}
      </ul>
    </div>
  </section>

  ${ctaBand()}`;
  page.schema = [personShort(), website(), webPage(page, 'WebPage', { mainEntity: { '@id': `${abs(page.path)}#service` } }), {
    '@type': 'Service', '@id': `${abs(page.path)}#service`, name: s.h1, serviceType: s.name,
    description: s.metaDesc, url: abs(page.path), provider: personRef, areaServed: AREA,
  }, breadcrumb(page)];
  pages.push(page);
}

// --- Projects index ---
{
  const page = {
    path: '/projects', section: 'projects',
    title: 'AI Apps & Automation Projects | Mostafizur Rahman',
    description: 'Case studies by AI builder Mostafizur Rahman: SignPro e-signatures, the SociPRO social media agent, n8n automations, SEO and lead generation results.',
    crumbs: [['Home', '/'], ['Projects']],
  };
  const all = [...PROJECTS, FREELANCE];
  page.main = `${hero({
    crumbs: page.crumbs, eyebrow: '<p class="label">RECENT WORK</p>',
    h1: 'Projects and case studies',
    lead: 'Apps, AI agents, automations and growth work. Each case study covers the problem, the tools, how I built it and the result.',
  })}

  <section class="section section--white" aria-labelledby="all-work-title">
    <div class="container">
      <h2 class="sr-only" id="all-work-title">All projects</h2>
      <ul class="work-grid pg-work-grid" role="list">
        ${all.map((p) => workCard(p, { headingTag: 'h3' })).join('\n        ')}
      </ul>
    </div>
  </section>

  ${ctaBand()}`;
  page.schema = [personShort(), website(), webPage(page, 'CollectionPage', {
    about: personRef,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: live(PROJECTS).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(projectPage(p)), name: p.title })),
    },
  }), breadcrumb(page)];
  pages.push(page);
}

// --- Project pages ---
for (const p of PROJECTS) {
  const draft = isDraft(p.slug);
  const page = {
    path: projectPage(p), section: 'projects', title: p.metaTitle, description: p.metaDesc, noindex: draft, ogType: 'article',
    crumbs: [['Home', '/'], ['Projects', '/projects'], [p.name]],
  };
  const svc = serviceBySlug[p.service];
  const related = p.related.map((slug) => projectBySlug[slug]).filter((r) => r && !isDraft(r.slug));
  const btns = [];
  if (p.live) btns.push(`<a class="btn btn--arrow" href="${p.live}" target="_blank" rel="noopener noreferrer">Live demo<span class="sr-only"> (opens in a new tab)</span>${icon('i-external', 'icon btn__icon')}</a>`);
  if (p.code) btns.push(`<a class="btn btn--ghost" href="${p.code}" target="_blank" rel="noopener noreferrer">Source code<span class="sr-only"> (opens in a new tab)</span></a>`);
  if (p.other) btns.push(`<a class="btn btn--ghost" href="${p.other.url}" target="_blank" rel="noopener noreferrer">${esc(p.other.label)}<span class="sr-only"> (opens in a new tab)</span></a>`);
  page.main = `${hero({
    crumbs: page.crumbs,
    eyebrow: `<span class="chip" style="--soft:${p.cat.soft};--text:${p.cat.text}">${esc(p.cat.label)}</span>`,
    h1: esc(p.title).replace(/(\S+-\S+)/g, '<span class="nowrap">$1</span>'), lead: esc(p.summary),
    actions: btns.length ? `<div class="pg-actions">${btns.join('')}</div>` : '',
    media: `<figure class="pg-cover card card--float"><img src="/images/work/${p.img}-1280.webp" srcset="/images/work/${p.img}-640.webp 640w, /images/work/${p.img}-1280.webp 1280w" sizes="(max-width: 1023px) 92vw, 600px" alt="${esc(p.alt)}" width="1280" height="800" fetchpriority="high" decoding="async"></figure>`,
  })}

  <section class="section section--white">
    <div class="container pg-layout">
      <article class="prose">${p.body}
      </article>
      <aside class="pg-aside" aria-label="Project details">
        <div class="card card--float facts">
          <h2 class="facts__title">Project facts</h2>
          <dl>
            <div><dt>Built by</dt><dd><a href="/about">${SITE.name}</a></dd></div>
            <div><dt>Category</dt><dd>${esc(p.cat.label)}</dd></div>
            <div><dt>Stack</dt><dd>${chips(p.stack)}</dd></div>
            ${p.live || p.code ? `<div><dt>Links</dt><dd>${[p.live && `<a href="${p.live}" target="_blank" rel="noopener noreferrer">Live demo</a>`, p.code && `<a href="${p.code}" target="_blank" rel="noopener noreferrer">GitHub</a>`].filter(Boolean).join(' · ')}</dd></div>` : ''}
            <div><dt>Service</dt><dd><a href="${servicePage(svc)}">${esc(svc.name)}</a></dd></div>
          </dl>
          <a class="btn facts__btn" href="/contact">Build something similar</a>
        </div>
      </aside>
    </div>
  </section>
${related.length ? `
  <section class="section" aria-labelledby="rel-title">
    <div class="container">
      <div class="stack-head pg-section-head">
        <p class="label">MORE WORK</p>
        <h2 class="h2" id="rel-title">Related projects</h2>
      </div>
      <ul class="work-grid pg-work-grid" role="list">
        ${related.map((r) => workCard(r)).join('\n        ')}
      </ul>
      <p class="center-row"><a class="text-link" href="/projects">All projects and case studies <span class="text-link__arrow" aria-hidden="true">→</span></a></p>
    </div>
  </section>
` : ''}
  ${ctaBand()}`;
  const work = {
    '@type': p.schemaType, '@id': `${abs(page.path)}#work`, name: p.name, description: plain(p.summary),
    image: abs(`/images/work/${p.img}-1280.webp`), creator: personRef, author: personRef,
    keywords: p.stack.join(', '), mainEntityOfPage: { '@id': `${abs(page.path)}#webpage` },
    ...(p.schemaType === 'SoftwareApplication'
      ? { applicationCategory: p.appCategory, operatingSystem: 'Web browser', url: p.live, sameAs: [p.code].filter(Boolean) }
      : { url: abs(page.path) }),
  };
  page.schema = [personShort(), website(), webPage(page, 'WebPage', { mainEntity: { '@id': `${abs(page.path)}#work` } }), work, breadcrumb(page)];
  pages.push(page);
}

// --- About ---
{
  const page = {
    path: '/about', section: 'about',
    title: 'About Mostafizur Rahman, AI Builder in Bangladesh',
    description: 'Mostafizur Rahman is an AI builder and Gen AI engineer in Kushtia, Bangladesh, building AI apps and automations for US, UK and EU teams since 2021.',
    crumbs: [['Home', '/'], ['About']],
  };
  const edu = EDUCATION.map((e) => `<li><h3 class="h3">${esc(e.title)}</h3><p class="pg-meta">${esc(e.institute)} · ${esc(e.years)}</p><p>${esc(e.detail)}. ${esc(e.label === 'CGPA' ? `CGPA ${e.score.toFixed(2)} of ${e.scale.toFixed(2)}` : e.result)}.</p></li>`).join('\n          ');
  const exp = EXPERIENCE.map((x) => `<li><h3 class="h3">${esc(x.role)}</h3><p class="pg-meta">${esc(x.org)} · ${esc(x.where)} · ${esc(x.dates)}</p><p>${esc(x.text)}</p></li>`).join('\n          ');
  page.main = `${hero({
    crumbs: page.crumbs, eyebrow: '<p class="label">ABOUT ME</p>',
    h1: `About <span class="accent">Mostafizur Rahman</span>`,
    lead: "I'm an AI builder and Gen AI engineer from Kushtia, Bangladesh. I build AI-powered apps, SaaS MVPs and automations for remote teams in the USA, UK and EU.",
    actions: `<div class="pg-actions"><a class="btn btn--arrow" href="/contact">Work with me ${icon('i-arrow', 'icon btn__icon')}</a><a class="btn btn--ghost" href="/cv.pdf" download="Mostafizur-Rahman-CV.pdf">Download CV</a></div>`,
    media: `<div class="pg-portrait"><div class="stage__arch pg-portrait__arch" aria-hidden="true"></div><picture>
          <source type="image/avif" srcset="/images/about-thumbsup-480.avif 480w, /images/about-thumbsup-800.avif 800w" sizes="(max-width: 767px) 70vw, 360px">
          <source type="image/webp" srcset="/images/about-thumbsup-480.webp 480w, /images/about-thumbsup-800.webp 800w" sizes="(max-width: 767px) 70vw, 360px">
          <img src="/images/about-thumbsup-800.webp" alt="Mostafizur Rahman giving a thumbs up" width="800" height="1088" fetchpriority="high" decoding="async">
        </picture></div>`,
  })}

  <section class="section section--white">
    <div class="container pg-layout">
      <article class="prose">
        <h2>Who I am</h2>
        <p>${esc(SUMMARY).replace('Mostafizur Rahman is', 'I am').replace('He builds', 'I build').replace('and has worked', 'and I have worked')}</p>
        <h2>What I do</h2>
        <p>I turn manual, messy work into software that runs. That means three kinds of projects: <a href="/services/ai-automation">automations in n8n, Zapier and Make.com</a> with AI steps inside them, <a href="/services/ai-app-development">AI-powered web apps and SaaS MVPs</a> built with AI-assisted development, and the <a href="/services/seo-social-media">SEO, social media and lead generation</a> work that brings people to them.</p>
        <p>Two examples you can try: <a href="/projects/signpro">SignPro</a>, a legally binding e-signature platform, and <a href="/projects/socipro">SociPRO</a>, an autonomous social media agent. Both have live demos and public source code.</p>
        <h2>How I got here</h2>
        <p>I started working remotely in 2021 as a virtual assistant for Frontier, a recruitment platform in San Francisco. Over the next four years I worked in market research, social media, SEO content and lead generation for US companies. In 2024 I improved organic search rankings by 25% at ICMG LLC, and in 2025 I grew qualified leads by 15% at Digital Gregg.</p>
        <p>In August 2025 I joined Artech Digital, a US company founded by an ex-Google engineer, as a Virtual Assistant and was promoted to Junior Full Stack Developer &amp; Executive Assistant. There I build web apps, SaaS products and automations, and integrate Claude and other LLMs into the team's workflows.</p>
        <h2>Experience</h2>
        <ol class="pg-timeline" role="list">
          ${exp}
        </ol>
        <h2>Education and certification</h2>
        <ol class="pg-timeline" role="list">
          ${edu}
        </ol>
        <h2>How I work</h2>
        <p>I build with AI-assisted development (Claude Code and Cursor) because it lets one person ship what used to need a team. Every project still follows the same four steps, Discover, Design, Build and Launch, with clear milestones and regular check-ins. Every build is tested on real data and handed over with documentation.</p>
        <h2>Tools I use</h2>
        ${chips(SITE.tools)}
      </article>
      <aside class="pg-aside" aria-label="Quick facts">
        <div class="card card--float facts">
          <h2 class="facts__title">Quick facts</h2>
          <dl>
            <div><dt>Name</dt><dd>${SITE.name}</dd></div>
            <div><dt>Role</dt><dd>${esc(SITE.jobTitle)}</dd></div>
            <div><dt>Based in</dt><dd>Kushtia, Bangladesh. Works remotely; open to EU relocation</dd></div>
            <div><dt>Clients</dt><dd>Remote teams in the USA, UK and EU</dd></div>
            <div><dt>Experience</dt><dd>4+ years of remote work since 2021, six roles</dd></div>
            <div><dt>Education</dt><dd>BSc in Computer Science &amp; Engineering, Dhaka International University (2026)</dd></div>
            <div><dt>Certification</dt><dd>Google Prompting Essentials (Nov 2025)</dd></div>
            <div><dt>Languages</dt><dd>Bengali (native), English (C1)</dd></div>
            <div><dt>Profiles</dt><dd><a href="${SITE.profiles.linkedin}" rel="noopener">LinkedIn</a> · <a href="${SITE.profiles.github}" rel="noopener">GitHub</a> · <a href="${SITE.profiles.upwork}" rel="noopener">Upwork</a> · <a href="${SITE.profiles.fiverr}" rel="noopener">Fiverr</a></dd></div>
          </dl>
          <a class="btn facts__btn" href="/contact">Contact me</a>
        </div>
      </aside>
    </div>
  </section>

  ${ctaBand()}`;
  page.schema = [personFull(), website(), webPage(page, 'ProfilePage', { mainEntity: personRef, about: personRef }), breadcrumb(page)];
  pages.push(page);
}

// --- Contact ---
{
  const page = {
    path: '/contact', section: 'contact',
    title: 'Contact & Hire an AI Builder | Mostafizur Rahman',
    description: 'Hire Mostafizur Rahman, AI builder and Gen AI engineer, for AI apps, automations or SEO. Send a message, email, or hire on Upwork or Fiverr.',
    crumbs: [['Home', '/'], ['Contact']],
  };
  // Reuse the homepage contact form markup exactly (main.js wires it up).
  const form = index.match(/<form class="cta-form"[\s\S]*?<\/form>/)[0];
  const channel = (href, label, text, iconId, brand) => `<li class="card card--float pg-channel">
          <span class="icon-badge" style="--soft:var(--accent-soft);--strong:var(--accent)">${brand ? `<svg class="icon icon--fill" aria-hidden="true"><use href="#${iconId}"/></svg>` : icon(iconId)}</span>
          <span><strong><a href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}${href.startsWith('http') ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a></strong><span class="sm">${text}</span></span>
        </li>`;
  page.main = `${hero({
    crumbs: page.crumbs, eyebrow: '<p class="label">CONTACT</p>',
    h1: 'Contact Mostafizur Rahman',
    lead: "Tell me what you want to build or automate. Send a short description of the project and I'll reply by email.",
  })}

  <section class="section section--white" aria-labelledby="channels-title">
    <div class="container">
      <h2 class="h3 pg-subhead" id="channels-title">Ways to reach me</h2>
      <ul class="pg-channels" role="list">
        ${channel(`mailto:${SITE.email}`, SITE.email, 'Email, for project details and quotes', 'i-mail')}
        ${channel(SITE.profiles.upwork, 'Upwork', 'Hire me with Upwork contracts and payments', 'b-upwork', true)}
        ${channel(SITE.profiles.fiverr, 'Fiverr', 'Order a fixed-scope gig, such as a SaaS MVP', 'b-fiverr', true)}
        ${channel(SITE.profiles.linkedin, 'LinkedIn', 'Connect or send a message', 'b-linkedin', true)}
      </ul>
      <p class="p pg-note">I'm based in Kushtia, Bangladesh (UTC+6) and have worked across US time zones since 2021. Open to remote projects worldwide and to EU relocation.</p>
    </div>
  </section>

  <section class="cta-section" id="contact" aria-labelledby="cta-title">
    <div class="container">
      <div class="cta">
        <span class="cta__orb cta__orb--accent loop" aria-hidden="true"></span>
        <span class="cta__orb cta__orb--lilac loop" aria-hidden="true"></span>

        <div class="cta__copy stack-head">
          <h2 class="h2" id="cta-title">Send a message</h2>
          <p class="p">Name, email and a few lines about the project are enough to start.</p>
        </div>

        ${form}

        <div class="cta__photo" data-inview data-photo>
          <picture class="stage__portrait">
            <source type="image/avif" srcset="/images/cta-armscrossed-400.avif 400w, /images/cta-armscrossed-800.avif 800w" sizes="240px">
            <source type="image/webp" srcset="/images/cta-armscrossed-400.webp 400w, /images/cta-armscrossed-800.webp 800w" sizes="240px">
            <img src="/images/cta-armscrossed-800.webp" alt="Mostafizur Rahman with arms crossed" width="800" height="1068" loading="lazy" decoding="async">
          </picture>
        </div>
      </div>
    </div>
  </section>`;
  page.schema = [personFull(), website(), webPage(page, 'ContactPage', { about: personRef, mainEntity: personRef }), breadcrumb(page)];
  pages.push(page);
}

// ---------------------------------------------------------
// Write pages
// ---------------------------------------------------------
const fileFor = (path) => (['/services', '/projects'].includes(path) ? `${path.slice(1)}/index.html` : `${path.slice(1)}.html`);
const report = [];
for (const page of pages) {
  const html = shell(page);
  const out = join(ROOT, fileFor(page.path));
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
  const main = html.split('<main id="main">')[1].split('</main>')[0];
  report.push({ path: page.path, words: plain(main).split(' ').length, title: page.title.length, desc: page.description.length, noindex: !!page.noindex, todos: (main.match(/ADD REAL DETAIL/g) || []).length });
}

// ---------------------------------------------------------
// Homepage: refresh generated blocks
// ---------------------------------------------------------
const homeSchema = [personFull(), website(), {
  '@type': 'WebPage', '@id': `${SITE.url}/#webpage`, url: `${SITE.url}/`,
  name: `${SITE.name} | ${SITE.jobTitle}`, inLanguage: 'en', isPartOf: { '@id': WEBSITE_ID }, about: personRef, mainEntity: personRef,
}, faqPage('/')];

const inject = (html, name, content) => {
  const re = new RegExp(`(<!-- build:${name} -->)[\\s\\S]*?(<!-- /build:${name} -->)`);
  if (!re.test(html)) throw new Error(`index.html is missing the <!-- build:${name} --> marker`);
  return html.replace(re, `$1\n${content}\n$2`);
};
let home = index;
home = inject(home, 'jsonld', `  ${jsonLd(homeSchema)}\n  `);
home = inject(home, 'education', `${EDUCATION.map(eduCard).join('\n')}\n      `);
home = inject(home, 'work', `        ${[...PROJECTS, FREELANCE].map((p) => workCard(p)).join('\n        ')}\n        `);
home = inject(home, 'faq', `  ${faqSection()}\n  `);
home = inject(home, 'footer', footer('#home'));
await writeFile(join(ROOT, 'index.html'), home);

// ---------------------------------------------------------
// sitemap.xml and llms.txt
// ---------------------------------------------------------
const indexable = ['/', ...pages.filter((p) => !p.noindex).map((p) => p.path)];
await writeFile(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url>
    <loc>${abs(p)}</loc>
    <lastmod>${TODAY}</lastmod>
  </url>`).join('\n')}
</urlset>
`);

await writeFile(join(ROOT, 'llms.txt'), `# ${SITE.name}

> ${SUMMARY}

Key facts:
- Role: ${SITE.jobTitle} (AI app development, AI automation, SaaS MVPs)
- Based in: Kushtia, Bangladesh; works remotely with clients in the USA, UK and EU; open to EU relocation
- Experience: remote work for US companies since 2021; currently Junior Full Stack Developer & Executive Assistant at Artech Digital
- Results: +25% organic search rankings (ICMG LLC), +15% qualified leads (Digital Gregg), +20% audience engagement (Crushvertise LLC)
- Education: BSc in Computer Science & Engineering, Dhaka International University (2026); Google Prompting Essentials certificate (2025)
- Tools: ${SITE.tools.slice(0, 12).join(', ')}
- Contact: ${SITE.email} or ${SITE.url}/contact

## Services
${SERVICES.map((s) => `- [${s.h1}](${abs(servicePage(s))}): ${s.metaDesc}`).join('\n')}

## Case studies
${live(PROJECTS).map((p) => `- [${p.title}](${abs(projectPage(p))}): ${p.summary}`).join('\n')}

## About
- [About ${SITE.name}](${abs('/about')}): background, experience, education and tools
- [FAQ](${abs('/#faq')}): what an AI builder does, how to hire a gen AI engineer, vibe coding, tools
- [Contact](${abs('/contact')}): hire for a project

## Profiles
- LinkedIn: ${SITE.profiles.linkedin}
- GitHub: ${SITE.profiles.github}
- Upwork: ${SITE.profiles.upwork}
- Fiverr: ${SITE.profiles.fiverr}
`);

// ---------------------------------------------------------
// Report
// ---------------------------------------------------------
console.log(`Built ${pages.length} pages + index.html, sitemap.xml (${indexable.length} URLs), llms.txt\n`);
console.log('path'.padEnd(36), 'words', 'title', 'desc', 'todos', 'index');
for (const r of report) {
  const warn = (r.title > 60 ? ' TITLE>60' : '') + (r.desc > 155 ? ' DESC>155' : '');
  console.log(r.path.padEnd(36), String(r.words).padStart(5), String(r.title).padStart(5), String(r.desc).padStart(4), String(r.todos).padStart(5), r.noindex ? ' noindex' : '  yes', warn);
}
if (report.some((r) => r.title > 60 || r.desc > 155)) process.exitCode = 1;
