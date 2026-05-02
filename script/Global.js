// ===== DARK MODE =====
const html = document.documentElement;

// Appliquer le thème sauvegardé ou la préférence système
const savedTheme = localStorage.getItem('fsmedia-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'light' : 'dark');
html.setAttribute('data-theme', initialTheme);

const themeBtn = document.querySelector('.navbar__theme');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('fsmedia-theme', next);
  });
}


const navbar = document.querySelector('.navbar');

if (navbar) {
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // init
}

// ===== MOBILE BURGER MENU =====
const burger = document.querySelector('.navbar__burger');
const navLinks = document.querySelector('.navbar__links');
const navCta = document.querySelector('.navbar__cta');

if (burger) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    // Simple toggle — pages can override with their own mobile drawer
    if (navLinks) navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.navbar__links a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});