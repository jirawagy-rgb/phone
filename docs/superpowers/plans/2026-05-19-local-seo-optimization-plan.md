# Lokální SEO optimalizace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimalizovat texty a technické nastavení landing page SNAP pro lokální vyhledávání (SEO) se zaměřením na Nový Bor a okolní spádová města (Česká Lípa, Cvikov, atd.).

**Architecture:** Statické HTML úpravy v `src/index.html` zahrnující optimalizaci meta tagů, H1, textů, přidání JSON-LD strukturovaných dat typu `MobilePhoneRepairShop` a aktivních odkazů na Google Maps pro lepší relevanci vyhledávačů.

**Tech Stack:** HTML5, JSON-LD, Playwright (smoke tests), ESLint / HTMLHint (linting).

---

### Task 1: Optimalizace meta tagů v `<head>` a přidání JSON-LD strukturovaných dat

**Files:**
- Modify: `src/index.html:3-15`

- [ ] **Step 1: Upravit metadata v hlavičce a přidat skript se strukturovanými daty**

Modify `src/index.html` by replacing the `<head>` section with the following optimized SEO metadata and JSON-LD markup:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Profesionální servis a oprava telefonů v Novém Boru. Rychlá výměna displeje, baterie a záchrana telefonů do 60 minut. Pro celou Českou Lípu, Cvikov a okolí." />
  <meta property="og:title" content="Rychlý servis a oprava telefonů Nový Bor | SNAP" />
  <meta property="og:description" content="Profesionální servis telefonů v Novém Boru a okolí. Rychlé opravy se zárukou." />
  <meta property="og:type" content="website" />
  <title>Rychlý servis a oprava telefonů Nový Bor | SNAP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles/styles.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MobilePhoneRepairShop",
    "name": "SNAP — Rychlý servis a oprava telefonů",
    "image": "https://snapservis.netlify.app/img/logo-icon.png",
    "@id": "https://snapservis.netlify.app/#organization",
    "url": "https://snapservis.netlify.app",
    "telephone": "+420722190905",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Alšova 815",
      "addressLocality": "Nový Bor",
      "postalCode": "473 01",
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.759247,
      "longitude": 14.557434
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Nový Bor"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Česká Lípa"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Cvikov"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Kamenický Šenov"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Varnsdorf"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Česká Kamenice"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/snapservis"
    ]
  }
  </script>
</head>
```

- [ ] **Step 2: Spustit linery pro ověření validity**

Run command in root directory:
`npm run lint`

Expected output: Command passes without HTMLHint syntax errors.

- [ ] **Step 3: Commit změn**

```bash
git add src/index.html
git commit -m "seo: optimize head metadata and add localbusiness json-ld schema"
```

---

### Task 2: Optimalizace hlavního nadpisu H1 a podnadpisu v sekci Hero

**Files:**
- Modify: `src/index.html:43-52`

- [ ] **Step 1: Upravit nadpis H1 a text v Hero sekci**

Modify lines `43-52` in `src/index.html` to inject localized search keywords:

```html
      <div class="hero__badge">⚡ Opravy v den příjmu k dispozici</div>
      <h1 class="hero__title">
        Rychlý servis telefonů<br />
        <span class="gradient-text">v Novém Boru</span>
      </h1>
      <p class="hero__subtitle">
        Prasklý displej? Vybitá baterie? Poškození vodou? Přineste svůj telefon k nám do Nového Boru. Opravujeme iPhone, Samsung, Xiaomi a další značky. Většina oprav hotova do 60 minut — ideální i pro zákazníky z České Lípy, Cvikova a okolí.
      </p>
```

- [ ] **Step 2: Spustit lintery**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit změn**

```bash
git add src/index.html
git commit -m "seo: optimize H1 heading and hero paragraph with local terms"
```

---

### Task 3: Optimalizace textu v sekci O nás (Support)

**Files:**
- Modify: `src/index.html:265-271`

- [ ] **Step 1: Upravit text o týmu a spádovém okolí**

Modify lines `265-271` in `src/index.html` to read:

```html
      <div class="support__content fade-in">
        <span class="section-tag">Náš tým</span>
        <h2>Poznejte svůj podpůrný tým</h2>
        <p>Naši zkušení technici v Novém Boru jsou zde, aby vám pomohli. Poskytujeme spolehlivý servis mobilních telefonů pro zákazníky z celého Českolipska.</p>
      </div>
```

- [ ] **Step 2: Spustit lintery**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Commit změn**

```bash
git add src/index.html
git commit -m "seo: localize team support section description"
```

---

### Task 4: Propojení adresy s Google Maps a zobrazení spádové oblasti v Kontaktu a Patičce

**Files:**
- Modify: `src/index.html:410-424`, `src/index.html:509-514`

- [ ] **Step 1: Přidat Google Maps link a oblast pokrytí do sekce Kontakt**

Modify lines `410-424` in `src/index.html` to wrap address in a link and include spádová oblast:

```html
        <div class="contact__details">
          <div class="contact-detail">
            <span class="contact-detail__icon">📍</span>
            <div><strong>Adresa</strong><span><a href="https://maps.google.com/?q=SNAP+Al%C5%A1ova+815+Nov%C3%BD+Bor" target="_blank" rel="noopener">Alšova 815, 473 01 Nový Bor</a></span></div>
          </div>
          <div class="contact-detail">
            <span class="contact-detail__icon">📞</span>
            <div><strong>Telefon</strong><span><a href="tel:+420722190905">+420 722 190 905</a></span></div>
          </div>
          <div class="contact-detail">
            <span class="contact-detail__icon">🕐</span>
            <div><strong>Otevírací doba</strong><span>Po–Ne: 8:00–20:00</span></div>
          </div>
          <div class="contact-detail">
            <span class="contact-detail__icon">✉️</span>
            <div><strong>E-mail</strong><span><a href="mailto:info@snap-servis.cz">info@snap-servis.cz</a></span></div>
          </div>
          <div class="contact-detail" style="margin-top: 1.5rem; opacity: 0.85; font-size: 0.9rem;">
            <div><strong>Oblast pokrytí</strong><span>Nový Bor, Česká Lípa, Cvikov, Kamenický Šenov, Varnsdorf, Česká Kamenice</span></div>
          </div>
        </div>
```

- [ ] **Step 2: Přidat Google Maps link a spádovou oblast do patičky**

Modify lines `509-514` in `src/index.html` to map the footer address:

```html
      <div class="footer__contact">
        <h4>Kde nás najdete</h4>
        <p><a href="https://maps.google.com/?q=SNAP+Al%C5%A1ova+815+Nov%C3%BD+Bor" target="_blank" rel="noopener">Alšova 815<br />473 01 Nový Bor</a></p>
        <p><a href="tel:+420722190905">+420 722 190 905</a></p>
        <p style="font-size: 0.8rem; opacity: 0.7; margin-top: 0.5rem;">Spádová oblast: Nový Bor, Česká Lípa, Cvikov, Kamenický Šenov, Varnsdorf, Česká Kamenice</p>
        <div class="footer__social">
```

- [ ] **Step 3: Spustit lintery**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit změn**

```bash
git add src/index.html
git commit -m "seo: wrap physical address in google maps link and document area served in contact/footer"
```

---

### Task 5: Finální testování a validace celého řešení

**Files:**
- Test: `tests/e2e/smoke.spec.js`

- [ ] **Step 1: Spustit lokální smoke testy pro ověření funkčnosti**

Run: `npm run check` (spustí lintery i Playwright testy)

Expected output: Všechny kontroly (ESLint, HTMLHint, Stylelint) projdou a všechny 4 smoke testy v Playwrightu úspěšně dokončí běh.

- [ ] **Step 2: Vytvořit finální commit**

```bash
git commit --allow-empty -m "seo: complete local SEO optimizations for Novy Bor"
```
