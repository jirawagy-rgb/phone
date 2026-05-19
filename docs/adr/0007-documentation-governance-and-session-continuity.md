# ADR 0007: Documentation Governance and Session Continuity

- Status: Accepted
- Date: 2026-05-19

## Context

The project already has ADRs, component documentation, and integration workflow docs, but updates can drift from runtime changes over time.
The work is often done across multiple chats, so each new session needs a reliable way to resume context without re-discovery.

## Decision

Adopt a documentation governance rule set:

- Treat `docs/adr`, `docs/components`, and `docs/integrations` as required update targets when architecture, component behavior, or external workflows change.
- Keep `context-engineering-progress.md` as the continuity anchor and update it at the end of each major session.
- Record only accepted architectural decisions as ADRs and keep ADR numbering append-only.
- Include explicit "last reviewed" timestamps and a short change log for continuity-critical docs.

## Consequences

### Positive

- Reduces drift between implementation and documentation.
- Speeds up multi-chat handoff and lowers onboarding time for new sessions.
- Makes architecture and workflow changes auditable over time.

### Negative

- Adds lightweight documentation overhead to each major change.
- Requires team discipline to keep the continuity file and ADR index current.

## Follow-up Triggers

Revisit this decision if:

- The project introduces multiple deployable surfaces and doc ownership becomes unclear.
- Documentation updates become a bottleneck and need automation in CI.
- The team adopts a centralized docs platform outside this repository.
