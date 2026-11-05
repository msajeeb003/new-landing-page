# Deploying the portfolio to Vercel

**Live address:** https://www.mostafizur.me (custom domain).
The Vercel project is `new-landing-page` (backup address: `new-landing-page-coral-zeta.vercel.app`), deployed from GitHub `msajeeb003/new-landing-page`. Every push to `main` redeploys the site.

It's a plain static site (HTML, CSS, JS), so there's **no build step and nothing to install**.

---

## Custom domain: mostafizur.me (Namecheap → Vercel)

In Vercel (*Project → Settings → Domains*), `mostafizur.me` redirects (308) to `www.mostafizur.me`, which serves the site.

The domain is registered at **Namecheap**. Its DNS must point to Vercel. Set this in *Namecheap → Domain List → Manage (mostafizur.me) → Advanced DNS → Host Records*:

| Action | Type | Host | Value | TTL |
|---|---|---|---|---|
| **Delete** | A Record | `@` | `185.199.108.153` | — |
| **Delete** | A Record | `@` | `185.199.109.153` | — |
| **Delete** | A Record | `@` | `185.199.110.153` | — |
| **Delete** | A Record | `@` | `185.199.111.153` | — |
| **Delete** | CNAME Record | `www` | `mostafizur.me` (or `@`) | — |
| **Add** | A Record | `@` | `76.76.21.21` | Automatic |
| **Add** | CNAME Record | `www` | `cname.vercel-dns.com.` | Automatic |

The four `185.199.x.153` records are old GitHub Pages settings and must go. Also remove any other record on `@` or `www` (AAAA, URL Redirect, parking page), because it would conflict.

> If Vercel's **"View DNS configuration"** shows different values (newer accounts may show an A value like `216.198.79.1` and a CNAME like `xxxx.vercel-dns-017.com`), use **exactly what Vercel shows**. Both the old and new values work.

After saving, it usually takes **5–30 minutes** (sometimes up to 48 hours). Both domains then turn **"Valid Configuration"** in Vercel, and Vercel adds the free HTTPS certificate automatically.

**To check from a terminal:** `nslookup mostafizur.me` should show `76.76.21.21` (or Vercel's value), and `nslookup www.mostafizur.me` should show the Vercel CNAME.

---

## Original setup notes (vercel.app address)

`mostafizur.vercel.app` (and `mostafizur-rahman`, `mostafizurrahman`, `mostafizur-portfolio`, `mostafizur-dev`) already belong to other people. The instructions below use the project name `mostafizur-ai` as an example; the live project is called `new-landing-page`.

---

## What's in the folder for Vercel

| File | What it does |
|---|---|
| `vercel.json` | Hosting settings: security headers, caching, clean URLs, CV download name |
| `.vercelignore` | Keeps your original photos and notes (≈23 MB) on your computer, not online |
| `404.html` | Branded "page not found" screen |
| `robots.txt`, `sitemap.xml` | Help Google find and index the site |
| `favicon.*`, `apple-touch-icon.png`, `icon-512.png`, `site.webmanifest` | Browser tab and phone home-screen icons |

About **49 files / 8.6 MB** are uploaded.

---

## Option A — Deploy from your computer (fastest, about 5 minutes)

You need a free Vercel account: sign up at https://vercel.com/signup (choosing "Continue with GitHub" is easiest).

1. Open a terminal **in this folder** (`H:\Aretch Digital\Portfolio mine`).
   In VS Code: *Terminal → New Terminal*.

2. Log in to Vercel (opens your browser once):
   ```
   npx vercel login
   ```

3. Create the project and deploy a preview:
   ```
   npx vercel
   ```
   Answer the questions like this:
   - *Set up and deploy?* → **Y**
   - *Which scope?* → your account
   - *Link to existing project?* → **N**
   - *What's your project's name?* → **`mostafizur-ai`**
   - *In which directory is your code located?* → **`./`** (just press Enter)
   - *Want to modify these settings?* → **N**

4. Publish to the real address:
   ```
   npx vercel --prod
   ```
   When it finishes, your site is live at **https://mostafizur-ai.vercel.app**.

**To update the site later:** save your changes, then run `npx vercel --prod` again.

---

## Option B — Deploy through GitHub (auto-updates on every push)

1. Create a new repository on GitHub (for example `msajeeb003/portfolio`) and upload this folder.
   The `.vercelignore` file only affects Vercel. If you don't want the original photos on GitHub either, delete them or add them to a `.gitignore`.
2. Go to https://vercel.com/new and **Import** that repository.
3. Set:
   - **Project Name:** `mostafizur-ai`
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (the repository root)
4. Click **Deploy**.

From then on, every push to GitHub updates the live site automatically.

---

## After the first deploy — checklist

1. **Open the site:** https://mostafizur-ai.vercel.app. Click around: menu, filters, "View all work", Download CV.

2. **Activate the contact form (one time only).**
   Send yourself a test message through the form. FormSubmit emails **mostafizur.contacts@gmail.com** an **"Activate Form"** link: click it, and check Spam if you don't see it. After that, every message reaches your inbox. The first test shows an error until you've activated; that's expected.

3. **Check the link preview** (what people see when you share the link):
   - LinkedIn: https://www.linkedin.com/post-inspector/ → paste your URL
   - Facebook/WhatsApp: https://developers.facebook.com/tools/debug/

4. **Put the link everywhere:** LinkedIn (Contact info → Website), Upwork and Fiverr profiles, GitHub profile (Website field), and your CV.

5. **Optional — get on Google:** in https://search.google.com/search-console, add the site, then submit `https://mostafizur-ai.vercel.app/sitemap.xml`.

---

## If you use a different name

If you pick another project name (or Vercel gives you a different address), replace
`https://mostafizur-ai.vercel.app` with your real address in these 3 files:

- `index.html`: 5 places near the top (canonical, `og:url`, `og:image`, `twitter:image`)
- `robots.txt`: 1 place
- `sitemap.xml`: 1 place

In VS Code: **Ctrl+Shift+H** (Replace in Files), search `mostafizur-ai.vercel.app`, replace with your address, then **Replace All**. Deploy again.

You can also change the address after deploying: Vercel → your project → **Settings → Domains** → edit the `.vercel.app` domain (if the new name is free).

### Using your own domain later (for example `mostafizur.dev`)
Buy the domain, then in Vercel go to **Settings → Domains → Add** and follow the DNS instructions. Then do the find-and-replace above with the new domain.

---

## Notes

- **Security:** `vercel.json` sends strict security headers, including a Content-Security-Policy that only allows your own files, Google Fonts and FormSubmit. If you later add something from another site (an analytics script, an embedded video), add that site to the matching part of the policy in `vercel.json`, or the browser will block it.
- **The small inline script** in `index.html` (`document.documentElement.classList.add('js')`) is allowed by an exact fingerprint (hash) in the policy. If you edit that one line, the hash in `vercel.json` must be updated too.
- **Caching:** images are cached for 7 days. If you replace an image but keep the same file name, visitors may see the old one for a while. Renaming the file (for example `og-v2.jpg`) makes the change show immediately.
