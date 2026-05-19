# Specifikace návrhu: Lokální SEO optimalizace pro SNAP (Nový Bor)

Tento dokument detailně popisuje změny a optimalizační kroky pro zvýšení organické viditelnosti lokálního servisu mobilních telefonů **SNAP** ve vyhledávačích (Google, Seznam). 

## 1. Cíle a úspěšná kritéria
* **Cíl:** Zvýšit pozice webu v lokálním vyhledávání pro klíčová slova jako „servis telefonů Nový Bor“, „oprava displeje Nový Bor“ a oslovit zákazníky ze spádových oblastí.
* **Geografické zacílení:** Primárně **Nový Bor**, sekundárně **Česká Lípa, Cvikov, Kamenický Šenov, Varnsdorf, Česká Kamenice**.
* **Rozsah služeb:** Výhradně **servis mobilních telefonů** (displeje, baterie, poškození vodou, fotoaparáty, nabíjení, reproduktory).
* **Úspěšná kritéria:** 
  1. Validní HTML5 kód bez syntaktických chyb (úspěšný průchod `htmlhint`).
  2. Validní JSON-LD strukturovaná data bez chyb (ověřitelné přes Google Rich Results Test).
  3. Plně funkční a responzivní prokliky na navigaci (Google Maps).
  4. Úspěšný průchod všech smoke testů (`npm run test:smoke`).

---

## 2. On-Page optimalizace (Metadata a Copywriting)

### 2.1 Změny v `<head>` (Metadata)
Upravíme meta tagy, které se zobrazují přímo ve výsledcích vyhledávání.

* **Titulek stránky (`<title>`)**
  * *Původní:* `<title>SNAP — Experti na opravu telefonů</title>`
  * *Nový:* `<title>Rychlý servis a oprava telefonů Nový Bor | SNAP</title>`
* **Popisek stránky (`<meta name="description">`)**
  * *Původní:* `<meta name="description" content="Rychlý a levný servis telefonů. Výměna displeje, baterie, oprava poškození vodou — opraveno v den příjmu. Přijďte i bez objednání." />`
  * *Nový:* `<meta name="description" content="Profesionální servis a oprava telefonů v Novém Boru. Rychlá výměna displeje, baterie a záchrana telefonů do 60 minut. Pro celou Českou Lípu, Cvikov a okolí." />`
* **OpenGraph titulek (`<meta property="og:title">`)**
  * *Původní:* `<meta property="og:title" content="SNAP — Experti na opravu telefonů" />`
  * *Nový:* `<meta property="og:title" content="Rychlý servis a oprava telefonů Nový Bor | SNAP" />`
* **OpenGraph popisek (`<meta property="og:description">`)**
  * *Původní:* `<meta property="og:description" content="Váš telefon opravíme rychle. Opravy v den příjmu, záruka v ceně." />`
  * *Nový:* `<meta property="og:description" content="Profesionální servis telefonů v Novém Boru a okolí. Rychlé opravy se zárukou." />`

### 2.2 Nadpis H1 (Hero sekce)
Hlavní nadpis získá silný lokální a vyhledávací kontext.

* *Původní:*
  ```html
  <h1 class="hero__title">
    Váš telefon,<br />
    <span class="gradient-text">Opraven rychle.</span>
  </h1>
  ```
* *Nový:*
  ```html
  <h1 class="hero__title">
    Rychlý servis telefonů<br />
    <span class="gradient-text">v Novém Boru</span>
  </h1>
  ```

### 2.3 Úpravy textů (Copy)

* **Hero Subtitle (Podnadpis v úvodu):**
  * *Původní:* `Prasklý displej? Vybitá baterie? Poškození vodou? Opravujeme všechny hlavní značky — iPhone, Samsung, Xiaomi a další. Většina oprav hotova do 60 minut.`
  * *Nový:* `Prasklý displej? Vybitá baterie? Poškození vodou? Přineste svůj telefon k nám do Nového Boru. Opravujeme iPhone, Samsung, Xiaomi a další značky. Většina oprav hotova do 60 minut — ideální i pro zákazníky z České Lípy, Cvikova a okolí.`
* **Sekce O nás / Tým (Support):**
  * *Původní:* `Naši zkušení technici jsou zde, aby vám pomohli. Věříme v transparentní komunikaci a špičkový servis.`
  * *Nový:* `Naši zkušení technici v Novém Boru jsou zde, aby vám pomohli. Poskytujeme spolehlivý servis mobilních telefonů pro zákazníky z celého Českolipska.`
* **Sekce Kontakt & Patička (Oblast působení):**
  * Do obou sekcí pod adresu přidáme seznam obsluhovaných spádových měst.
  * *Nový text:* `Oblast pokrytí: Nový Bor, Česká Lípa, Cvikov, Kamenický Šenov, Varnsdorf, Česká Kamenice.`

---

## 3. Technická lokální optimalizace (Strukturovaná data)

### 3.1 JSON-LD Schema.org (`MobilePhoneRepairShop`)
Do `<head>` vložíme validní JSON-LD skript reprezentující profil lokální provozovny.

```html
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
```

### 3.2 Propojení adresy s navigací Google Maps
Adresu na obou místech stránky zabalíme do odkazu na Google Maps:
`https://maps.google.com/?q=SNAP+Al%C5%A1ova+815+Nov%C3%BD+Bor` s atributy `target="_blank"` a `rel="noopener"`.

---

## 4. Testovací strategie
1. **Lokalita & Kód:**
   * Ověření chyb v HTML kódu spuštěním `npm run lint`.
2. **Konzistentnost smoke testů:**
   * Ujistit se, že žádné změny v textu nerozbily Playwright smoke testy (např. pokud testy kontrolují konkrétní texty jako "Váš telefon," v H1). 
   * *Poznámka:* Pokud smoke testy selžou kvůli změně textu, odpovídajícím způsobem upravíme selektory nebo očekávané texty v testovacích skriptech (`tests/e2e/smoke.spec.js`).
