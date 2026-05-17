# FixIt Pro — Phone Repair Landing Page

[![CI](https://github.com/jirawagy-rgb/phone/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jirawagy-rgb/phone/actions/workflows/ci.yml)

A static marketing and lead-generation landing page for **FixIt Pro**, a phone repair business based in Praha 3.

## What's on the page

- Hero section with trust bar (repairs done, rating, warranty, avg. repair time)
- Services grid (screen, battery, water damage, camera, charging port, speaker)
- Why Us cards with key selling points
- Pricing tiers (Basic Fix, Screen & Battery, Advanced Repair)
- Testimonials
- FAQ accordion
- Contact / repair request form
- Responsive layout for mobile, tablet, and desktop

---

## Tech stack

| Area | Technology |
|---|---|
| Markup | HTML5 (single page) |
| Styling | Modular CSS with custom properties |
| Behaviour | Vanilla browser JavaScript |
| Form handling | Netlify Forms (`data-netlify="true"`) |
| Testing | Playwright smoke tests |
| Linting | ESLint · Stylelint · HTMLHint |
| CI | GitHub Actions (lint + smoke tests on Node.js 20 and 22) |
| CD | GitHub Actions deploy to Netlify after successful CI on main |

---

## Requirements

- **Node.js 20** or later
- **npm** (comes with Node)

---

## Setup

```bash
npm ci
```

Install Playwright browsers (needed for smoke tests):

```bash
npx playwright install --with-deps chromium
```

---

## Local preview

Start the development server and open the page in your browser:

```bash
npm run serve
# → http://127.0.0.1:4173
```

---

## Quality checks

Run all linters and smoke tests in one command:

```bash
npm run check
```

Or run them separately:

```bash
npm run lint          # ESLint + Stylelint + HTMLHint
npm run test:smoke    # Playwright smoke tests
```

---

## Deployment

This site is deployed to **Netlify** via GitHub Actions.

- CI runs on every push and pull request.
- CD deploy runs automatically after successful CI on branch `main`.
- The deploy workflow is defined in `.github/workflows/cd.yml`.

Required GitHub repository secrets:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/). No backend needed.
Submissions appear in the Netlify dashboard under **Forms**.

> If you deploy elsewhere (Vercel, GitHub Pages, plain hosting), the form will not work without a replacement backend. Update the `action` attribute on `#contactForm` and handle the POST endpoint on your server.

---

## File map

| File | Purpose |
|---|---|
| `src/index.html` | All page content and markup |
| `src/js/main.js` | All browser behaviour (menu, FAQ, form, animations) |
| `src/styles/styles.css` | CSS entrypoint — imports the files below |
| `src/styles/base.css` | Design tokens, reset, buttons, animations |
| `src/styles/layout.css` | Navbar and hero layout |
| `src/styles/sections.css` | Section grids, contact, footer layout |
| `src/styles/components.css` | Cards, FAQ, form, social, back-to-top |
| `src/styles/responsive.css` | Mobile and tablet breakpoints |
| `tests/e2e/smoke.spec.js` | Playwright smoke tests |
| `tests/static-server.cjs` | Local dev/test server |
| `.github/workflows/ci.yml` | GitHub Actions CI pipeline |
| `.github/workflows/cd.yml` | GitHub Actions CD pipeline (Netlify deploy) |

