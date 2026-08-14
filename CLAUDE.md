# CLAUDE.md — mathiassol-portfolio

This repo is an **external app** on the [mathiassol.dev](https://mathiassol.dev) platform.  
It has **no Cloudflare secrets**. Routing and deploys are owned by the platform + `ms.json`.

## Mental model

| Piece | Role |
|---|---|
| This repo | Worker source (`src/index.ts` + `wrangler.jsonc`) |
| `ms.json` | Declares Worker name + all public URLs (paths / subdomains) |
| Platform dashboard | Connects the GitHub repo, Syncs `ms.json`, triggers Deploy |
| Platform Actions | Checks out this repo and runs `wrangler deploy --name ms-<name>` |

Do **not** put CF account IDs, API tokens, or deploy workflows in this repo.

## `ms.json` (source of truth)

```json
{
  "name": "portfolio",
  "build": "optional shell command before deploy",
  "endpoints": [
    {
      "slug": "app",
      "title": "App",
      "kind": "subdomain",
      "host": "app",
      "visibility": "public",
      "inNav": true
    }
  ]
}
```

### Fields

- **`name`** — app id → Cloudflare Worker `ms-<name>` (here: `ms-portfolio`)
- **`build`** (optional) — run in CI before deploy, e.g. `"npm ci && npm run build"`
- **`endpoints[]`**
  - **`slug`** — registry id (unique on the platform)
  - **`title`** — label in the shared topbar nav
  - **`kind`**
    - `"path"` → `https://mathiassol.dev/<slug>*`
    - `"subdomain"` → `https://<host|slug>.mathiassol.dev` (Workers Custom Domain; DNS + cert automatic)
  - **`host`** (subdomain only, optional) — DNS label; defaults to `slug`
  - **`visibility`** — `"public"` \| `"private"` (private is hidden from nav)
  - **`inNav`** — show in `<ms-topbar>` / `nav.json`

Reserved labels (cannot use as slug/host): `dashboard`, `_shell`, `api`, `cdn-cgi`, `www`, `assets`.

### Multi-endpoint

One Worker can own many endpoints. Example: keep a path and a subdomain on the same app:

```json
{
  "name": "portfolio",
  "endpoints": [
    { "slug": "portfolio", "kind": "path", "title": "Portfolio", "visibility": "public", "inNav": true },
    { "slug": "app", "kind": "subdomain", "host": "app", "title": "App", "visibility": "public", "inNav": true }
  ]
}
```

After editing `ms.json`: push → dashboard **Sync ms.json** → **Deploy**.

## Dashboard ops

1. https://mathiassol.dev/dashboard/ (password auth)
2. **Create** (once): source `github` → pick `mathiassol/mathiassol-portfolio` + branch  
   Platform reads `ms.json`, uploads a placeholder Worker, attaches routes/domains, queues deploy.
3. **Sync ms.json** — reconcile routes/domains after config changes (does not upload new code by itself)
4. **Deploy** — build (if `build` set) + `wrangler deploy --name ms-portfolio`
5. **Delete** — removes Worker, all routes/domains, registry rows

## Local development

```bash
pnpm install
pnpm dev
```

Uses local Wrangler. Topbar loads `/_shell/v1/topbar.js` — on production that comes from `mathiassol.dev`; locally nav may fall back to defaults.

## Shared shell

Include on HTML pages:

```html
<script type="module" src="/_shell/v1/topbar.js"></script>
<ms-topbar current="app" theme="dark"></ms-topbar>
```

- Path apps: relative `/_shell/...` hits the apex `www` Worker (catch-all), not this Worker.
- Subdomain apps: prefer absolute `https://mathiassol.dev/_shell/v1/topbar.js` if same-origin `/_shell` is not available on the subdomain.

Nav JSON: `GET https://mathiassol.dev/_shell/v1/nav.json` (generated from D1 public endpoints).

## What not to do

- Don’t add GitHub Actions that deploy to Cloudflare from this repo
- Don’t commit `.dev.vars` / API tokens
- Don’t put platform account/zone IDs in app code (platform injects name + routes)
- Don’t change Worker `name` in `wrangler.jsonc` expecting production routing to follow — production name comes from `ms.json` → `ms-<name>` via deploy `--name`

## Quick checklist for a new endpoint

1. Add object under `endpoints` in `ms.json`
2. Handle the host/path in `src/index.ts` if the Worker serves multiple URLs
3. Push to GitHub
4. Dashboard → Sync ms.json → Deploy
5. Open the new URL
