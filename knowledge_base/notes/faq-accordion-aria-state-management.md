---
tags: [faq, accordion, aria]
type: concept
created: 2026-05-17
---
# FAQ Accordion ARIA State Management and Single-Open Logic
The FAQ component enforces single-open behavior and keeps accessibility state synchronized by toggling `aria-expanded` on question buttons and `aria-hidden` on answer regions.

Related: [[user-interface-and-content]], [[javascript-domcontentloaded-initialization-flow]], [[playwright-smoke-tests-core-user-flows]]

Implementation anchors: `setFaqItemOpen` and `initFaqAccordion` in `script.js`.
