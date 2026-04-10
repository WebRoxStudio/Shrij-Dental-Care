/* ============================================
   SHRIJ DENTAL CARE - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- MOBILE MENU ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Add close button if not exists
      if (navLinks.classList.contains('open') && !navLinks.querySelector('.nav-close')) {
        const closeBtn = document.createElement('span');
        closeBtn.className = 'nav-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => navLinks.classList.remove('open'));
        navLinks.prepend(closeBtn);
      }
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---- BEFORE/AFTER SLIDER ---- */
  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.slide').length;

  function goToSlide(n) {
    currentSlide = (n + totalSlides) % totalSlides;
    if (slides) slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  document.querySelector('.slider-prev')?.addEventListener('click', () => goToSlide(currentSlide - 1));
  document.querySelector('.slider-next')?.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // Auto advance
  setInterval(() => goToSlide(currentSlide + 1), 5000);

  /* ---- GALLERY LIGHTBOX ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('active');
      }
    });
  });
  document.querySelector('.lightbox-close')?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
  });
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  /* ---- APPOINTMENT FORM ---- */
  const form = document.getElementById('appointment-form');
  const successMsg = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate submission
      const btn = form.querySelector('.submit-btn');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }, 1200);
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.fontWeight = a.getAttribute('href') === '#' + entry.target.id ? '700' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => activeObserver.observe(s));

  /* ---- PARALLAX HERO SHAPES ---- */
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.hero-circle').forEach((c, i) => {
      c.style.transform = `translateY(${scrolled * (0.1 + i * 0.05)}px)`;
    });
  }, { passive: true });

});
