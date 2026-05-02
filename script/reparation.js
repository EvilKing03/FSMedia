// ===== APPARITION AU SCROLL =====
const animItems = document.querySelectorAll('.repair-card, .process__step, .tarifs__row:not(.tarifs__row--header)');

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
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
