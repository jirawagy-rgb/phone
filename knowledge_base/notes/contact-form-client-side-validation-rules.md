---
tags: [form-validation, javascript, ux]
type: how-to
created: 2026-05-17
---
# Contact Form Client-Side Validation Rules and Error Rendering
Validation rules are centralized in `createValidationRules()` and applied on blur/input plus submit, with field-level error text and `error` class styling to prevent invalid form submissions.

Related: [[form-integration]], [[netlify-compatible-form-post-submission-pattern]], [[playwright-smoke-tests-core-user-flows]]

Validated required fields: `name`, `phone`, `device`, and `service`.
