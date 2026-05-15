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

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    backToTopBtn.classList.toggle("visible", window.scrollY > 400);

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

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-controls", "navLinks");

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    navLinksMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinksMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinksMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

function initRevealAnimations() {
  const fadeNodes = document.querySelectorAll(".fade-in");
  if (!fadeNodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const siblings = entry.target.parentElement.querySelectorAll(".fade-in");
        siblings.forEach((element, index) => {
          const delay = index * 80;
          setTimeout(() => element.classList.add("visible"), delay);
        });

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  fadeNodes.forEach((node) => observer.observe(node));
}

function initFaqAccordion() {
  document.querySelectorAll(".faq-item__question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("open");
        faqItem
          .querySelector(".faq-item__question")
          .setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
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
  const value = rule.el.value;
  const valid = rule.test(value);

  rule.err.textContent = valid ? "" : rule.msg;
  rule.el.classList.toggle("error", !valid);

  return valid;
}

function setSubmitLoadingState(submitBtn, isLoading) {
  const buttonText = submitBtn.querySelector(".btn-text");
  const buttonSpinner = submitBtn.querySelector(".btn-spinner");

  buttonText.hidden = isLoading;
  buttonSpinner.hidden = !isLoading;
  submitBtn.disabled = isLoading;
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const success = document.getElementById("formSuccess");
  const fail = document.getElementById("formFail");

  if (!form || !submitBtn || !success || !fail) return;

  const rules = createValidationRules();

  Object.keys(rules).forEach((key) => {
    rules[key].el.addEventListener("blur", () => validateField(rules, key));
    rules[key].el.addEventListener("input", () => {
      if (rules[key].el.classList.contains("error")) {
        validateField(rules, key);
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const allValid = Object.keys(rules)
      .map((key) => validateField(rules, key))
      .every(Boolean);

    if (!allValid) return;

    success.hidden = true;
    fail.hidden = true;
    setSubmitLoadingState(submitBtn, true);

    try {
      const payload = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
      });

      if (!response.ok) throw new Error("Server error");

      success.hidden = false;
      form.reset();
      Object.keys(rules).forEach((key) => rules[key].el.classList.remove("error"));
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
