/**
 * Edge Minimal Developers - Interactive Features
 */

(function () {
  "use strict";

  // =========================================
  // Mobile Navigation Toggle
  // =========================================
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("nav-open");
      mobileMenuBtn.classList.toggle("menu-open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a link
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-open");
        mobileMenuBtn.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================================
  // Scroll Reveal Animations
  // =========================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  window.revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        window.revealOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const revealElements = document.querySelectorAll(
    ".feature-card, .project-card, .about-content, .contact-content, .features-header, .projects-header",
  );
  revealElements.forEach((el) => {
    el.classList.add("reveal-on-scroll");
    revealOnScroll.observe(el);
  });

  // =========================================
  // Smooth Header Background on Scroll
  // =========================================
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      if (header) {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }
        lastScroll = currentScroll;
      }
    },
    { passive: true },
  );

  // =========================================
  // Active Navigation Highlight
  // =========================================
  const sections = document.querySelectorAll("section[id]");

  // Determine current page type for navigation highlighting
  // Use more specific path matching to avoid false positives
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').pop() || '';
  const isProjectRelatedPage = pathSegments === 'projects.html' || 
                                pathSegments.startsWith('project-') ||
                                currentPath.endsWith('/projects/');

  // Navigation highlight function (runs on scroll and after header load)
  const highlightNav = () => {
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!navLinks.length) return; // Header not loaded yet
    
    // If on a project-related page, always highlight .projects
    if (isProjectRelatedPage) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const projectsLink = document.querySelector('.nav-links a[data-section="projects"]');
      if (projectsLink) projectsLink.classList.add("active");
      return;
    }
    
    const marker = 140; // header height + breathing room for detection
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

    // If we're at the very bottom, force the last section (contact) to active
    if (nearBottom && sections.length) {
      const lastId = sections[sections.length - 1].getAttribute("id");
      navLinks.forEach((link) => link.classList.remove("active"));
      const navLink = document.querySelector(`.nav-links a[data-section="${lastId}"]`);
      if (navLink) navLink.classList.add("active");
      return;
    }

    // Otherwise, pick the section whose top is closest to (but not greater than) the marker
    let currentId = null;
    let closestTop = -Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= marker && rect.top > closestTop) {
        closestTop = rect.top;
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => link.classList.remove("active"));
    if (currentId) {
      const navLink = document.querySelector(
        `.nav-links a[data-section="${currentId}"]`,
      );
      if (navLink) navLink.classList.add("active");
    }
  };

  // Expose function globally so it can be called after header loads
  window.initNavHighlight = highlightNav;

  window.addEventListener("scroll", highlightNav, { passive: true });
  window.addEventListener("load", highlightNav, { passive: true });
  window.addEventListener("resize", highlightNav, { passive: true });

  // =========================================
  // Advanced Typewriter: mistakes, fixes, final message, loop
  // =========================================
  const heroTagline = document.querySelector(".hero-tagline");
  if (heroTagline) {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const setText = (t) => {
      heroTagline.textContent = t;
    };

    const wrongPool =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]()<>$#@!%&+=-_;:,.";
    const randomWrongChar = (correct) => {
      let ch = wrongPool[Math.floor(Math.random() * wrongPool.length)];
      if (ch === correct) ch = "?";
      return ch;
    };

    async function typeWithMistakes(text, opts = {}) {
      const {
        min = 25,
        max = 65,
        mistakeProbability = 0.12,
        fixDelay = 220,
      } = opts;
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        // Simulate occasional mistakes (avoid newlines)
        if (ch !== "\n" && Math.random() < mistakeProbability) {
          const wrong = randomWrongChar(ch);
          setText(out + wrong);
          await sleep(rand(min, max));
          // Backspace the wrong char and type the correct one
          setText(out);
          await sleep(fixDelay);
        }
        out += ch;
        setText(out);
        await sleep(rand(min, max));
      }
    }

    async function deleteTo(targetLen = 0, opts = {}) {
      const { min = 12, max = 28 } = opts;
      let s = heroTagline.textContent;
      while (s.length > targetLen) {
        s = s.slice(0, -1);
        setText(s);
        await sleep(rand(min, max));
      }
    }

    const codeSnippets = [
      // 1. BASH (Navegación y ejecución)
      "$ cd /projects/msicca/core\n$ chmod +x msicca_run\n$ ./msicca_run --tagline",
      // 2. Node.js (Importación y llamada)
      "> const { engine } = require('./msicca-api')\n> const status = engine.init()\n> engine.getTagline()",
      // 3. Python (Importación y consulta)
      ">>> import msicca_core as msc\n>>> msc.connect(env='production')\n>>> msc.get_current_tagline()",
      // 4. DevTools (Acceso a objeto global)
      "> var config = App.getConfig()\n> console.clear()\n> config.branding.tagline",
      // 5. BASH
      "$ cd projects/msicca-api\n$ source .env/bin/activate\n$ ./manage.py get_tagline",
      // 6. Node (REPL)
      "> const api = require('./dist/core')\n> await api.connect()\n> api.manifest.tagline",
      // 7. Python (REPL)
      ">>> from msicca import Engine\n>>> app = Engine.initialize()\n>>> app.metadata.tagline",
      // 8. DevTools (Navegador)
      "> var settings = window.getComputedStyle(document.body)\n> console.clear()\n> window.appConfig.branding.tagline",
      // 9. BASH
      "$ export MSICCA_ENV=production\n$ ./msicca_cli --get-motto",
      // 10. Node.js
      "> require('./package.json').tagline",
      // 11. Python
      ">>> import msicca_core\n>>> engine = msicca_core.Engine()\n>>> engine.get_tagline()",
      // 12. DevTools
      "> console.clear()\n> document.querySelector('meta[name=\"tagline\"]').content",
    ];
    const finalMessage = "Code. Build. Deploy.";

    heroTagline.textContent = "";
    heroTagline.style.visibility = "visible";

    async function loop() {
      while (true) {
        const snippet =
          codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        // Type command/snippet with occasional corrections
        await typeWithMistakes(snippet, {
          min: 22,
          max: 48,
          mistakeProbability: 0.18,
          fixDelay: 230,
        });
        // Pause after command before executing
        await sleep(1000);
        // Simulate Enter: command line disappears instantly (no backspace animation)
        setText("");
        // Print result cleanly (no mistakes)
        await typeWithMistakes(finalMessage, {
          min: 26,
          max: 54,
          mistakeProbability: 0,
          fixDelay: 0,
        });
        await sleep(7500); // hold the output ~7.5s
        // Clear output and return cursor to start
        setText("");
        // Pause before starting next command
        await sleep(1000);
      }
    }

    setTimeout(loop, 600);
  }

  // =========================================
  // Hero Background Rotator (smooth crossfade)
  // =========================================
  const heroSection = document.querySelector(".hero");
  const heroLayers = heroSection
    ? Array.from(heroSection.querySelectorAll(".hero-bg-layer"))
    : [];

  if (heroSection && heroLayers.length >= 2) {
    const heroImages = [
      "assets/images/webp/mohammad-rahmani-nBXwqxjDa5c-unsplash.webp",
      "assets/images/webp/mohammad-rahmani-Y5yxdx2a4PI-unsplash.webp",
      "assets/images/webp/vishnu-kalanad-evzHeMgbKOg-unsplash.webp",
      "assets/images/webp/mohammad-rahmani-oXlXu2qukGE-unsplash.webp",
    ];

    let current = 0;
    let visibleLayer = 0;
    let timerId;

    // Initialize first image
    heroLayers[visibleLayer].style.backgroundImage =
      `url(${heroImages[current]})`;
    heroLayers[visibleLayer].classList.add("active");

    const scheduleNext = () => {
      const delay = 20000 + Math.random() * 10000; // 20-30 seconds
      timerId = setTimeout(() => {
        const nextIndex = (current + 1) % heroImages.length;
        const hiddenLayer = visibleLayer === 0 ? 1 : 0;

        heroLayers[hiddenLayer].style.backgroundImage =
          `url(${heroImages[nextIndex]})`;

        // Force reflow to ensure transition triggers
        void heroLayers[hiddenLayer].offsetWidth;

        heroLayers[hiddenLayer].classList.add("active");
        heroLayers[visibleLayer].classList.remove("active");

        visibleLayer = hiddenLayer;
        current = nextIndex;

        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }
})();
