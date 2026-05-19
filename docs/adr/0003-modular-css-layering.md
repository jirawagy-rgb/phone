# ADR 0003: Modular CSS Layering

- Status: Accepted
- Date: 2026-05-17

## Context

The page includes many visual blocks (hero, grids, cards, FAQ, form, footer) that evolve at different rates. A single large stylesheet is harder to reason about and review.

## Decision

Keep CSS split into layers and import in a stable order via `src/styles/styles.css`:

1. `src/styles/base.css` (tokens, reset, shared primitives)
2. `src/styles/layout.css` (global layout structures)
3. `src/styles/sections.css` (section-level wrappers)
4. `src/styles/components.css` (reusable UI blocks)
5. `src/styles/skeleton.css` (skeleton visual placeholders for image blocks)
6. `src/styles/responsive.css` (breakpoint overrides)

## Consequences

### Positive

- Easier ownership and smaller review surface
- Clear place for each style concern
- Predictable cascade order

### Negative

- Cross-file class tracing is required during debugging
- Import order mistakes can introduce regressions

## Follow-up Triggers

Revisit this decision if:

- CSS bundle grows large enough to require tooling-driven splitting
- Design system tokens move to a dedicated package
- Team standardizes on CSS-in-JS or utility-first frameworks

