# Component Catalog

This document maps key components to their structure, behavior, and integration points.

## Runtime Composition

- Markup shell: `index.html`
- Behavior layer: `script.js`
- Styling layers: `base.css`, `layout.css`, `sections.css`, `components.css`, `responsive.css`

## Components

### 1) Navbar + Mobile Menu

- Markup anchors: `#navbar`, `#navLinks`, `#hamburger`
- Behavior: `initNavbarScroll`, `initMobileMenu`, `initSmoothScroll`
- Style owners: `layout.css`, `responsive.css`
- Responsibilities:
  - Sticky navigation with scrolled state
  - Active link highlighting by viewport section
  - Mobile menu toggle with ESC close and body scroll lock

### 2) Hero Section

- Markup anchor: `#home`
- Behavior: smooth-scroll CTA interaction
- Style owners: `layout.css`, `base.css`
- Responsibilities:
  - Primary value proposition and trust signals
  - Main conversion CTAs to services/contact

### 3) Services Grid

- Markup anchor: `#services`
- Behavior: reveal animation via `.fade-in`
- Style owners: `sections.css`, `components.css`
- Responsibilities:
  - Present service scope and pricing entry points

### 4) Why Us Grid

- Markup anchor: `#why-us`
- Behavior: reveal animation via `.fade-in`
- Style owners: `sections.css`, `components.css`
- Responsibilities:
  - Communicate differentiators (speed, warranty, trust)

### 5) Pricing Cards

- Markup anchor: `#pricing`
- Behavior: reveal animation via `.fade-in`
- Style owners: `sections.css`, `components.css`
- Responsibilities:
  - Package service types into decision-ready pricing tiers

### 6) Testimonials

- Markup anchor: `#testimonials`
- Behavior: reveal animation via `.fade-in`
- Style owners: `sections.css`, `components.css`
- Responsibilities:
  - Social proof and conversion confidence

### 7) FAQ Accordion

- Markup anchor: `#faq`
- Behavior: `initFaqAccordion`, `setFaqItemOpen`
- Style owners: `components.css`, `sections.css`
- Responsibilities:
  - Single-open accordion interaction
  - ARIA state syncing (`aria-expanded`, `aria-hidden`)

### 8) Contact Form

- Markup anchors: `#contact`, `#contactForm`, `#submitBtn`, `#formSuccess`, `#formFail`
- Behavior: `initContactForm`, `createValidationRules`, `validateField`, `setSubmitLoadingState`
- Style owners: `components.css`, `sections.css`
- Responsibilities:
  - Client-side validation for required fields
  - Async form submission and loading state
  - Success/failure feedback rendering

### 9) Footer + Dynamic Year

- Markup anchor: `#currentYear`
- Behavior: `setCurrentYear`
- Style owners: `sections.css`
- Responsibilities:
  - Brand/support links and legal footer metadata

### 10) Back-to-Top Control

- Markup anchor: `#backToTop`
- Behavior: `initBackToTop`, `initNavbarScroll`
- Style owners: `components.css`
- Responsibilities:
  - Contextual visibility after scroll threshold
  - Smooth scroll back to page start

## Quality Coverage Mapping

- Smoke coverage: `tests/smoke.spec.js`
- Current covered behaviors:
  - Core sections visible on load
  - Year text populated
  - Mobile menu open/close behavior
  - Form validation error rendering
  - Successful form submission path
- Coverage gap examples:
  - FAQ interaction behavior not currently asserted
  - Back-to-top button visibility/behavior not currently asserted
