# ADR 0005: CI-Gated Continuous Deployment

- Status: Accepted
- Date: 2026-05-19

## Context

The project needs a low-maintenance release process that prevents deployments of unverified changes. CI already validates lint and smoke tests, but deployment behavior must be explicitly tied to CI outcomes.

## Decision

Use a separate CD workflow (`.github/workflows/cd.yml`) that deploys to Netlify only after successful CI on `main` pushes:

- Trigger CD from `workflow_run` of `CI` and allow manual `workflow_dispatch`
- Gate automatic deploys to `main` push events with successful CI conclusion
- Deploy the exact tested commit via `workflow_run.head_sha`
- Validate `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` before deploy
- Publish static assets from `src/` using `netlify-cli deploy --prod`

## Consequences

### Positive

- Prevents untested code from reaching production
- Keeps CI and CD responsibilities clearly separated
- Supports both automated and manual release operations

### Negative

- Adds one extra workflow to maintain
- Deploy is coupled to Netlify credentials and CLI behavior

## Follow-up Triggers

Revisit this decision if:

- Multi-environment releases (preview/staging/prod) are introduced
- Deployment target changes from Netlify
- Signed artifacts or provenance attestations become a compliance requirement
