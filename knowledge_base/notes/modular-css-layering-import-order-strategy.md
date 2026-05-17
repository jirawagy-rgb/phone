---
tags: [css, architecture, adr]
type: concept
created: 2026-05-17
---
# Modular CSS Layering Import Order Strategy in styles.css
Styling is split by concern and imported in a stable cascade order: `base.css`, `layout.css`, `sections.css`, `components.css`, and `responsive.css`.

Related: [[styling-system]], [[responsive-breakpoint-overrides-mobile-tablet]], [[static-single-page-architecture-overview]]

Source anchors: `docs/adr/0003-modular-css-layering.md`, `styles.css`.
