---
tags: [netlify, form-post, lead-capture]
type: concept
created: 2026-05-17
---
# Netlify-Compatible Form POST Submission Pattern
The contact form posts `application/x-www-form-urlencoded` payloads generated from `FormData`, while HTML embeds provider-compatible metadata (`data-netlify`, hidden `form-name`, honeypot) for static-host form ingestion.

Related: [[form-integration]], [[contact-form-client-side-validation-rules]], [[netlify-deployment-and-form-ingestion-assumptions]]

Implementation anchors: `initContactForm` in `src/js/main.js` and `<form id="contactForm">` in `src/index.html`.

