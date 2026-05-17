---
tags: [mobile-menu, accessibility, navigation]
type: concept
created: 2026-05-17
---
# Mobile Menu Accessibility and Escape-Close Interaction
The mobile menu toggle syncs visual state (`open` class), ARIA state (`aria-expanded`), and body scroll locking, then supports closing via nav link clicks and Escape key for keyboard accessibility.

Related: [[user-interface-and-content]], [[navbar-scroll-state-and-active-link-highlighting]], [[playwright-smoke-tests-core-user-flows]]

Implementation anchors: `initMobileMenu` in `script.js`, elements `#hamburger` and `#navLinks` in `index.html`.
