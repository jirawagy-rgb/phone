---
tags: [github-actions, ci, node20]
type: reference
created: 2026-05-17
---
# GitHub Actions CI with Node 20 Lint and Smoke Checks
CI runs on `ubuntu-latest` with Node 20, installs dependencies and Playwright Chromium, executes `npm run check`, and uploads Playwright artifacts when failures occur.

Related: [[development-and-deployment]], [[quality-and-testing]], [[linting-stack-eslint-stylelint-htmlhint]], [[playwright-smoke-tests-core-user-flows]]

Source anchor: `.github/workflows/ci.yml`.
