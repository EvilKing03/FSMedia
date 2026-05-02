const ARROW = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function renderCard(p) {
  const badge = p.badge
    ? `<span class="product-card__badge product-card__badge--${p.badge_type || 'new'}">${p.badge}</span>`
    : '';

  const priceNote = p.price_label
    ? `<span class="product-card__price-note">${p.price_label}</span>`
    : '';

  const specs = p.specs.map(s =>
    !s.label
      ? `<div class="product-card__spec product-card__spec--full">${s.value}</div>`
      : `<div class="product-card__spec">
           <span class="product-card__spec-label">${s.label}</span>
           <span class="product-card__spec-value">${s.value}</span>
         </div>`
  ).join('');

  return `
    <div class="product-card" data-category="${p.category}">
      <div class="product-card__inner">
        <div class="product-card__front">
          <div class="product-card__img-wrap">
            ${badge}
            <img src="../images/${p.image}" alt="${p.name}" loading="lazy" />
          </div>
          <div class="product-card__info">
            <div class="product-card__category">${p.category_label}</div>
            <div class="product-card__name">${p.name}</div>
            <div class="product-card__price-row">
              <span class="product-card__price">${p.price}</span>
              ${priceNote}
            </div>
            <p class="product-card__hint">${p.hint}</p>
          </div>
        </div>
        <div class="product-card__back">
          <div class="product-card__back-top">
            <div class="product-card__back-cat">${p.back_cat}</div>
            <div class="product-card__back-name">${p.back_name}</div>
          </div>
          <div class="product-card__specs">${specs}</div>
          <div class="product-card__back-price">${p.back_price}</div>
          <div class="product-card__back-actions">
            <a href="contact.html?sujet=${encodeURIComponent(p.contact_subject)}" class="btn-card-primary">
              ${p.cta_label} ${ARROW}
            </a>
            <a href="contact.html" class="btn-card-outline">Poser une question</a>
          </div>
        </div>
      </div>
    </div>`;
}

async function init() {
  const grid = document.querySelector('.catalogue__grid');
  if (!grid) return;

  let products;
  try {
    const res = await fetch('../data/products.json');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    products = data.products;
  } catch {
    grid.innerHTML = '<p class="catalogue__error">Impossible de charger les produits.<br>Le site doit être ouvert via un serveur web (pas en fichier local).</p>';
    return;
  }

  grid.innerHTML = products.map(renderCard).join('');

  const filterBtns  = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  // ===== FILTRES =====
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }));
        } else {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 260);
        }
      });
    });
  });

  // ===== TOUCH (flip au tap sur mobile) =====
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
        const inner = card.querySelector('.product-card__inner');
        if (inner) inner.style.transform = card.classList.contains('flipped')
          ? 'rotateY(180deg)' : 'rotateY(0deg)';
      }
    });
  });

  // ===== APPARITION AU SCROLL =====
  productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)';
  });

  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.product-card').forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  gridObserver.observe(grid);
}

init();
