import { Hono } from "hono";

const app = new Hono();

const css = `
  :root {
    --ink: #f3efe6;
    --muted: #b7c0b8;
    --bg: #0c1412;
    --bg-2: #15201c;
    --accent: #d4a35c;
    --accent-2: #7eb8a2;
    --line: #2a3a34;
    --display: "Fraunces", "Iowan Old Style", Georgia, serif;
    --sans: "DM Sans", "Avenir Next", sans-serif;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    min-height: 100vh;
    color: var(--ink);
    font-family: var(--sans);
    background:
      radial-gradient(1200px 700px at 80% -10%, #1d3a3222, transparent 55%),
      radial-gradient(900px 500px at -10% 40%, #d4a35c14, transparent 50%),
      linear-gradient(165deg, #0a100e 0%, var(--bg) 45%, var(--bg-2) 100%);
  }
  ms-topbar { display: block; }
  .hero {
    min-height: calc(100vh - 3.25rem);
    display: grid;
    align-items: end;
    padding: 0 1.25rem 3.5rem;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: "";
    position: absolute;
    inset: 8% 5% auto auto;
    width: min(42vw, 28rem);
    height: min(42vw, 28rem);
    border-radius: 50%;
    background:
      radial-gradient(circle at 35% 35%, #f0d9a8 0%, #d4a35c 28%, #8f6a2e 58%, transparent 72%);
    opacity: 0.55;
    filter: blur(2px);
    animation: rise 1.4s ease-out both;
  }
  .hero::after {
    content: "";
    position: absolute;
    inset: auto -5% -20% 40%;
    height: 55%;
    background:
      linear-gradient(120deg, transparent 20%, #7eb8a218 45%, transparent 70%),
      repeating-linear-gradient(
        -12deg,
        transparent 0 18px,
        #7eb8a20d 18px 19px
      );
    pointer-events: none;
  }
  .hero-inner {
    position: relative;
    z-index: 1;
    width: min(44rem, 100%);
    animation: up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
  }
  .brand {
    font-family: var(--display);
    font-weight: 600;
    font-size: clamp(3.2rem, 10vw, 5.6rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin: 0 0 1rem;
  }
  .brand span { color: var(--accent); }
  .lede {
    margin: 0 0 1.75rem;
    max-width: 28rem;
    font-size: clamp(1.05rem, 2.4vw, 1.25rem);
    line-height: 1.45;
    color: var(--muted);
    animation: up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
  }
  .cta {
    display: inline-flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    animation: up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
  }
  .cta a {
    display: inline-flex;
    align-items: center;
    padding: 0.7rem 1.15rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    border: 1px solid transparent;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }
  .cta a:hover { transform: translateY(-1px); }
  .cta a.primary {
    background: var(--accent);
    color: #1a1408;
  }
  .cta a.ghost {
    border-color: var(--line);
    color: var(--ink);
    background: transparent;
  }
  .cta a.ghost:hover { border-color: var(--accent-2); }
  section {
    width: min(44rem, calc(100% - 2.5rem));
    margin: 0 auto;
    padding: 4.5rem 0 1rem;
  }
  section h2 {
    font-family: var(--display);
    font-size: clamp(1.6rem, 3vw, 2rem);
    letter-spacing: -0.03em;
    margin: 0 0 0.6rem;
  }
  section p {
    margin: 0;
    color: var(--muted);
    line-height: 1.55;
    max-width: 36rem;
  }
  .work {
    padding-bottom: 5rem;
  }
  .work-list {
    list-style: none;
    margin: 1.75rem 0 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }
  .work-list li {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
  }
  .work-list strong { color: var(--ink); font-weight: 600; }
  footer {
    width: min(44rem, calc(100% - 2.5rem));
    margin: 0 auto;
    padding: 2rem 0 3rem;
    color: var(--muted);
    font-size: 0.9rem;
    border-top: 1px solid var(--line);
  }
  @keyframes up {
    from { opacity: 0; transform: translateY(1.25rem); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes rise {
    from { opacity: 0; transform: scale(0.85) translateY(2rem); }
    to { opacity: 0.55; transform: scale(1) translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

app.get("*", (c) =>
  c.html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mathias Sol</title>
    <meta name="description" content="Portfolio of Mathias Sol — products, systems, and interfaces." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap" rel="stylesheet" />
    <script type="module" src="https://mathiassol.dev/_shell/v1/topbar.js"></script>
    <style>${css}</style>
  </head>
  <body>
    <ms-topbar current="portfolio" theme="dark"></ms-topbar>
    <header class="hero">
      <div class="hero-inner">
        <h1 class="brand">Mathias <span>Sol</span></h1>
        <p class="lede">Building small systems with clear edges — products, platforms, and interfaces that stay light on purpose.</p>
        <div class="cta">
          <a class="primary" href="#work">See work</a>
          <a class="ghost" href="mailto:hello@mathiassol.dev">Contact</a>
        </div>
      </div>
    </header>
    <section id="about">
      <h2>About</h2>
      <p>This is the live portfolio Worker. Swap copy and projects here as the real site grows — same repo, same deploy path on mathiassol.dev.</p>
    </section>
    <section class="work" id="work">
      <h2>Selected work</h2>
      <p>Placeholders for now. Replace with real case studies when ready.</p>
      <ul class="work-list">
        <li><strong>mathiassol.dev</strong><span>Personal Workers platform</span></li>
        <li><strong>Coming soon</strong><span>Next project</span></li>
      </ul>
    </section>
    <footer>© ${new Date().getFullYear()} Mathias Sol · mathiassol-portfolio</footer>
  </body>
</html>`),
);

export default app;
