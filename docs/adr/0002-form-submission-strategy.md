# ADR 0002: Form Submission Strategy

- Status: Accepted
- Date: 2026-05-17

## Context

The contact form must collect leads without building and operating a custom backend. The current form markup uses `data-netlify="true"` and submits `application/x-www-form-urlencoded` data.

## Decision

Use a provider-compatible POST approach driven by HTML + client JavaScript:

- Keep form metadata in HTML (`name="contact"`, hidden `form-name`, honeypot field)
- Submit via `fetch` with `URLSearchParams` payload in `src/js/main.js`
- Show user feedback in-page (`#formSuccess`, `#formFail`)
- Keep a mock-compatible endpoint (`/`) for local smoke tests

## Consequences

### Positive

- No dedicated API service needed
- Works with static hosting providers that support form ingestion
- Easy to test locally through mocked POST handling in `tests/static-server.cjs`

### Negative

- Tight coupling to hosting provider conventions
- Limited control over backend validation and processing
- Migration to another platform may require form pipeline changes

## Follow-up Triggers

Revisit this decision if:

- Leads must integrate into custom CRM workflows with strict validation
- Multi-step form logic or file uploads are required
- Deployment target changes to hosting without native form handling

