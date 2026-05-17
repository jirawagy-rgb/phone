---
tags: [javascript, mobile-menu, accessibility]
type: concept
created: 2026-05-17
---
# initMobileMenu Open State, ARIA Sync, and Body Scroll Lock
`initMobileMenu` encapsulates mobile navigation state transitions by syncing CSS classes, `aria-expanded`, and `document.body.style.overflow`, then adding close-on-link and Escape support.

Related: [[user-interface-and-content]], [[mobile-menu-accessibility-and-escape-close]], [[init-smooth-scroll-anchor-offset-navigation]]

Implementation anchor: `initMobileMenu(hamburger, navLinksMenu)` in `script.js`.
