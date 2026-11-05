// Local preview server that mimics the Vercel setup (cleanUrls, gzip, 404.html).
// No dependencies. Usage: node scripts/serve.mjs [port] [rootDir]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const port = Number(process.argv[2]) || 4173;
const root = resolve(process.argv[3] || '.');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};
const COMPRESS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg', '.webmanifest']);

const isFile = async (p) => { try { return (await stat(p)).isFile(); } catch { return false; } };

async function resolvePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  const base = join(root, clean);
  if (!base.startsWith(root)) return null;
  if (urlPath.endsWith('/') && await isFile(join(base, 'index.html'))) return join(base, 'index.html');
  if (await isFile(base)) return base;
  if (await isFile(`${base}.html`)) return `${base}.html`;
  if (await isFile(join(base, 'index.html'))) return join(base, 'index.html');
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  // Vercel cleanUrls: /about.html -> /about, trailingSlash: false
  if (pathname.endsWith('.html')) {
    const to = pathname.replace(/(index)?\.html$/, '') || '/';
    res.writeHead(308, { Location: to }); return res.end();
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.writeHead(308, { Location: pathname.slice(0, -1) }); return res.end();
  }
  let file = await resolvePath(pathname === '/' ? '/index.html' : pathname);
  let status = 200;
  if (!file) { file = join(root, '404.html'); status = 404; }
  const ext = extname(file);
  let body = await readFile(file);
  const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' };
  if (COMPRESS.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    body = gzipSync(body); headers['Content-Encoding'] = 'gzip';
  }
  res.writeHead(status, headers);
  res.end(body);
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
