/*
  FixIt Pro — script.js
  P1 refactor: split behavior into focused init functions.
*/

function setCurrentYear(yearNode) {
  if (!yearNode) return;
  yearNode.textContent = String(new Date().getFullYear());
}

function initNavbarScroll(navbar, navLinks, sections, backToTopBtn) {
  if (!navbar || !backToTopBtn) return;
  const hasSectionTracking = navLinks.length > 0 && sections.length > 0;

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    backToTopBtn.classList.toggle("visible", window.scrollY > 400);

    if (!hasSectionTracking) return;

    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMobileMenu(hamburger, navLinksMenu) {
  if (!hamburger || !navLinksMenu) return;

  function setMenuOpen(isOpen) {
    hamburger.classList.toggle("open", isOpen);
    navLinksMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-controls", "navLinks");

  hamburger.addEventListener("click", () => {
    setMenuOpen(!hamburger.classList.contains("open"));
  });

  navLinksMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !hamburger.classList.contains("open")) return;

    setMenuOpen(false);
    hamburger.focus();
  });
}

function initRevealAnimations() {
  const fadeNodes = document.querySelectorAll(".fade-in");
  if (!fadeNodes.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    fadeNodes.forEach((node) => node.classList.add("visible"));
    return;
  }

  const staggeredParents = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const parent = entry.target.parentElement;
        if (parent && !staggeredParents.has(parent)) {
          const siblings = parent.querySelectorAll(".fade-in");
          siblings.forEach((element, index) => {
            const delay = index * 80;
            setTimeout(() => element.classList.add("visible"), delay);
          });
          staggeredParents.add(parent);
        } else {
          entry.target.classList.add("visible");
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  fadeNodes.forEach((node) => observer.observe(node));
}

function setFaqItemOpen(item, isOpen) {
  if (!item) return;

  const button = item.querySelector(".faq-item__question");
  const answer = item.querySelector(".faq-item__answer");

  item.classList.toggle("open", isOpen);
  if (button) {
    button.setAttribute("aria-expanded", String(isOpen));
  }
  if (answer) {
    answer.setAttribute("aria-hidden", String(!isOpen));
  }
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => setFaqItemOpen(item, false));

  document.querySelectorAll(".faq-item__question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");

      faqItems.forEach((faqItem) => setFaqItemOpen(faqItem, false));

      if (!isOpen) {
        setFaqItemOpen(item, true);
      }
    });
  });
}

function initBackToTop(backToTopBtn) {
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initSmoothScroll(navbar) {
  if (!navbar) return;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const offset = navbar.offsetHeight + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
    });
  });
}

function createValidationRules() {
  return {
    name: {
      el: document.getElementById("name"),
      err: document.getElementById("nameError"),
      test: (value) => value.trim().length >= 2,
      msg: "Please enter your full name.",
    },
    phone: {
      el: document.getElementById("phone"),
      err: document.getElementById("phoneError"),
      test: (value) => /^[\d\s+\-()]{7,}$/.test(value.trim()),
      msg: "Enter a valid phone number.",
    },
    device: {
      el: document.getElementById("device"),
      err: document.getElementById("deviceError"),
      test: (value) => value.trim().length >= 3,
      msg: "Please enter your device model.",
    },
    service: {
      el: document.getElementById("service"),
      err: document.getElementById("serviceError"),
      test: (value) => value !== "",
      msg: "Please select a service.",
    },
  };
}

function validateField(rules, key) {
  const rule = rules[key];
  if (!rule || !rule.el || !rule.err) return false;

  const value = rule.el.value;
  const valid = rule.test(value);

  rule.err.textContent = valid ? "" : rule.msg;
  rule.el.classList.toggle("error", !valid);

  return valid;
}

function setSubmitLoadingState(submitBtn, isLoading) {
  if (!submitBtn) return;

  const buttonText = submitBtn.querySelector(".btn-text");
  const buttonSpinner = submitBtn.querySelector(".btn-spinner");

  if (buttonText) {
    buttonText.hidden = isLoading;
  }
  if (buttonSpinner) {
    buttonSpinner.hidden = !isLoading;
  }
  submitBtn.disabled = isLoading;
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const success = document.getElementById("formSuccess");
  const fail = document.getElementById("formFail");

  if (!form || !submitBtn || !success || !fail) return;

  const rules = createValidationRules();
  const ruleKeys = Object.keys(rules);

  ruleKeys.forEach((key) => {
    const input = rules[key].el;
    if (!input) return;

    input.addEventListener("blur", () => validateField(rules, key));
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(rules, key);
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const allValid = ruleKeys
      .map((key) => validateField(rules, key))
      .every(Boolean);

    if (!allValid) return;

    success.hidden = true;
    fail.hidden = true;
    setSubmitLoadingState(submitBtn, true);

    try {
      const payload = new URLSearchParams(new FormData(form)).toString();
      const endpoint = form.getAttribute("action") || "/";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
      });

      if (!response.ok) throw new Error("Server error");

      success.hidden = false;
      form.reset();
      ruleKeys.forEach((key) => {
        const input = rules[key].el;
        if (input) {
          input.classList.remove("error");
        }
      });
    } catch {
      fail.hidden = false;
    } finally {
      setSubmitLoadingState(submitBtn, false);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".navbar__links a:not(.btn--nav)");
  const sections = document.querySelectorAll("section[id]");
  const currentYear = document.getElementById("currentYear");
  const hamburger = document.getElementById("hamburger");
  const navLinksMenu = document.getElementById("navLinks");
  const backToTopBtn = document.getElementById("backToTop");

  setCurrentYear(currentYear);
  initNavbarScroll(navbar, navLinks, sections, backToTopBtn);
  initMobileMenu(hamburger, navLinksMenu);
  initRevealAnimations();
  initFaqAccordion();
  initBackToTop(backToTopBtn);
  initSmoothScroll(navbar);
  initContactForm();
});
