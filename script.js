/* ==========================================================
   Personal Website — Interactivity
   Features: mobile menu, navbar scroll state, typewriter,
   scroll reveal animations, skill bar animation
   ========================================================== */

/* ---- Mobile Menu Toggle ---- */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* ---- Navbar Scroll State ---- */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Typewriter Effect ---- */
const typewriterEl = document.querySelector('.typewriter');
const roles = [
  'NUDT 毕业 | 全栈开发工程师',
  'React • Vue • Node.js',
  '追求优雅的代码与出色的用户体验',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typewriterEl) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 30 : 70;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

if (typewriterEl) {
  setTimeout(typeEffect, 600);
}

/* ---- Scroll Reveal (IntersectionObserver) ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('revealed');

      // Animate skill bar fill inside revealed skill cards
      if (entry.target.classList.contains('skill-card')) {
        const fill = entry.target.querySelector('.skill-bar-fill');
        if (fill) {
          fill.style.width = fill.getAttribute('data-width') + '%';
        }
      }

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  }
);

document.querySelectorAll('[data-reveal]').forEach((el) => {
  revealObserver.observe(el);
});

/* ---- Smooth Scroll for Anchor Links (fallback) ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
