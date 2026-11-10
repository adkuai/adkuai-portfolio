# Portfolio

A developer portfolio built with Next.js 16, React 19, TypeScript and Tailwind v4.

**Live:** [adkuai.github.io](https://adkuai.github.io)

MIT licensed — fork it, drop in your own details, ship it. Everything personal
lives in one config file and a folder of typed data, so you should not need to
touch a component to make it yours.

## Why fork this one

- **Real numbers, not hardcoded ones.** LeetCode, Codeforces, CodeChef and
  GitHub are fetched at build time and revalidated every six hours. Each request
  carries its own timeout and falls back to a committed snapshot, so a dead
  upstream degrades a stat instead of blanking a section or hanging the build.
- **One config file.** Name, tagline, handles, email, resume, booking link and
  bios all live in [`portfolio.config.ts`](portfolio.config.ts). Change it and
  the hero, page titles, Open Graph tags, every profile link and the sitemap all
  follow.
- **Social card generated from that config.** No design tool, no committed PNG.
- **Content as data.** Experience, projects, skills, education, hackathons and
  highlights are typed modules in [`src/data/`](src/data). Array order is
  display order.
- **Sections you can switch off.** Not writing a blog yet? One boolean hides the
  section, the nav entry and the command-palette item without deleting code.
- **⌘K command palette**, dark/light themes, a GitHub contribution heatmap, and
  `sitemap.xml` / `robots.txt` that generate themselves.

## Quick start

```bash
git clone https://github.com/adkuai/portfolio.git
cd portfolio
npm install
npm run dev          # http://localhost:3000
```

It runs with **no environment variables**. Add a GitHub token only if you want
the live contribution graph:

```bash
# .env.local
GITHUB_TOKEN=github_pat_...   # needs read:user
```

Without it the graph renders from the committed snapshot.

## Making it yours

1. Edit [`portfolio.config.ts`](portfolio.config.ts) — this is the one file that
   matters.
2. Replace the content in [`src/data/`](src/data) with your own.
3. Swap the images in [`public/`](public) and your resume PDF.

**[SETUP.md](SETUP.md) walks through every file**, including the two gotchas
that bite hardest: project screenshots must be **1.6 aspect** or the card frame
crops them, and you should **rename image files when replacing them** or Next's
optimiser will keep serving the old one.

That guide is written to be handed to a coding agent along with your resume.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run refresh-stats` | Re-snapshot LeetCode/Codeforces/CodeChef/GitHub |
| `npm run refresh-music` | Resolve album titles and covers from Spotify oEmbed |

## Deploying

Import the repo on Vercel — it builds with no configuration. Point `url` in the
config (or `NEXT_PUBLIC_SITE_URL`) at your domain so canonical URLs, the sitemap
and the social card all agree.

For a free subdomain, [is-a.dev](https://github.com/is-a-dev/register) works
well with Vercel; SETUP.md has the exact steps including the `_vercel`
verification record.

## License

MIT — see [LICENSE](LICENSE). The code is yours to reuse.

The **content** is not: `src/data/`, `public/` and the resume PDF are someone's
actual career. Replace them with your own rather than shipping a stranger's
history. Please also swap the social links before deploying — the whole point is
that it is one file.
