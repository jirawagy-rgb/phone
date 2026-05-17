---
tags: [javascript, form, loading-state]
type: concept
created: 2026-05-17
---
# setSubmitLoadingState Button Text and Spinner Toggle Pattern
`setSubmitLoadingState` centralizes submission UX state by swapping visible button text/spinner and disabling double-submit while network requests are in flight.

Related: [[form-integration]], [[init-contact-form-async-submit-and-feedback-states]], [[netlify-compatible-form-post-submission-pattern]]

Implementation anchor: `setSubmitLoadingState(submitBtn, isLoading)` in `src/js/main.js`.

