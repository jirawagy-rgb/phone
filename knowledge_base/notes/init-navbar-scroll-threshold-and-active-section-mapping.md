---
tags: [javascript, navbar, scrolling]
type: concept
created: 2026-05-17
---
# initNavbarScroll Threshold Logic and Active Section Mapping
`initNavbarScroll` combines three scroll concerns in one passive handler: sticky state at 40px, back-to-top visibility at 400px, and active nav link mapping by section offsets.

Related: [[runtime-architecture]], [[navbar-scroll-state-and-active-link-highlighting]], [[init-back-to-top-smooth-scroll-control]]

Implementation anchor: `initNavbarScroll(navbar, navLinks, sections, backToTopBtn)` in `src/js/main.js`.

