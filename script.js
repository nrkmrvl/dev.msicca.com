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

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const revealElements = document.querySelectorAll(
    ".feature-card, .project-card, .about-content, .contact-content, .features-header, .projects-header"
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
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );

  // =========================================
  // Active Navigation Highlight
  // =========================================
  const sections = document.querySelectorAll("section[id]");

  const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );

      if (
        navLink &&
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ) {
        document
          .querySelectorAll(".nav-links a")
          .forEach((link) => link.classList.remove("active"));
        navLink.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightNav, { passive: true });

  // =========================================
  // Typewriter Effect on Hero (optional enhancement)
  // =========================================
  const heroTagline = document.querySelector(".hero-tagline");
  if (heroTagline) {
    const text = heroTagline.textContent;
    heroTagline.textContent = "";
    heroTagline.style.visibility = "visible";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    };

    // Start typing after a short delay
    setTimeout(typeWriter, 800);
  }
})();
