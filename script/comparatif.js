/* ===== COMPARATIF PC IMPRIMABLE ===== */

const PC_CATS = ['gaming', 'bureautique', 'reconditionne', 'surmesure'];
const MAX_SELECT = 3;

let ALL_PC = [];
let SELECTED = [];

async function checkAdmin() {
  const { data: { session } } = await _sb.auth.getSession();
  if (!session) {
    location.href = 'auth.html?redirect=' + encodeURIComponent('comparatif.html');
    return false;
  }

  const { data, error } = await _sb.from('admins').select('email').eq('email', session.user.email).single();
  if (error || !data) {
    alert("Accès refusé. Cette page est réservée aux administrateurs.");
    location.href = 'index.html';
    return false;
  }
  return true;
}

function todayLong() {
  return new Intl.DateTimeFormat('fr-BE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function specsEntries(p) {
  if (!p.specs) return [];
  if (Array.isArray(p.specs)) {
    return p.specs.filter(s => s.label).map(s => [s.label, s.value]);
  }
  return Object.entries(p.specs);
}

/* ── Icônes par type de composant ── */
const SPEC_ICONS = {
  cpu:     '<rect x="5" y="5" width="6" height="6" rx="1"/><path d="M7 2v2M9 2v2M7 12v2M9 12v2M2 7h2M2 9h2M12 7h2M12 9h2"/>',
  ram:     '<rect x="2" y="6" width="12" height="4" rx="1"/><path d="M4.5 6V4.3M7 6V4.3M9.5 6V4.3"/>',
  storage: '<path d="M2.5 5.5L4.6 2h6.8l2.1 3.5v6a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1z"/><line x1="2.2" y1="9" x2="13.8" y2="9"/><circle cx="4.6" cy="11" r=".6"/>',
  gpu:     '<rect x="1.5" y="5" width="13" height="6" rx="1"/><circle cx="5" cy="8" r="1.2"/><circle cx="9" cy="8" r="1.2"/>',
  os:      '<rect x="2" y="2" width="5" height="5"/><rect x="9" y="2" width="5" height="5"/><rect x="2" y="9" width="5" height="5"/><rect x="9" y="9" width="5" height="5"/>',
  dot:     '<circle cx="8" cy="8" r="2"/>',
};

function specIcon(label) {
  const l = (label || '').toLowerCase();
  if (/cpu|processeur|ryzen|intel|core i/.test(l)) return SPEC_ICONS.cpu;
  if (/ram|m[ée]moire/.test(l)) return SPEC_ICONS.ram;
  if (/ssd|hdd|disque|stockage|nvme/.test(l)) return SPEC_ICONS.storage;
  if (/gpu|carte graphique|radeon|geforce|rtx|rx\s?\d/.test(l)) return SPEC_ICONS.gpu;
  if (/windows|os\b|syst[èe]me/.test(l)) return SPEC_ICONS.os;
  return SPEC_ICONS.dot;
}

const SERVICES = [
  {
    title: 'Réparation',
    desc: 'Diagnostic et réparation de PC fixes ou portables. Remplacement de pièces, résolution de pannes.',
    icon: '<circle cx="10" cy="10" r="3"/><path d="M10 2v3M10 15v3M2 10h3M15 10h3M4.2 4.2l2.1 2.1M13.7 13.7l2.1 2.1M4.2 15.8l2.1-2.1M13.7 6.3l2.1-2.1"/>',
  },
  {
    title: 'Conseil',
    desc: "Un conseil personnalisé pour choisir le PC ou les composants adaptés à vos besoins et votre budget.",
    icon: '<path d="M3 4h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8l-4 3v-3H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><line x1="6" y1="8" x2="14" y2="8"/><line x1="6" y1="11" x2="11" y2="11"/>',
  },
  {
    title: 'Optimisation',
    desc: 'Nettoyage, mise à jour et optimisation des performances pour redonner du peps à votre machine.',
    icon: '<path d="M3 15a7 7 0 0 1 14 0"/><line x1="10" y1="15" x2="13" y2="10"/><circle cx="10" cy="15" r="1"/>',
  },
];

/* ── Picker ── */
function renderPicker() {
  const grid = document.getElementById('picker-grid');
  if (!ALL_PC.length) {
    grid.innerHTML = '<p class="fiche-loading">Aucun PC dans le catalogue.</p>';
    return;
  }

  grid.innerHTML = ALL_PC.map(p => {
    const imgSrc = p.image_url || (p.image ? `images/${p.image}` : null);
    const checked = SELECTED.includes(p.id);
    return `
      <label class="comparatif-pick${checked ? ' checked' : ''}" data-id="${p.id}">
        <input type="checkbox" ${checked ? 'checked' : ''} data-id="${p.id}" />
        <div class="comparatif-pick__thumb">
          ${imgSrc ? `<img src="${imgSrc}" alt="" />` : ''}
        </div>
        <div class="comparatif-pick__info">
          <span class="comparatif-pick__name">${escapeHtml(p.name)}</span>
          <span class="comparatif-pick__price">${escapeHtml(p.price || '')}</span>
        </div>
      </label>`;
  }).join('');

  grid.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => toggleSelect(cb.dataset.id, cb));
  });
}

function toggleSelect(id, checkbox) {
  const idx = SELECTED.indexOf(id);
  if (idx !== -1) {
    SELECTED.splice(idx, 1);
  } else {
    if (SELECTED.length >= MAX_SELECT) {
      checkbox.checked = false;
      return;
    }
    SELECTED.push(id);
  }
  renderPicker();
  renderSheet();
  updateToolbar();
}

function updateToolbar() {
  document.getElementById('comparatif-counter').textContent = `${SELECTED.length} / ${MAX_SELECT} PC sélectionnés`;
  document.getElementById('print-btn').disabled = SELECTED.length === 0;
}

/* ── Feuille comparatif ── */
function renderSheet() {
  const sheet = document.getElementById('comparatif-sheet');

  if (SELECTED.length === 0) {
    sheet.innerHTML = '<p class="fiche-loading">Sélectionne au moins un PC ci-dessus pour générer la feuille.</p>';
    return;
  }

  const products = SELECTED.map(id => ALL_PC.find(p => p.id === id)).filter(Boolean);

  const cards = products.map(p => {
    const imgSrc = p.image_url || (p.image ? `images/${p.image}` : null);
    const badge = p.badge
      ? `<span class="comparatif-card__badge product-card__badge--${p.badge_type || 'new'}">${escapeHtml(p.badge)}</span>`
      : '';
    const specsHtml = specsEntries(p).map(([k, v]) => `
      <div class="comparatif-card__spec">
        <svg class="comparatif-card__spec-icon" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${specIcon(k)}</svg>
        <b>${escapeHtml(v)}</b>
      </div>
    `).join('');

    return `
      <div class="comparatif-card">
        <div class="comparatif-card__img">
          ${badge}
          ${imgSrc ? `<img src="${imgSrc}" alt="${escapeHtml(p.name)}" />` : ''}
        </div>
        <span class="comparatif-card__cat">${escapeHtml(p.category_label || p.category || '')}</span>
        <h3 class="comparatif-card__name">${escapeHtml(p.name)}</h3>
        <div class="comparatif-card__price">
          ${escapeHtml(p.price || '')}
          ${p.price_label ? `<span>${escapeHtml(p.price_label)}</span>` : ''}
        </div>
        <div class="comparatif-card__specs">${specsHtml}</div>
      </div>`;
  }).join('');

  const servicesHtml = SERVICES.map(s => `
    <div class="comparatif-service">
      <svg class="comparatif-service__icon" width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>
      <span class="comparatif-service__title">${s.title}</span>
      <p class="comparatif-service__desc">${s.desc}</p>
    </div>
  `).join('');

  sheet.innerHTML = `
    <header class="fiche-header">
      <div class="fiche-header__brand">
        <img src="../images/favicon1.png" alt="" />
        <span>FS<strong>Media</strong></span>
      </div>
      <div class="fiche-header__meta">
        <span class="fiche-header__title">Nos PC disponibles</span>
        <span class="fiche-header__tag">${todayLong()}</span>
      </div>
    </header>

    <div class="comparatif-grid comparatif-grid--${products.length}">
      ${cards}
    </div>

    <h2 class="comparatif-services-title">Nos services</h2>
    <div class="comparatif-services">
      ${servicesHtml}
    </div>

    <footer class="fiche-footer">
      <div class="fiche-footer__info">
        <span>FSMedia — Vente, réparation et conseil informatique</span>
        <span>contact@fsmedia.be · fsmedia.be</span>
      </div>
      <div class="fiche-footer__qr">
        <img id="comparatif-qr" alt="QR code vers le site" />
        <span>Voir en ligne</span>
      </div>
    </footer>
  `;

  const qrImg = document.getElementById('comparatif-qr');
  if (qrImg && window.qrcode) {
    const qr = qrcode(0, 'M');
    qr.addData('https://fsmedia.be/');
    qr.make();
    qrImg.src = qr.createDataURL(4, 0);
  }
}

/* ── Impression sur 1 page ── */
const A4_HEIGHT_PX = 1140; // ~297mm à 96dpi (1122px) + marge pour le min-height du pied de page

function fitToOnePage() {
  const sheet = document.getElementById('comparatif-sheet');
  if (!sheet) return;
  sheet.style.zoom = 1;
  const natural = sheet.scrollHeight;
  if (natural > A4_HEIGHT_PX) {
    sheet.style.zoom = A4_HEIGHT_PX / natural;
  }
}

function resetZoom() {
  const sheet = document.getElementById('comparatif-sheet');
  if (sheet) sheet.style.zoom = '';
}

window.addEventListener('beforeprint', fitToOnePage);
window.addEventListener('afterprint', resetZoom);
document.getElementById('print-btn').addEventListener('click', () => window.print());

/* ── Init ── */
async function init() {
  const ok = await checkAdmin();
  if (!ok) return;

  try {
    const { data, error } = await _sb
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    ALL_PC = (data || []).filter(p => PC_CATS.includes(p.category));
  } catch (err) {
    console.error('[Comparatif] Supabase error:', err);
    document.getElementById('picker-grid').innerHTML = '<p class="fiche-loading">Erreur de chargement des produits.</p>';
    return;
  }

  renderPicker();
  updateToolbar();
}

init();
