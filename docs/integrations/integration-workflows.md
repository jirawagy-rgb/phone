# Integration Workflows

This document describes how external systems and internal automation connect to the project.

## 1) Local Development Workflow

1. Install dependencies: `npm ci`
2. Start local server: `npm run serve`
3. Open `http://127.0.0.1:4173`

Details:

- Local server implementation: `tests/static-server.cjs`
- Static file root: repository root
- POST behavior: returns `{ "ok": true }` for form smoke testing

## 2) Quality Gate Workflow

1. Run full checks: `npm run check`
2. Pipeline stages:
   - `npm run lint`
   - `npm run test:smoke`

Lint stack:

- JavaScript: ESLint (`eslint.config.mjs`)
- CSS: Stylelint (`.stylelintrc.json`)
- HTML: HTMLHint (`.htmlhintrc`)

## 3) CI Workflow (GitHub Actions)

Workflow file: `.github/workflows/ci.yml`

Execution path:

1. Triggered on push, pull request, or manual dispatch
2. Uses Node.js 20
3. Runs `npm ci`
4. Installs Playwright Chromium
5. Runs `npm run check`
6. Uploads Playwright artifacts on failure

## 4) Form Submission Integration

Primary path:

1. User submits `#contactForm`
2. `script.js` validates required fields client-side
3. Payload is encoded as `application/x-www-form-urlencoded`
4. `fetch` POST is sent to `action` endpoint (default `/`)
5. UI displays success (`#formSuccess`) or failure (`#formFail`)

Provider assumptions:

- Markup includes Netlify-compatible fields (`data-netlify`, hidden `form-name`, honeypot)
- In production, hosting provider must accept form POSTs for lead capture
- In local/test runs, `tests/static-server.cjs` handles POST with a mock success response

## 5) Deployment Workflow

Current documented target: Netlify (from `README.md`)

1. Push to connected branch
2. Netlify builds/deploys static site
3. Form submissions are collected in provider dashboard

If changing host:

- Keep static asset serving behavior
- Replace form endpoint/integration if native form capture is unavailable
- Re-run smoke tests after migration
