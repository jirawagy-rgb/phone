---
tags: [github-actions, cd, netlify]
type: reference
created: 2026-05-19
---
# GitHub Actions CD Workflow Run Gating and Netlify Secret Check
The CD pipeline deploys only after a successful CI push on `main` (or manual dispatch), validates required Netlify secrets before deployment, and deploys `src/` with `netlify-cli`.

Related: [[development-and-deployment]], [[github-actions-ci-node20-lint-and-smoke]], [[netlify-deployment-and-form-ingestion-assumptions]]

Source anchors: `.github/workflows/cd.yml`, `README.md`, `docs/integrations/integration-workflows.md`.
