---
tags: [javascript, initialization, browser]
type: concept
created: 2026-05-17
---
# JavaScript DOMContentLoaded Initialization Flow in script.js
`script.js` uses focused initializer functions that are called from one `DOMContentLoaded` handler, giving a predictable startup path for navbar behavior, animations, FAQ, form logic, and footer year.

Related: [[runtime-architecture]], [[navbar-scroll-state-and-active-link-highlighting]], [[mobile-menu-accessibility-and-escape-close]], [[contact-form-client-side-validation-rules]]

Key initializers: `setCurrentYear`, `initNavbarScroll`, `initMobileMenu`, `initRevealAnimations`, `initFaqAccordion`, `initBackToTop`, `initSmoothScroll`, `initContactForm`.
