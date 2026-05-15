# 🚀 Phase 3 — Deployment Guide

## Recommended: Deploy with Netlify (Free, SSL included)

Netlify is the easiest way to host a static landing page.
You get a real URL, automatic HTTPS, and form handling — all free.

---

## Step 1 — Sign Up

Go to <https://netlify.com> and create a free account.

---

## Step 2 — Deploy Your Site

### Option A: Drag & Drop (Easiest — 60 seconds)
1. Go to https://app.netlify.com/drop
2. Drag your entire `PhoneRepairLanding/` folder onto the page
3. Netlify gives you a live URL instantly (e.g. `https://amazing-tesla-123.netlify.app`)
4. Done. Your site is live with HTTPS.

### Option B: GitHub (Recommended for updates)
1. Push your folder to a GitHub repository
2. In Netlify → "Add new site" → "Import from Git"
3. Connect GitHub, select your repo
4. Build settings: leave blank (no build command needed for plain HTML)
5. Click Deploy
6. Every time you push to GitHub, site auto-updates

---

## Step 3 — Custom Domain (Optional)
1. In Netlify → Site Settings → Domain Management → Add custom domain
2. Enter your domain (e.g. `fixitpro.com`)
3. Update your domain's DNS nameservers to Netlify's (shown in the dashboard)
4. Netlify auto-provisions a free SSL certificate via Let's Encrypt
5. Wait up to 48h for DNS propagation (usually under 1 hour)

---

## Step 4 — Enable Contact Form

### Option A: Netlify Forms (Zero backend needed)
Add these attributes to your `<form>` tag in `index.html`:

```html
<form data-netlify="true" name="contact" method="POST" ...>
  <input type="hidden" name="form-name" value="contact" />
  <!-- rest of your form -->
</form>
```

Then in Netlify → Forms, you'll see all submissions.
You can also set up email notifications.

In `script.js`, replace the simulated fetch with:
```js
const res = await fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(new FormData(form)).toString(),
});
if (!res.ok) throw new Error('Submit failed');
```

### Option B: Formspree (works anywhere, not just Netlify)
1. Go to https://formspree.io and create a free account
2. Create a new form → copy your endpoint URL
3. In `index.html`, set: `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
4. Remove the JS fetch simulation — Formspree handles submission + redirect

---

## Step 5 — Analytics (Optional but recommended)

### Google Analytics 4
1. Go to https://analytics.google.com → Create property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add before `</head>` in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Step 6 — Performance Checklist

Run a Lighthouse audit before launch:
1. Open Chrome DevTools → Lighthouse tab
2. Run audit on your live URL
3. Target scores: Performance 90+, Accessibility 95+, SEO 90+

Quick wins:
- [ ] Add `loading="lazy"` to any `<img>` tags you add later
- [ ] Compress images to WebP format (use https://squoosh.app)
- [ ] Add a `<link rel="canonical" href="https://yourdomain.com" />` in head
- [ ] Fill in real business address/phone in `index.html`
- [ ] Replace placeholder testimonials with real customer quotes
- [ ] Add real logo image instead of emoji

---

## Step 7 — Google Search Console
1. Go to https://search.google.com/search-console
2. Add your domain property
3. Verify ownership (Netlify makes this easy via DNS TXT record)
4. Submit sitemap (for a single-page site, just submit your homepage URL)

---

## 📋 Pre-Launch Checklist

- [ ] Replace all placeholder text (business name, address, phone, email)
- [ ] Test contact form — submit and receive confirmation
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] All navigation links work
- [ ] SSL shows green padlock in browser
- [ ] Google Analytics tracking fires (check Realtime in GA4)
- [ ] Meta description is filled in (for Google search preview)

---

## Files to Customize Before Launch

| File | What to Change |
|------|---------------|
| `index.html` | Business name, address, phone, email, hours |
| `index.html` | Testimonial names and quotes |
| `index.html` | Service prices (from $XX) |
| `styles.css` | Brand colors if needed (--color-primary) |
| `DEPLOYMENT.md` | You can delete this file before deploying |
