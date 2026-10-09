/**
 * Portfolio - Main JavaScript
 * Handles: mobile nav, sticky header, active links, scroll reveal
 */

(function () {
  'use strict';

  // ── DOM Elements ──────────────────────────────────────────
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  // ── Mobile Navigation ─────────────────────────────────────

  // Create overlay element for mobile nav
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  function openNav() {
    navList.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navList.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navList.classList.contains('open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close nav when clicking a link or the overlay
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  overlay.addEventListener('click', closeNav);

  // Close nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      closeNav();
      navToggle.focus();
    }
  });

  // ── Sticky Header Shadow ──────────────────────────────────
  var lastScrollY = 0;
  var ticking = false;

  function updateHeader() {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // ── Active Navigation Link ────────────────────────────────
  var observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // ── Scroll Reveal ─────────────────────────────────────────
  // Add .reveal class to animatable elements
  var revealTargets = document.querySelectorAll(
    '.section__title, .about__content, .skills__group, ' +
    '.timeline__item, .card, .certs__item, .contact__links'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Smooth Scroll Polyfill Check ──────────────────────────
  // Modern browsers handle this via CSS scroll-behavior: smooth
  // This is a fallback for programmatic scroll if needed
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

})();
