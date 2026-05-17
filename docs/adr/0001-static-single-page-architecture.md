# ADR 0001: Static Single-Page Architecture

- Status: Accepted
- Date: 2026-05-17

## Context

The product is a marketing and lead-generation website with a single primary user journey: browse services and submit a contact request. The project needs low hosting complexity, low operational cost, and simple contributor onboarding.

## Decision

Use a static single-page architecture:

- One HTML entry point (`src/index.html`)
- Client-side behavior in one JavaScript file (`src/js/main.js`)
- CSS split by concern and imported through `src/styles/styles.css`
- No runtime backend dependency for rendering

## Consequences

### Positive

- Very fast local setup and deployment
- Minimal infrastructure and operational overhead
- Works on commodity static hosting

### Negative

- Limited dynamic personalization and server-driven rendering
- Form handling and analytics depend on external integrations
- Increasing complexity in one page can reduce maintainability if scope grows

## Follow-up Triggers

Revisit this decision if any of these become true:

- Multi-page SEO strategy is required
- Authenticated user journeys are introduced
- Server-side business logic is needed

