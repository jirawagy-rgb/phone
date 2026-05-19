# ADR 0006: Local SEO Metadata and Structured Data

- Status: Accepted
- Date: 2026-05-19

## Context

The page targets local lead generation for phone repair services in Novy Bor and nearby towns.
Generic metadata and non-localized copy reduced relevance for local search intent.
The project also needed machine-readable business data for search engines without introducing backend complexity.

## Decision

Adopt a static, HTML-first local SEO strategy in `src/index.html`:

- Localize metadata (`title`, `meta description`, `og:title`, `og:description`) for Novy Bor and nearby areas
- Add `MobilePhoneRepairShop` JSON-LD structured data in `<head>`
- Include service-area cues in visible copy (hero, support, contact, footer)
- Link address blocks to Google Maps for direct navigation intent

## Consequences

### Positive

- Better alignment with local search queries and location intent
- Structured business data is available to crawlers without runtime services
- Changes remain in static content and fit existing deployment/hosting model

### Negative

- Business details are duplicated across visible copy and JSON-LD and can drift
- SEO quality depends on manual governance of text, schema, and contact details
- Social metadata coverage remains basic (for example no dedicated `og:image`)

## Follow-up Triggers

Revisit this decision if:

- Business profile data changes frequently enough to require centralized config
- Multiple locality-specific landing pages are introduced
- Search console or analytics show weak rich-result or local pack performance
