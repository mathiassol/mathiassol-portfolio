# Mathias Sol — portfolio

Personal portfolio Worker. Deployed on [mathiassol.dev](https://mathiassol.dev) via the platform (external repo deploy). This repo stays free of Cloudflare secrets.

## `ms.json`

Platform reads this file for Worker name + routes. Add more endpoint objects to expose extra paths on the same Worker:

```json
{
  "name": "portfolio",
  "endpoints": [
    { "slug": "portfolio", "title": "Portfolio", "visibility": "public", "inNav": true }
  ]
}
```

Optional `"build": "npm ci && npm run build"` runs in CI before `wrangler deploy`.

## Local

```bash
pnpm install
pnpm dev
```

## Production

Dashboard → source **github** → pick this repo (no slug in the UI). Endpoints come from `ms.json`.
