const ARROW = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function specsEntries(p) {
  if (!p.specs) return [];
  if (Array.isArray(p.specs)) {
    return p.specs.filter(s => s.label).map(s => [s.label, s.value]);
  }
  return Object.entries(p.specs);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function renderProduct(p) {
  document.title = `${p.name} — FSMedia`;

  const imgs = [p.image_url, p.image_url_2, p.image_url_3].filter(Boolean);
  const mainImg = imgs[0] || (p.image ? `images/${p.image}` : null);

  const badge = p.badge
    ? `<span class="product-detail__badge product-card__badge--${p.badge_type || 'new'}">${escapeHtml(p.badge)}</span>`
    : '';

  const thumbs = imgs.length > 1
    ? `<div class="product-detail__thumbs" id="pd-thumbs">${imgs.map((u, i) =>
        `<button type="button" class="product-detail__thumb${i === 0 ? ' active' : ''}" data-src="${u}"><img src="${u}" alt="" /></button>`
      ).join('')}</div>`
    : '';

  const specsHtml = specsEntries(p).map(([k, v]) => `
    <div class="product-detail__spec">
      <span class="product-detail__spec-label">${escapeHtml(k)}</span>
      <span class="product-detail__spec-value">${escapeHtml(v)}</span>
    </div>`).join('');

  const grid = document.getElementById('product-detail');
  grid.innerHTML = `
    <a href="vente.html" class="product-detail__back">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Retour à la boutique
    </a>

    <div class="product-detail__gallery">
      <div class="product-detail__main-img">
        ${badge}
        ${mainImg ? `<img src="${mainImg}" alt="${escapeHtml(p.name)}" id="pd-main-img" />` : ''}
      </div>
      ${thumbs}
    </div>

    <div class="product-detail__info">
      <div class="product-detail__cat">${escapeHtml(p.category_label || p.category || '')}</div>
      <h1 class="product-detail__name">${escapeHtml(p.name)}</h1>
      <div class="product-detail__price-row">
        <span class="product-detail__price">${escapeHtml(p.price || '')}</span>
        ${p.price_label ? `<span class="product-detail__price-note">${escapeHtml(p.price_label)}</span>` : ''}
      </div>
      ${p.hint ? `<p class="product-detail__hint">${escapeHtml(p.hint)}</p>` : ''}

      ${specsHtml ? `<div class="product-detail__specs-title">Spécifications</div><div class="product-detail__specs">${specsHtml}</div>` : ''}

      <div class="product-detail__actions">
        <a href="contact.html?sujet=${encodeURIComponent(p.contact_subject || p.name)}" class="btn-card-primary">
          ${escapeHtml(p.cta_label || 'Commander')} ${ARROW}
        </a>
        <a href="contact.html" class="btn-card-outline">Poser une question</a>
      </div>
    </div>
  `;

  const thumbsEl = document.getElementById('pd-thumbs');
  if (thumbsEl) {
    thumbsEl.querySelectorAll('.product-detail__thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('pd-main-img').src = btn.dataset.src;
        thumbsEl.querySelectorAll('.product-detail__thumb').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
}

function renderNotFound() {
  document.getElementById('product-detail').innerHTML = `
    <div class="product-detail__error">
      Produit introuvable.<br>Il a peut-être été retiré du catalogue.
      <br><br>
      <a href="vente.html" class="btn-outline">Retour à la boutique</a>
    </div>`;
}

async function init() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { renderNotFound(); return; }

  try {
    const { data, error } = await _sb.from('products').select('*').eq('id', id).single();
    if (error || !data) throw error || new Error('not found');
    renderProduct(data);
  } catch (err) {
    console.error('[Produit] Supabase error:', err);
    renderNotFound();
  }
}

init();
