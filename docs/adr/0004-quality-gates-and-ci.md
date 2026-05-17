# ADR 0004: Quality Gates and CI

- Status: Accepted
- Date: 2026-05-17

## Context

This project is mostly static code where regressions are usually visual or behavior-related. We need fast quality checks that run the same way locally and in CI.

## Decision

Use a combined quality gate pipeline:

- Linting: ESLint (`src/js/main.js`), Stylelint (`src/styles/*.css`), HTMLHint (`src/index.html`)
- Browser smoke coverage: Playwright tests (`tests/e2e/smoke.spec.js`)
- CI orchestration: GitHub Actions workflow at `.github/workflows/ci.yml`
- Single developer command: `npm run check`

## Consequences

### Positive

- Fast feedback on basic correctness and formatting issues
- Critical user paths are validated in a real browser context
- CI parity with local command set

### Negative

- Smoke tests are not full regression coverage
- Playwright browser install adds CI runtime cost

## Follow-up Triggers

Revisit this decision if:

- Regression rate increases and requires broader end-to-end coverage
- Additional environments (staging/prod previews) require dedicated test jobs
- Team introduces visual regression tooling

