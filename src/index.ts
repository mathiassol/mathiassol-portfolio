import { Hono } from "hono";

const app = new Hono();

const css = `
  :root {
    --ink: #f3efe6;
    --muted: #b7c0b8;
    --bg: #0c1412;
    --accent: #d4a35c;
    --line: #2a3a34;
    --sans: "DM Sans", "Avenir Next", sans-serif;
    --display: "Fraunces", Georgia, serif;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    color: var(--ink);
    font-family: var(--sans);
    background: var(--bg);
  }
  main {
    width: min(36rem, calc(100% - 2.5rem));
    margin: 0 auto;
    padding: 3.5rem 0 4rem;
  }
  h1 {
    font-family: var(--display);
    font-size: clamp(1.8rem, 4vw, 2.4rem);
    letter-spacing: -0.03em;
    margin: 0 0 0.5rem;
  }
  h1 span { color: var(--accent); }
  p { color: var(--muted); line-height: 1.5; margin: 0 0 1rem; }
  code {
    font-size: 0.85em;
    color: var(--accent);
  }
`;

function page(title: string, body: string, current: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Fraunces:opsz,wght@9..144,600&display=swap" rel="stylesheet" />
    <script type="module" src="https://mathiassol.dev/_shell/v1/topbar.js"></script>
    <style>${css}</style>
  </head>
  <body>
    <ms-topbar current="${current}" theme="dark"></ms-topbar>
    <main>${body}</main>
  </body>
</html>`;
}

app.get("*", (c) => {
  const host = new URL(c.req.url).hostname;
  const onApp = host.startsWith("app.");

  if (onApp) {
    return c.html(
      page(
        "App · Mathias Sol",
        `<h1>App</h1>
         <p>This is the portfolio Worker on <code>app.mathiassol.dev</code>. Replace this page with the real product.</p>
         <p>Routing is declared in <code>ms.json</code> — see <code>CLAUDE.md</code>.</p>`,
        "app",
      ),
    );
  }

  // Path hits (e.g. /portfolio) — keep minimal; prefer the app subdomain.
  return c.html(
    page(
      "Portfolio",
      `<h1>Mathias <span>Sol</span></h1>
       <p>No home site here. Use <a href="https://app.mathiassol.dev" style="color:#d4a35c">app.mathiassol.dev</a>.</p>`,
      "portfolio",
    ),
  );
});

export default app;
