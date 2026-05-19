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

1. Triggered on every push, pull request, and manual dispatch
2. Runs a `lint` job on Node.js 20
3. Runs smoke tests in a matrix on Node.js 20 and 22 (`needs: lint`)
4. Installs Playwright Chromium before smoke tests
5. Uploads Playwright artifacts on failure (`test-results/`, `playwright-report/`)

## 4) CD Workflow (GitHub Actions -> Netlify)

Workflow file: `.github/workflows/cd.yml`

Execution path:

1. Triggered by successful completion of `CI` workflow (`workflow_run`) or manual dispatch
2. Automatic deployment is gated to successful CI runs from `push` events on `main`
3. Checkout uses the exact tested commit SHA from CI (`workflow_run.head_sha`)
4. Validates required secrets (`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`)
5. Deploys static assets from `src/` with `netlify-cli deploy --prod`

## 5) Form Submission Integration

Primary path:

1. User submits `#contactForm`
2. `src/js/main.js` validates required fields client-side
3. Payload is encoded as `application/x-www-form-urlencoded`
4. `fetch` POST is sent to `action` endpoint (default `/`)
5. UI displays success (`#formSuccess`) or failure (`#formFail`)

Provider assumptions:

- Markup includes Netlify-compatible fields (`data-netlify`, hidden `form-name`, honeypot)
- In production, hosting provider must accept form POSTs for lead capture
- In local/test runs, `tests/static-server.cjs` handles POST with a mock success response

## 6) Local SEO Integration Workflow

Source of truth: `src/index.html`

1. Update metadata block (`title`, `meta description`, OpenGraph tags)
2. Keep JSON-LD (`MobilePhoneRepairShop`) data aligned with visible business details
3. Keep service-area text aligned across hero, support, contact, and footer
4. Keep address links valid for Google Maps deep link navigation
5. Validate with `npm run lint` and optional external rich-result validation

## 7) External Service Inventory

- Netlify: static hosting + form ingestion (production)
- GitHub Actions: CI/CD orchestration
- Google Fonts: remote font delivery (`fonts.googleapis.com`, `fonts.gstatic.com`)
- Google Maps: address deep links from contact and footer
- Facebook URL in structured data (`sameAs`) for business identity linkage
