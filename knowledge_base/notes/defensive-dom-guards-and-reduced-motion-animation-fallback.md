---
tags: [javascript, accessibility, resilience, animation]
type: concept
created: 2026-05-18
---
# Defensive DOM Guards and Reduced-Motion Animation Fallback in `src/js/main.js`
The runtime scripts use defensive checks for optional DOM nodes and provide a `prefers-reduced-motion` fallback so interactive behavior remains stable even when markup changes or users disable motion effects.

Related: [[runtime-architecture]], [[reveal-animations-with-intersection-observer]], [[faq-accordion-aria-state-management]], [[contact-form-client-side-validation-rules]]

Implementation anchors:
- `initRevealAnimations`: reduced-motion immediate visibility and single-parent stagger guard.
- `setFaqItemOpen` and `initFaqAccordion`: null-safe checks for question/answer nodes.
- `validateField` and `initContactForm`: null-safe validation bindings for form inputs.
