---
tags: [javascript, form, validation, maintainability]
type: concept
created: 2026-05-18
---
# `initContactForm` Stable `ruleKeys` Iteration Pattern
`initContactForm` captures validation field keys once into `ruleKeys` and reuses that array for event binding, submit-time validation, and post-submit error reset to keep form behavior consistent and reduce repeated `Object.keys(...)` lookups.

Related: [[init-contact-form-async-submit-and-feedback-states]], [[create-validation-rules-form-field-rule-map]], [[validate-field-error-class-and-message-rendering]], [[set-submit-loading-state-button-spinner-toggle]]

Implementation anchors: `initContactForm` in `src/js/main.js`.
