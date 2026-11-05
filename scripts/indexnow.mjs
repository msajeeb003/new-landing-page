// Tells Bing (and the other IndexNow search engines: Yandex, Seznam, Naver, Yep) which pages changed,
// so they recrawl them within minutes. Microsoft Copilot answers come from Bing's index. Google does not use IndexNow.
//
// Run it AFTER a push has finished deploying (the key file must be live):
//   node scripts/indexnow.mjs                          every page in sitemap.xml
//   node scripts/indexnow.mjs about projects/signpro   only these pages (no leading slash)
//   node scripts/indexnow.mjs --dry-run                show what would be sent, send nothing
//
// The key is the name of the <32 hex characters>.txt file in the site root. That file must stay deployed.
import { readFileSync, readdirSync } from 'node:fs';

const HOST = 'www.mostafizur.me';
const SITE = `https://${HOST}`;
const ROOT = new URL('..', import.meta.url);

const stop = (msg) => { console.error(msg); process.exitCode = 1; };

await main();

async function main() {
  // 1. Find the key file
  const keyFiles = readdirSync(ROOT).filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (keyFiles.length !== 1) return stop(`Expected one IndexNow key file in the site root, found ${keyFiles.length}.`);
  const KEY = keyFiles[0].slice(0, -4);
  if (readFileSync(new URL(keyFiles[0], ROOT), 'utf8').trim() !== KEY) return stop(`${keyFiles[0]} must contain only the key.`);
  const KEY_URL = `${SITE}/${KEY}.txt`;

  // 2. Pick the URLs: all sitemap pages, or the pages given (they must be in the sitemap, so drafts are never sent)
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const pages = args.filter((a) => !a.startsWith('--'));
  const mangled = pages.filter((p) => /^[A-Za-z]:[\\/]/.test(p));
  if (mangled.length) return stop(`Git Bash turned a path starting with "/" into a Windows path (${mangled[0]}).\nLeave out the leading slash, e.g. "about" or "projects/signpro".`);
  const sitemap = readFileSync(new URL('sitemap.xml', ROOT), 'utf8');
  const known = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const asked = pages.map((p) => `${SITE}/${p.replace(SITE, '').replace(/^\/+|\/+$/g, '')}`);
  const unknown = asked.filter((u) => !known.includes(u));
  if (unknown.length) return stop(`Not in sitemap.xml (a draft or a typo):\n  ${unknown.join('\n  ')}`);
  const urlList = asked.length ? asked : known;
  console.log(`${urlList.length} URL(s):\n  ${urlList.join('\n  ')}\n`);

  // 3. The key file has to be live first, or IndexNow rejects the request
  const live = await fetch(KEY_URL).then(async (r) => r.ok && (await r.text()).trim() === KEY).catch(() => false);
  if (!live) {
    const msg = `Key file is not live yet: ${KEY_URL}\nPush, wait for Vercel to finish deploying, then run this again.`;
    return dryRun ? console.log(msg) : stop(msg);
  }
  if (dryRun) return console.log('Key file is live. Dry run: nothing sent.');

  // 4. Send
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_URL, urlList }),
  });
  const meaning = {
    200: 'OK, the URLs were received.',
    202: 'Accepted. The key is still being checked, which is normal the first time.',
    400: 'Bad request.',
    403: 'Key not accepted: the key file is missing or does not match.',
    422: 'URLs rejected: they do not belong to this host.',
    429: 'Too many requests. Try again later.',
  };
  console.log(`IndexNow: HTTP ${res.status}. ${meaning[res.status] || (await res.text())}`);
  if (res.status >= 300) process.exitCode = 1;
}
