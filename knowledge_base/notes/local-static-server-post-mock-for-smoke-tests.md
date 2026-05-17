---
tags: [local-server, nodejs, testing]
type: reference
created: 2026-05-17
---
# Local Static Server POST Mock for Smoke Testing
The local Node HTTP server serves static files from repo root and returns `{ ok: true }` for POST requests, allowing form success flows to be tested without live hosting integrations.

Related: [[development-and-deployment]], [[form-integration]], [[playwright-smoke-tests-core-user-flows]]

Source anchor: `tests/static-server.cjs`.
