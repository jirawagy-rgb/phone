---
tags: [navbar, scrolling, navigation]
type: concept
created: 2026-05-17
---
# Navbar Scroll State and Active Link Highlighting Behavior
The navbar logic adds a `scrolled` class after 40px, toggles back-to-top visibility after 400px, and computes the active anchor by comparing `window.scrollY` with each section offset.

Related: [[runtime-architecture]], [[mobile-menu-accessibility-and-escape-close]], [[playwright-smoke-tests-core-user-flows]]

Implementation anchor: `initNavbarScroll` in `src/js/main.js` with passive scroll listener.

