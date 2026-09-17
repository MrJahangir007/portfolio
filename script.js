/* ============================================
   MD. JAHANGIR ALAM — PORTFOLIO SCRIPTS
   ============================================ */

(function () {
  'use strict';

  /* --- 1. Loading Screen --- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 800);
  });

  /* --- 2. Theme Toggle --- */
  var themeToggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  var savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* --- 3. Typing Effect --- */
  var roles = [
    'Sales & Operations Professional',
    'MIS & Team Leadership',
    'Digital Entrepreneur',
    'Founder of Student Care'
  ];
  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var roleText = document.getElementById('roleText');
  var typeSpeed = 60;
  var deleteSpeed = 30;
  var pauseEnd = 2000;
  var pauseStart = 500;

  function typeRole() {
    var current = roles[roleIndex];
    if (isDeleting) {
      roleText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      roleText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    var delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = pauseStart;
    }

    setTimeout(typeRole, delay);
  }

  if (roleText) {
    setTimeout(typeRole, 1000);
  }

  /* --- 4. Animated Counters --- */
  var counters = document.querySelectorAll('[data-count]');
  var counterDone = false;

  function animateCounters() {
    if (counterDone) return;
    var heroStats = document.querySelector('.hero__stats');
    if (!heroStats) return;
    var rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counterDone = true;
      counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-count'), 10);
        var current = 0;
        var step = Math.max(1, Math.floor(target / 30));
        var timer = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = current;
        }, 40);
      });
    }
  }

  /* --- 5. Scroll Progress Bar --- */
  var scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  /* --- 6. Navigation Scroll Effect --- */
  var nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  /* --- 7. Active Nav Link Highlighting --- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function highlightNav() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* --- 8. Mobile Menu Toggle --- */
  var hamburger = document.getElementById('hamburger');
  var navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    navLinksContainer.classList.toggle('open');
  });

  navLinksContainer.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinksContainer.classList.remove('open');
    });
  });

  /* --- 9. Reveal on Scroll --- */
  var revealElements = document.querySelectorAll('.section__header, .about__grid, .skill-card, .timeline__item, .project-card, .edu-card, .cert-card, .contact__item');
  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* --- 10. Back to Top --- */
  var backToTop = document.getElementById('backToTop');

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --- 11. Combined Scroll Handler --- */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateScrollProgress();
        updateNav();
        highlightNav();
        animateCounters();
        backToTop.classList.toggle('visible', window.scrollY > 600);
        ticking = false;
      });
      ticking = true;
    }
  });

  /* --- Initial Calls --- */
  updateScrollProgress();
  updateNav();
  animateCounters();

})();
