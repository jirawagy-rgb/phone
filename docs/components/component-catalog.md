# Component Catalog

This document maps key components to their structure, behavior, and integration points.

## Runtime Composition

- Markup shell: `src/index.html`
- Behavior layer: `src/js/main.js`
- Styling layers: `src/styles/base.css`, `src/styles/layout.css`, `src/styles/sections.css`, `src/styles/components.css`, `src/styles/skeleton.css`, `src/styles/responsive.css`

## Components

### 1) Navbar + Mobile Menu

- Markup anchors: `#navbar`, `#navLinks`, `#hamburger`
- Behavior: `initNavbarScroll`, `initMobileMenu`, `initSmoothScroll`
- Style owners: `src/styles/layout.css`, `src/styles/responsive.css`
- Responsibilities:
  - Sticky navigation with scrolled state
  - Active link highlighting by viewport section
  - Mobile menu toggle with ESC close and body scroll lock

### 2) Hero Section

- Markup anchor: `#home`
- Behavior: smooth-scroll CTA interaction
- Style owners: `src/styles/layout.css`, `src/styles/base.css`
- Responsibilities:
  - Primary value proposition and local SEO headline context
  - Main conversion CTAs to services/contact

### 3) Problem Section

- Markup anchor: `#problem`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/skeleton.css`
- Responsibilities:
  - Problem framing before service presentation
  - Visual placeholder support via skeleton image block

### 4) Solution Section

- Markup anchor: `#solution`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/skeleton.css`
- Responsibilities:
  - Position service promise and CTA transition into conversion flow
  - Visual placeholder support via skeleton image block

### 5) Services Grid

- Markup anchor: `#services`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/components.css`
- Responsibilities:
  - Present service scope and pricing entry points

### 6) Why Us Grid

- Markup anchor: `#why-us`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/components.css`
- Responsibilities:
  - Communicate differentiators (speed, warranty, trust)

### 7) Pricing Cards

- Markup anchor: `#pricing`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/components.css`
- Responsibilities:
  - Package service types into decision-ready pricing tiers

### 8) Support Section

- Markup anchor: `#support`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/skeleton.css`
- Responsibilities:
  - Team credibility and local service-area narrative
  - Bridge between pricing and social proof content

### 9) Stats Section

- Markup anchor: `#stats`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/components.css`
- Responsibilities:
  - Compact trust metrics and business proof points

### 10) Testimonials

- Markup anchor: `#testimonials`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/components.css`
- Responsibilities:
  - Social proof and conversion confidence

### 11) Final CTA

- Markup anchor: `#final-cta`
- Behavior: reveal animation via `.fade-in`
- Style owners: `src/styles/sections.css`, `src/styles/components.css`
- Responsibilities:
  - Last conversion prompt before FAQ/contact detail review

### 12) FAQ Accordion

- Markup anchor: `#faq`
- Behavior: `initFaqAccordion`, `setFaqItemOpen`
- Style owners: `src/styles/components.css`, `src/styles/sections.css`
- Responsibilities:
  - Single-open accordion interaction
  - ARIA state syncing (`aria-expanded`, `aria-hidden`)

### 13) Contact Form

- Markup anchors: `#contact`, `#contactForm`, `#submitBtn`, `#formSuccess`, `#formFail`
- Behavior: `initContactForm`, `createValidationRules`, `validateField`, `setSubmitLoadingState`
- Style owners: `src/styles/components.css`, `src/styles/sections.css`
- Responsibilities:
  - Client-side validation for required fields
  - Async form submission and loading state
  - Success/failure feedback rendering

### 14) Footer + Dynamic Year

- Markup anchor: `#currentYear`
- Behavior: `setCurrentYear`
- Style owners: `src/styles/sections.css`
- Responsibilities:
  - Brand/support links and legal footer metadata

### 15) Back-to-Top Control

- Markup anchor: `#backToTop`
- Behavior: `initBackToTop`, `initNavbarScroll`
- Style owners: `src/styles/components.css`
- Responsibilities:
  - Contextual visibility after scroll threshold
  - Smooth scroll back to page start

### 16) SEO Metadata and Structured Data

- Markup anchors: `<head>`, JSON-LD script (`type="application/ld+json"`)
- Behavior: static data consumed by crawlers (no runtime JS dependency)
- Owners: `src/index.html` head metadata block
- Responsibilities:
  - Local SEO targeting through localized title/description/OpenGraph values
  - Structured business identity via `MobilePhoneRepairShop` schema
  - Service-area and business contact coherence with visible content

## Quality Coverage Mapping

- Smoke coverage: `tests/e2e/smoke.spec.js`
- Current covered behaviors:
  - Core sections visible on load
  - Year text populated
  - Mobile menu open/close behavior
  - Form validation error rendering
  - Successful form submission path
- Coverage gap examples:
  - FAQ interaction behavior not currently asserted
  - Back-to-top button visibility/behavior not currently asserted
