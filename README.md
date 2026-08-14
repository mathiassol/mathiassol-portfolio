# Mathias Sol — portfolio

Personal portfolio Worker. Deployed on [mathiassol.dev](https://mathiassol.dev) via the platform (external repo deploy). This repo stays free of Cloudflare secrets.

## `ms.json`

```json
{
  "name": "portfolio",
  "endpoints": [
    { "slug": "portfolio", "kind": "path", "title": "Portfolio", "visibility": "public", "inNav": true },
    { "slug": "app", "kind": "subdomain", "host": "app", "title": "App", "visibility": "public", "inNav": true }
  ]
}
```

- `path` → `mathiassol.dev/portfolio`
- `subdomain` → `app.mathiassol.dev`

Platform Sync attaches routes/domains; Deploy only ships code.

## Local

```bash
pnpm install
pnpm dev
```

## Production

Dashboard → source **github** → pick this repo (no slug in the UI). Endpoints come from `ms.json`.
