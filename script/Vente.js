const ARROW = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function renderCard(p) {
  const badge = p.badge
    ? `<span class="product-card__badge product-card__badge--${p.badge_type || 'new'}">${p.badge}</span>`
    : '';

  const priceNote = p.price_label
    ? `<span class="product-card__price-note">${p.price_label}</span>`
    : '';

  /* specs: support both object {CPU:"...", RAM:"..."} and legacy array [{label,value}] */
  let specsHtml = '';
  if (p.specs) {
    if (Array.isArray(p.specs)) {
      specsHtml = p.specs.map(s =>
        !s.label
          ? `<div class="product-card__spec product-card__spec--full">${s.value}</div>`
          : `<div class="product-card__spec">
               <span class="product-card__spec-label">${s.label}</span>
               <span class="product-card__spec-value">${s.value}</span>
             </div>`
      ).join('');
    } else {
      specsHtml = Object.entries(p.specs).map(([k, v]) =>
        `<div class="product-card__spec">
           <span class="product-card__spec-label">${k}</span>
           <span class="product-card__spec-value">${v}</span>
         </div>`
      ).join('');
    }
  }

  const imgSrc = p.image_url || (p.image ? `images/${p.image}` : null);
  const media = p.model
    ? `<model-viewer src="images/${p.model}" alt="${p.name}" auto-rotate auto-rotate-delay="0" rotation-per-second="30deg" shadow-intensity="1" exposure="1.1"></model-viewer>`
    : imgSrc
      ? `<img src="${imgSrc}" alt="${p.name}" loading="lazy" />`
      : `<div class="product-card__no-img"></div>`;

  return `
    <div class="product-card" data-category="${p.category}">
      <div class="product-card__inner">
        <div class="product-card__front">
          <div class="product-card__img-wrap">
            ${badge}
            ${media}
          </div>
          <div class="product-card__info">
            <div class="product-card__category">${p.category_label || p.category || ''}</div>
            <div class="product-card__name">${p.name}</div>
            <div class="product-card__price-row">
              <span class="product-card__price">${p.price}</span>
              ${priceNote}
            </div>
            <p class="product-card__hint">${p.hint || ''}</p>
          </div>
        </div>
        <div class="product-card__back">
          <div class="product-card__back-top">
            <div class="product-card__back-cat">${p.back_cat || p.category_label || p.category || ''}</div>
            <div class="product-card__back-name">${p.back_name || p.name}</div>
          </div>
          <div class="product-card__specs">${specsHtml}</div>
          <div class="product-card__back-price">${p.back_price || p.price}</div>
          <div class="product-card__back-actions">
            <a href="contact.html?sujet=${encodeURIComponent(p.contact_subject || p.name)}" class="btn-card-primary">
              ${p.cta_label || 'Commander'} ${ARROW}
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
    const { data, error } = await _sb
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    products = data || [];
  } catch {
    // Fallback vers le JSON local si Supabase n'est pas encore configuré
    try {
      const res = await fetch('data/products.json');
      if (!res.ok) throw new Error();
      const json = await res.json();
      products = json.products || [];
    } catch {
      grid.innerHTML = '<p class="catalogue__error">Impossible de charger les produits.<br>Veuillez réessayer ou nous contacter directement.</p>';
      return;
    }
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
