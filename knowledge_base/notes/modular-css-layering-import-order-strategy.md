---
tags: [css, architecture, adr]
type: concept
created: 2026-05-17
---
# Modular CSS Layering Import Order Strategy in src/styles/styles.css
Styling is split by concern and imported in a stable cascade order: `src/styles/base.css`, `src/styles/layout.css`, `src/styles/sections.css`, `src/styles/components.css`, and `src/styles/responsive.css`.

Related: [[styling-system]], [[responsive-breakpoint-overrides-mobile-tablet]], [[static-single-page-architecture-overview]]

Source anchors: `docs/adr/0003-modular-css-layering.md`, `src/styles/styles.css`.

