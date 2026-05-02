// ===== APPARITION AU SCROLL =====
const animItems = document.querySelectorAll('.audience-card, .domaine-item, .conseil-step');

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 90);
      appearObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  appearObserver.observe(el);
});
