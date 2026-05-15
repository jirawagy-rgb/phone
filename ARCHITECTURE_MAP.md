# PhoneRepairLanding - Architecture Map

## 1) Folder Structure
```text
PhoneRepairLanding/
├── index.html
├── styles.css
├── script.js
├── landing-page-progress.md
└── DEPLOYMENT.md
```

## 2) Main Modules

### `index.html` (Structure Layer)
- Defines all visual sections and semantic layout.
- Exposes IDs/classes consumed by CSS and JS.
- Loads `styles.css` and `script.js`.

### `styles.css` (Design System + UI Layer)
- Defines design tokens in `:root` (colors, spacing, radius, transitions).
- Implements component styling (navbar, hero, cards, form, footer).
- Controls responsive behavior with breakpoints (`900px`, `680px`, `480px`).

### `script.js` (Behavior Layer)
- Runs after `DOMContentLoaded`.
- Handles navbar state, mobile menu, scroll effects, FAQ accordion, and form validation.
- Depends on specific IDs/classes from `index.html`.

## 3) Connection Map
```text
[User Browser]
     |
     v
 index.html  ------------------------------->  styles.css
 (DOM nodes, IDs, classes)                    (styling + responsive rules)
     |
     | loads
     v
 script.js
 (event listeners + UI logic)
     |
     | reads/writes classes/attrs on DOM
     v
 Visual State Changes
 - .scrolled (navbar)
 - .open (mobile menu, FAQ items)
 - .visible (fade-in, back-to-top)
 - .active (current nav link)
 - .error (invalid form fields)
```

## 4) Section-to-Style-to-Behavior Mapping
```text
Navbar (#navbar, #navLinks, #hamburger)
  -> CSS: .navbar, .navbar.scrolled, .navbar__links.open, .hamburger.open
  -> JS: scroll shrink, active link, mobile toggle, close-on-click

Animated Content (.fade-in)
  -> CSS: .fade-in, .fade-in.visible
  -> JS: IntersectionObserver adds .visible on enter

FAQ (.faq-item, .faq-item__question)
  -> CSS: .faq-item.open, answer max-height transition
  -> JS: accordion open/close + aria-expanded

Contact Form (#contactForm)
  -> CSS: .form-error, input.error, .form-success, .form-fail
  -> JS: validateField(), submit loading state, success/fail messaging

Back To Top (#backToTop)
  -> CSS: .back-to-top.visible
  -> JS: show/hide on scroll + smooth scroll to top
```
