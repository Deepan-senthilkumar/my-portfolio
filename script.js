/* ==========================================================================
   PORTFOLIO ENGINE - INTERACTION & ANIMATION SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initStatsCounter();
});

/* ==========================================================================
   MOBILE NAVIGATION MENU TOGGLER
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (!menuBtn || !navLinks) return;

  // Hamburger active toggling
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close overlay on link selections
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu on clicks outside navbar bounds
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      menuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

/* ==========================================================================
   SCROLL REVEAL EFFECT (Observer)
   ========================================================================== */
function initScrollReveal() {
  const revealItems = document.querySelectorAll(
    '.section, .stat-box, .project-card, .skill-card, .timeline-card, .edu-card'
  );

  if (!window.IntersectionObserver) {
    revealItems.forEach(item => item.classList.remove('reveal'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach(item => {
    item.classList.add('reveal');
    revealObserver.observe(item);
  });
}

/* ==========================================================================
   STAT COUNTERS INCREMENT EFFECT
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!window.IntersectionObserver || statNumbers.length === 0) return;

  const counterObserver = new IntersectionObserver((entries, observerSelf) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatsNumber(entry.target);
        observerSelf.unobserve(entry.target); // Run count once
      }
    });
  }, { threshold: 0.1 });

  statNumbers.forEach(stat => counterObserver.observe(stat));
}

function animateStatsNumber(element) {
  const targetVal = parseInt(element.getAttribute('data-val') || '0', 10);
  if (!targetVal) return;

  let current = 0;
  const animationDuration = 1200; // ms
  const frameRate = 60;
  const intervalTime = Math.floor(1000 / frameRate);
  const totalSteps = Math.floor(animationDuration / intervalTime);
  const stepIncrement = targetVal / totalSteps;

  const timer = setInterval(() => {
    current += stepIncrement;
    if (current >= targetVal) {
      clearInterval(timer);
      element.textContent = formatStatValue(targetVal);
    } else {
      element.textContent = formatStatValue(Math.floor(current));
    }
  }, intervalTime);
}

function formatStatValue(val) {
  if (val >= 1000) {
    return `${Math.floor(val / 1000)}K+`;
  }
  return `${val}+`;
}
