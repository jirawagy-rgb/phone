# Homepage Section Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přestavět `src/index.html` na sekční strukturu podle wireframe mapy a zachovat funkční, responzivní homepage s automatickými smoke testy.

**Architecture:** Zachováme stávající statický web (HTML + modulární CSS + lehký vanilla JS). Obsah a strukturu sekcí přesuneme na nové ID/class názvy odvozené z wireframu. Testy přepíšeme tak, aby ověřovaly novou strukturu, pořadí sekcí, klíčová CTA a mobilní stack.

**Tech Stack:** HTML5, CSS (modulární soubory v `src/styles`), vanilla JavaScript (`src/js/main.js`), Playwright (`tests/e2e`), npm scripts.

---

## Scope Check

Specifikace je jeden subsystem: struktura homepage sekcí. Není nutné dělit do více plánů.

Poznámka k názvu vstupu: v repozitáři je dostupný soubor `output/homepage-section-map.md` (obsah wireframe sekcí). Tento plán ho používá jako zdroj pro požadovaný „homepage-section-wireframe.md“.

## File Structure

- Modify: `src/index.html`
  - Nová sekční kostra stránky (header, hero, problem, solution, offer, about, stats, testimonials, final CTA, footer).
- Modify: `src/styles/base.css`
  - Tokeny barev/typografie a globální utility kompatibilní s wireframe stylem.
- Modify: `src/styles/layout.css`
  - Hlavička, hero blok, obecné split layouty.
- Modify: `src/styles/sections.css`
  - Layout jednotlivých sekcí a gridy (benefits, nabídka, statistiky, recenze).
- Modify: `src/styles/components.css`
  - Karty, CTA bloky, quote card, malé komponenty.
- Modify: `src/styles/responsive.css`
  - Mobilní pořadí/stacking podle mobilní varianty.
- Modify: `src/js/main.js`
  - Udržet jen behavior, který má oporu v novém HTML (menu toggle, smooth scroll, year, back-to-top).
- Modify: `tests/e2e/smoke.spec.js`
  - Smoke testy přepsat na novou sekční strukturu.
- Optional Modify: `docs/components/component-catalog.md`
  - Stručná aktualizace názvů sekcí/komponent po implementaci.

### Task 1: Připravit testy pro novou sekční strukturu (TDD start)

**Files:**
- Modify: `tests/e2e/smoke.spec.js`
- Test: `tests/e2e/smoke.spec.js`

- [ ] **Step 1: Napsat failující smoke testy pro nové sekce a CTA**

```js
const { test, expect } = require('@playwright/test');

test.describe('Homepage section wireframe smoke', () => {
  test('renders all required sections in expected order', async ({ page }) => {
    await page.goto('/');

    const expectedOrder = [
      '#intro',
      '#header-panel',
      '#hero',
      '#problem',
      '#solution',
      '#offer',
      '#about-trust',
      '#results',
      '#testimonials',
      '#final-cta'
    ];

    for (const selector of expectedOrder) {
      await expect(page.locator(selector)).toBeVisible();
    }

    const sectionIds = await page.locator('main section[id]').evaluateAll((nodes) =>
      nodes.map((node) => `#${node.id}`)
    );

    expect(sectionIds.slice(0, expectedOrder.length)).toEqual(expectedOrder);
  });

  test('has primary CTA in hero and final CTA block', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#hero .cta-primary')).toBeVisible();
    await expect(page.locator('#final-cta .cta-primary')).toBeVisible();
  });

  test('renders 3 offer cards and 4 stats items', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#offer .offer-card')).toHaveCount(3);
    await expect(page.locator('#results .stat-item')).toHaveCount(4);
  });
});
```

- [ ] **Step 2: Spustit testy a ověřit, že selžou**

Run: `npm run test:smoke -- --grep "Homepage section wireframe smoke"`
Expected: FAIL, např. `locator('#intro')` nenalezen.

- [ ] **Step 3: Commit pouze testů**

```bash
git add tests/e2e/smoke.spec.js
git commit -m "test: add failing smoke tests for homepage section wireframe"
```

### Task 2: Implementovat novou HTML sekční kostru

**Files:**
- Modify: `src/index.html`
- Test: `tests/e2e/smoke.spec.js`

- [ ] **Step 1: Přepsat `main` strukturu a ID sekcí tak, aby odpovídaly wireframe**

```html
<main class="page-shell">
  <section id="intro" class="section intro-section">
    <div class="container">
      <h1>Homepage</h1>
      <p>Domovská stránka je rozcestník, který návštěvníka vede na správné podstránky.</p>
    </div>
  </section>

  <section id="header-panel" class="section header-panel-section">
    <div class="container">
      <header id="navbar" class="site-header">
        <div class="top-contact-bar">
          <a href="tel:+420111222333">+420 111 222 333</a>
          <a href="mailto:hello@mail.cz">hello@mail.cz</a>
        </div>
        <div class="main-nav-row">
          <a href="#hero" class="brand">websie</a>
          <button id="hamburger" class="hamburger" aria-label="Toggle navigation" aria-controls="navLinks" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <nav id="navLinks" class="main-nav" aria-label="Primary navigation">
            <a href="#offer">Služby</a>
            <a href="#testimonials">Recenze</a>
            <a href="#about-trust">O nás</a>
            <a href="#footer">Kontakt</a>
            <a href="#final-cta" class="cta-primary">Strategická konzultace ZDARMA</a>
          </nav>
        </div>
      </header>
    </div>
  </section>

  <section id="hero" class="section hero-section">
    <div class="container">
      <h2>Pomůžeme vám dosáhnout vašeho vytouženého cíle pomocí naší unikátní služby</h2>
      <p>Krátký podnadpis s konkrétním přínosem pro klienta.</p>
      <a href="#final-cta" class="cta-primary">Strategická konzultace ZDARMA</a>
      <ul class="benefits-bar">
        <li>245+ spokojených klientů</li>
        <li>5+ let praxe</li>
        <li>Odevzdání do 2 měsíců</li>
        <li>Úvodní konzultace zdarma</li>
      </ul>
    </div>
  </section>

  <section id="problem" class="section problem-section"></section>
  <section id="solution" class="section solution-section"></section>
  <section id="offer" class="section offer-section"></section>
  <section id="about-trust" class="section about-trust-section"></section>
  <section id="results" class="section results-section"></section>
  <section id="testimonials" class="section testimonials-section"></section>
  <section id="final-cta" class="section final-cta-section"></section>
</main>
<footer id="footer" class="site-footer">
  <span id="currentYear"></span>
</footer>
<button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>
```

- [ ] **Step 2: Doplnit obsah prázdných sekcí (`problem`, `solution`, `offer`, `about-trust`, `results`, `testimonials`, `final-cta`)**

```html
<section id="offer" class="section offer-section">
  <div class="container">
    <h2>Zde je řešení na vaše problémy</h2>
    <div class="offer-grid">
      <article class="offer-card">
        <div class="offer-card__media" aria-hidden="true"></div>
        <h3>Levná služba</h3>
        <p>Krátký popis nabídky.</p>
        <a href="#final-cta">Chci vědět více</a>
      </article>
      <article class="offer-card">
        <div class="offer-card__media" aria-hidden="true"></div>
        <h3>Oblíbená služba</h3>
        <p>Krátký popis nabídky.</p>
        <a href="#final-cta">Chci vědět více</a>
      </article>
      <article class="offer-card">
        <div class="offer-card__media" aria-hidden="true"></div>
        <h3>Drahá služba</h3>
        <p>Krátký popis nabídky.</p>
        <a href="#final-cta">Chci vědět více</a>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Spustit smoke testy a ověřit, že struktura prochází (styly ještě nemusí)**

Run: `npm run test:smoke -- --grep "Homepage section wireframe smoke"`
Expected: PASS všech 3 testů z Task 1.

- [ ] **Step 4: Commit HTML změn**

```bash
git add src/index.html
git commit -m "feat: implement homepage wireframe section skeleton in index"
```

### Task 3: Implementovat desktop styly sekcí do modulárního CSS

**Files:**
- Modify: `src/styles/base.css`
- Modify: `src/styles/layout.css`
- Modify: `src/styles/sections.css`
- Modify: `src/styles/components.css`
- Test: `tests/e2e/smoke.spec.js`

- [ ] **Step 1: Upravit tokeny a globální kontejner pro světlý wireframe layout v `base.css`**

```css
:root {
  --color-bg: #ececec;
  --color-surface: #f7f7f7;
  --color-card: #ffffff;
  --color-ink: #1f1f1f;
  --color-muted: #6f6f6f;
  --color-line: #d8d8d8;
  --color-accent: #3550f2;
  --radius-md: 14px;
  --radius-lg: 22px;
  --shadow-card: 0 6px 20px rgba(15, 15, 15, 0.08);
}

body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-ink);
  line-height: 1.5;
}

.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 56px 0;
  border-bottom: 1px solid var(--color-line);
}
```

- [ ] **Step 2: Dodat layout pravidla pro header/hero/split v `layout.css`**

```css
.page-shell {
  max-width: 1120px;
  margin: 42px auto;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
}

.site-header {
  background: var(--color-card);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.top-contact-bar {
  min-height: 34px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 18px;
  background: #efefef;
  border-bottom: 1px solid var(--color-line);
}

.main-nav-row {
  min-height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
}

.hero-section h2 {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
  color: var(--color-accent);
  text-align: center;
  max-width: 900px;
  margin: 0 auto 14px;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  align-items: center;
}
```

- [ ] **Step 3: Přidat sekční gridy v `sections.css` a karty v `components.css`**

```css
/* src/styles/sections.css */
.benefits-bar {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.offer-grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.results-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.testimonials-grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
```

```css
/* src/styles/components.css */
.cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 12px 24px;
  border-radius: 10px;
  background: var(--color-accent);
  color: #fff;
  font-weight: 700;
}

.offer-card,
.stat-item,
.quote-card,
.benefits-bar li {
  background: var(--color-card);
  border: 1px solid var(--color-line);
  border-radius: 12px;
  padding: 14px;
}

.offer-card__media {
  height: 150px;
  border-radius: 10px;
  background: #efefef;
  border: 1px solid var(--color-line);
  margin-bottom: 10px;
}
```

- [ ] **Step 4: Spustit lint a smoke testy**

Run: `npm run check`
Expected: PASS (`lint:js`, `lint:css`, `lint:html`, `test:smoke`).

- [ ] **Step 5: Commit CSS změn**

```bash
git add src/styles/base.css src/styles/layout.css src/styles/sections.css src/styles/components.css
git commit -m "feat: style homepage sections to match wireframe layout"
```

### Task 4: Mobilní variantu promítnout do responzivních pravidel

**Files:**
- Modify: `src/styles/responsive.css`
- Test: `tests/e2e/smoke.spec.js`

- [ ] **Step 1: Přidat mobilní pravidla pro stacking sekcí a menu**

```css
@media (width <= 900px) {
  .benefits-bar,
  .offer-grid,
  .results-grid,
  .testimonials-grid,
  .split-layout {
    grid-template-columns: 1fr;
  }

  .main-nav {
    display: none;
    position: fixed;
    inset: 72px 0 0 0;
    background: var(--color-surface);
    padding: 20px;
    flex-direction: column;
    gap: 14px;
    border-top: 1px solid var(--color-line);
  }

  .main-nav.open {
    display: flex;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
```

- [ ] **Step 2: Rozšířit smoke test o mobilní stack kontrolu**

```js
test('mobile layout stacks offer cards into a single column', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const cards = page.locator('#offer .offer-card');
  await expect(cards).toHaveCount(3);

  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  const third = await cards.nth(2).boundingBox();

  expect(first && second && third).toBeTruthy();
  expect(second.y).toBeGreaterThan(first.y);
  expect(third.y).toBeGreaterThan(second.y);
});
```

- [ ] **Step 3: Spustit cíleně mobilní test**

Run: `npm run test:smoke -- --grep "mobile layout stacks offer cards"`
Expected: PASS.

- [ ] **Step 4: Commit responzivních změn**

```bash
git add src/styles/responsive.css tests/e2e/smoke.spec.js
git commit -m "feat: add mobile-first stacking for homepage wireframe sections"
```

### Task 5: Zarovnat JS behavior s novým markupem

**Files:**
- Modify: `src/js/main.js`
- Test: `tests/e2e/smoke.spec.js`

- [ ] **Step 1: Odstranit form/FAQ init, který už nemá oporu v novém HTML**

```js
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('#navLinks a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const currentYear = document.getElementById('currentYear');
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('navLinks');
  const backToTopBtn = document.getElementById('backToTop');

  setCurrentYear(currentYear);
  initNavbarScroll(navbar, navLinks, sections, backToTopBtn);
  initMobileMenu(hamburger, navLinksMenu);
  initRevealAnimations();
  initBackToTop(backToTopBtn);
  initSmoothScroll(navbar);
});
```

- [ ] **Step 2: Přidat test pro mobilní menu open/close v novém markupu**

```js
test('mobile menu toggles using hamburger and Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const hamburger = page.locator('#hamburger');
  const nav = page.locator('#navLinks');

  await hamburger.click();
  await expect(nav).toHaveClass(/open/);
  await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Escape');
  await expect(nav).not.toHaveClass(/open/);
  await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
});
```

- [ ] **Step 3: Spustit JS lint a smoke testy**

Run: `npm run lint:js && npm run test:smoke`
Expected: PASS.

- [ ] **Step 4: Commit JS změn**

```bash
git add src/js/main.js tests/e2e/smoke.spec.js
git commit -m "refactor: align homepage interactions with new section layout"
```

### Task 6: Dokumentace a finální kontrola

**Files:**
- Modify: `docs/components/component-catalog.md`
- Test: `npm run check`

- [ ] **Step 1: Zapsat nové komponenty/sekce do katalogu**

```md
## Homepage Wireframe Sections

- `intro-section`
- `header-panel-section`
- `hero-section`
- `problem-section`
- `solution-section`
- `offer-section` (`offer-card` x3)
- `about-trust-section`
- `results-section` (`stat-item` x4)
- `testimonials-section` (`quote-card` grid)
- `final-cta-section`
- `site-footer`
```

- [ ] **Step 2: Spustit finální quality gate**

Run: `npm run check`
Expected: PASS bez lint/test chyb.

- [ ] **Step 3: Commit dokumentace**

```bash
git add docs/components/component-catalog.md
git commit -m "docs: update component catalog for homepage wireframe section architecture"
```

## Self-Review

1. **Spec coverage:**
- Úvodní popis homepage: Task 2 (`#intro`).
- Hlavička + informační panel: Task 2 + Task 3 (`#header-panel`, `site-header`).
- Hlavní nadpis/podnadpis/CTA: Task 2 + Task 3 (`#hero`, `.cta-primary`).
- Benefit bar: Task 2 + Task 3 (`.benefits-bar`, 4 položky).
- Popis problému: Task 2 (`#problem`, split layout).
- Nabídka řešení: Task 2 (`#solution`).
- Nabídka služeb (3 karty): Task 2 + Task 3 + testy Task 1.
- Představení týmu/důvěra: Task 2 (`#about-trust`).
- Pochlubení čísly: Task 2 + Task 3 (`#results`, `.stat-item`).
- Vodopád recenzí: Task 2 + Task 3 (`#testimonials`, `.quote-card`).
- Finální výzva k akci: Task 2 + testy Task 1 (`#final-cta`).
- Patička: Task 2 (`#footer`).

2. **Placeholder scan:**
- V plánu nejsou `TODO`, `TBD` ani „similar to“. Každý kódový krok má konkrétní snippet a příkaz.

3. **Type consistency:**
- ID a class jména jsou konzistentní mezi HTML, CSS a Playwright testy (`#offer`, `.offer-card`, `.cta-primary`, `#final-cta`).

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-18-homepage-section-structure.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
