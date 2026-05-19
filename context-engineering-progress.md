# Context Engineering Progress

Last updated: 2026-05-19
Project root: C:\Users\Jirka\Desktop\GitHub\Repos\phone

## Purpose

This file is a continuity anchor across multiple chats. Update it at the end of major sessions so a new conversation can resume quickly with minimal re-discovery.

## Current State Snapshot

- Project type: Static landing page (HTML/CSS/vanilla JS)
- Main runtime files: `src/index.html`, `src/js/main.js`, `src/styles/*.css`
- Tooling: ESLint, Stylelint, HTMLHint, Playwright smoke tests
- CI: GitHub Actions (`lint` on Node 20, smoke matrix on Node 20 and 22)
- CD: GitHub Actions deploy to Netlify gated by successful CI on `main`

## Documentation Created

- `docs/README.md`
- `docs/architecture/system-architecture.md`
- `docs/adr/0001-static-single-page-architecture.md`
- `docs/adr/0002-form-submission-strategy.md`
- `docs/adr/0003-modular-css-layering.md`
- `docs/adr/0004-quality-gates-and-ci.md`
- `docs/adr/0005-ci-gated-continuous-deployment.md`
- `docs/adr/0006-local-seo-metadata-and-structured-data.md`
- `docs/components/component-catalog.md`
- `docs/integrations/integration-workflows.md`

## Active Architectural Decisions

- Keep static single-page architecture for low operational complexity
- Use provider-compatible form submission rather than custom backend
- Maintain modular CSS split with stable import order
- Keep lint + smoke tests as minimum quality gate
- Gate production deployment on successful CI for `main` pushes
- Maintain local SEO metadata and JSON-LD directly in `src/index.html`

## Known Gaps / Risks

- Smoke test coverage does not yet include FAQ accordion behavior
- Smoke test coverage does not yet include back-to-top behavior
- Form integration remains coupled to provider conventions
- Business metadata appears in multiple places (visible copy + JSON-LD) and can drift

## Next Recommended Actions

1. Add smoke tests for FAQ and back-to-top behaviors.
2. Add an ADR template file for future decision consistency.
3. Add a lightweight doc check in CI to detect stale references after architecture/content changes.
4. Add an SEO consistency checklist (metadata, JSON-LD, contact details, service area) to PR review.

## Session Handoff Template

When continuing in a new chat, copy and refresh this block:

- Goal for this session:
- Files expected to change:
- Constraints (runtime, deployment, tooling):
- Decisions made this session:
- Tests run and results:
- Outstanding questions:
- Next concrete step:

## Change Log

- 2026-05-17: Initial structured documentation set added (ADRs, components, integration workflows) and continuity file created.
- 2026-05-19: Added ADR 0006 for local SEO strategy and aligned component/integration docs with current runtime and CI/CD behavior.
