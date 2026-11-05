// Checks the built site through the local server (node scripts/serve.mjs 4173 must be running).
// Usage: node scripts/verify.mjs [baseUrl]
// Validates: JSON-LD parses, canonical/sitemap match, one H1, unique titles,
// internal links and #anchors resolve, images have alt text, key facts are in the raw HTML.
const BASE = process.argv[2] || 'http://localhost:4173';
const SITE = 'https://www.mostafizur.me';

const problems = [];
const fail = (page, msg) => problems.push(`${page}: ${msg}`);
const get = async (path) => {
  const res = await fetch(BASE + path, { redirect: 'manual' });
  return { status: res.status, text: await res.text(), location: res.headers.get('location') };
};

// 1. Sitemap -> list of pages
const sm = await get('/sitemap.xml');
const locs = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!locs.length) fail('/sitemap.xml', 'no URLs');
const paths = locs.map((u) => u.replace(SITE, '') || '/');
const drafts = ['/projects/eurekaedu', '/projects/linkedin-bioster', '/projects/leads-generation-app'];

const pages = {};
for (const path of [...paths, ...drafts]) {
  const r = await get(path);
  if (r.status !== 200) { fail(path, `HTTP ${r.status}`); continue; }
  pages[path] = r.text;
}

const titles = new Map();
const linkTargets = new Set();
let schemaCount = 0;
for (const [path, html] of Object.entries(pages)) {
  const isDraft = drafts.includes(path);
  // Canonical
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== SITE + (path === '/' ? '/' : path)) fail(path, `canonical is ${canonical}`);
  // Robots
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] || '';
  if (isDraft !== robots.includes('noindex')) fail(path, `robots="${robots}"`);
  // Title + description
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!title) fail(path, 'no <title>');
  if (titles.has(title)) fail(path, `duplicate title with ${titles.get(title)}`); else titles.set(title, path);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail(path, 'missing/short description');
  // Exactly one H1, lang, viewport
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(path, `${h1s} <h1> elements`);
  if (!html.includes('<html lang="en">')) fail(path, 'no lang');
  // Images need alt (decorative SVGs are aria-hidden)
  for (const img of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]+"/.test(img[0])) fail(path, `img without alt: ${img[0].slice(0, 80)}`);
  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const graph = data['@graph'] || [data];
      if (data['@context'] !== 'https://schema.org') fail(path, 'JSON-LD @context');
      for (const node of graph) {
        schemaCount++;
        if (!node['@type']) fail(path, 'JSON-LD node without @type');
        if (node['@type'] === 'BreadcrumbList') {
          node.itemListElement.forEach((it, i) => { if (it.position !== i + 1 || !it.name) fail(path, 'bad breadcrumb item'); });
        }
        if (node['@type'] === 'FAQPage' && !node.mainEntity?.every((q) => q.name && q.acceptedAnswer?.text)) fail(path, 'bad FAQ item');
        if (node['@type'] === 'Person' && node.name !== 'Mostafizur Rahman') fail(path, 'Person name');
      }
    } catch (e) { fail(path, `JSON-LD does not parse: ${e.message}`); }
  }
  // Links
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('/') && !href.startsWith('//')) linkTargets.add(`${href}|${path}`);
    else if (href.startsWith('#') && href.length > 1 && !html.includes(`id="${href.slice(1)}"`)) fail(path, `anchor ${href} not found`);
    if (!isDraft) for (const d of drafts) if (href === d) fail(path, `links to draft page ${d}`);
  }
}

// Resolve internal links (and their #anchors)
const checked = new Map();
for (const entry of linkTargets) {
  const [href, from] = entry.split('|');
  const [p, hash] = href.split('#');
  const path = p || '/';
  if (!checked.has(path)) checked.set(path, await get(path));
  const r = checked.get(path);
  if (r.status !== 200) fail(from, `link ${href} -> HTTP ${r.status}${r.location ? ` (${r.location})` : ''}`);
  else if (hash && !r.text.includes(`id="${hash}"`)) fail(from, `link ${href}: anchor missing`);
}

// Raw-HTML content check: what a crawler that does not run JavaScript sees
const home = pages['/'] || '';
for (const fact of ['Mostafizur Rahman', 'AI builder', 'Gen AI engineer', 'Dhaka International University', 'Google Prompting Essentials', 'What does an AI builder do?', 'SignPro', 'SociPRO']) {
  if (!home.includes(fact)) fail('/', `raw HTML is missing "${fact}"`);
}
if (/\[Client name\]/.test(home.replace(/<!--[\s\S]*?-->/g, ''))) fail('/', 'placeholder testimonials visible in HTML');

// robots.txt and llms.txt
const robots = await get('/robots.txt');
if (!/Sitemap: https:\/\/www\.mostafizur\.me\/sitemap\.xml/.test(robots.text)) fail('/robots.txt', 'sitemap line');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) if (!robots.text.includes(`User-agent: ${bot}`)) fail('/robots.txt', `no ${bot}`);
const llms = await get('/llms.txt');
if (llms.status !== 200 || !llms.text.startsWith('# Mostafizur Rahman')) fail('/llms.txt', 'missing or malformed');
const nf = await get('/this-page-does-not-exist');
if (nf.status !== 404 || !nf.text.includes('noindex')) fail('404', `status ${nf.status}`);

console.log(`Checked ${Object.keys(pages).length} pages, ${checked.size} internal link targets, ${schemaCount} JSON-LD nodes, ${locs.length} sitemap URLs.`);
if (problems.length) { console.log(`\n${problems.length} problem(s):`); problems.forEach((p) => console.log(' -', p)); process.exitCode = 1; } else console.log('All checks passed.');
