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

// ===== AUTH STATE =====
(function () {
  const user = JSON.parse(localStorage.getItem('fsmedia_user') || 'null');
  const authBtn = document.querySelector('.navbar__auth');
  if (!authBtn) return;

  if (user) {
    // Remplacer le bouton Connexion par un menu utilisateur
    const menu = document.createElement('div');
    menu.className = 'navbar__user';
    menu.innerHTML = `
      <button class="navbar__user-btn" aria-expanded="false">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>${user.pseudo || user.prenom}</span>
        <svg class="navbar__user-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="navbar__user-dropdown">
        <a href="compte.html">Mon compte</a>
        <button class="navbar__logout-btn">Se déconnecter</button>
      </div>`;

    authBtn.replaceWith(menu);

    // Toggle dropdown
    const btn      = menu.querySelector('.navbar__user-btn');
    const dropdown = menu.querySelector('.navbar__user-dropdown');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => menu.classList.remove('open'));

    // Déconnexion
    menu.querySelector('.navbar__logout-btn').addEventListener('click', () => {
      localStorage.removeItem('fsmedia_user');
      window.location.href = 'index.html';
    });
  }
})();