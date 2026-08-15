const STOCK_CATEGORIES = ['PC complet', 'Composant', 'Périphérique', 'Écran', 'Consommable', 'Autre'];

let stockCategory = '';
let stockSearch = '';
let stockLowOnly = false;
let stockEditingId = null;
let stockDeletingId = null;

document.addEventListener('DOMContentLoaded', () => {
  populateStockCategoryFilter();
  populateFormCategorySelect();
  bindStockToolbar();
  bindStockModal();
  renderStockStats();
  renderStockTable();
});

/* ----------------- Toolbar / filtres ----------------- */
function populateStockCategoryFilter() {
  const select = document.getElementById('stock-category-filter');
  select.innerHTML = '<option value="">Toutes catégories</option>' + STOCK_CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join('');
}

function populateFormCategorySelect() {
  document.getElementById('s-category').innerHTML = STOCK_CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join('');
}

function bindStockToolbar() {
  document.getElementById('stock-category-filter').addEventListener('change', (e) => {
    stockCategory = e.target.value;
    renderStockTable();
  });

  document.getElementById('stock-search-input').addEventListener('input', (e) => {
    stockSearch = e.target.value.trim().toLowerCase();
    renderStockTable();
  });

  document.getElementById('low-stock-toggle').addEventListener('click', (e) => {
    stockLowOnly = !stockLowOnly;
    e.target.classList.toggle('active', stockLowOnly);
    renderStockTable();
  });

  document.getElementById('add-stock-btn').addEventListener('click', () => openStockModal());
}

/* ----------------- Stats ----------------- */
function renderStockStats() {
  const items = StockStore.all();
  const buyValue = items.reduce((s, i) => s + Number(i.quantity) * Number(i.buyPrice), 0);
  const sellValue = items.reduce((s, i) => s + Number(i.quantity) * Number(i.sellPrice), 0);
  const margin = sellValue - buyValue;
  const lowCount = items.filter((i) => Number(i.quantity) <= Number(i.alertThreshold ?? 1)).length;

  const cards = [
    { label: "Valeur du stock (prix d'achat)", value: money(buyValue), icon: 'cyan', svg: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>', cls: '' },
    { label: 'Valeur potentielle (prix de vente)', value: money(sellValue), icon: 'in', svg: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>', cls: 'stat-card__value--in' },
    { label: 'Marge potentielle totale', value: money(margin), icon: margin >= 0 ? 'in' : 'out', svg: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', cls: margin >= 0 ? 'stat-card__value--in' : 'stat-card__value--out' },
    { label: 'Articles en alerte', value: String(lowCount), icon: 'warn', svg: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', cls: '' },
  ];

  document.getElementById('stock-stat-grid').innerHTML = cards.map((c) => `
    <div class="stat-card">
      <div class="stat-card__top">
        <span class="stat-card__label">${c.label}</span>
        <span class="stat-card__icon stat-card__icon--${c.icon}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${c.svg}</svg>
        </span>
      </div>
      <div class="stat-card__value ${c.cls}">${c.value}</div>
      <div class="stat-card__hint">${items.length} article(s) au total</div>
    </div>
  `).join('');
}

/* ----------------- Table ----------------- */
function filteredStock() {
  return StockStore.all().filter((s) => {
    if (stockCategory && s.category !== stockCategory) return false;
    if (stockSearch && !s.name.toLowerCase().includes(stockSearch)) return false;
    if (stockLowOnly && Number(s.quantity) > Number(s.alertThreshold ?? 1)) return false;
    return true;
  });
}

function renderStockTable() {
  const items = filteredStock();
  const body = document.getElementById('stock-table-body');

  if (items.length === 0) {
    body.innerHTML = `<tr><td colspan="9">
      <div class="empty-state" style="padding:50px 10px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        <p><strong>Aucun article.</strong><br>Ajustez les filtres ou ajoutez un nouvel article au stock.</p>
      </div>
    </td></tr>`;
    return;
  }

  body.innerHTML = items.map((s) => {
    const qty = Number(s.quantity);
    const threshold = Number(s.alertThreshold ?? 1);
    const margin = Number(s.sellPrice) - Number(s.buyPrice);
    const totalValue = qty * Number(s.buyPrice);
    let statusPill = '<span class="pill pill--in">En stock</span>';
    if (qty <= 0) statusPill = '<span class="pill pill--out">Rupture</span>';
    else if (qty <= threshold) statusPill = '<span class="pill pill--warn">Stock faible</span>';

    return `
      <tr>
        <td>
          <div style="font-weight:700;">${escapeHtml(s.name)}</div>
          ${s.note ? `<div class="cell-muted" style="font-size:0.76rem;margin-top:2px;">${escapeHtml(s.note)}</div>` : ''}
        </td>
        <td class="cell-muted">${escapeHtml(s.category || '—')}</td>
        <td style="text-align:right">${qty}</td>
        <td style="text-align:right" class="cell-muted">${money(s.buyPrice)}</td>
        <td style="text-align:right" class="cell-muted">${money(s.sellPrice)}</td>
        <td style="text-align:right" class="cell-amount ${margin >= 0 ? 'cell-amount--in' : 'cell-amount--out'}">${money(margin)}</td>
        <td style="text-align:right" class="cell-muted">${money(totalValue)}</td>
        <td>${statusPill}</td>
        <td>
          <div class="cell-actions">
            <button class="app-btn app-btn--ghost app-btn--sm app-btn--icon" data-edit="${s.id}" aria-label="Modifier">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
            </button>
            <button class="app-btn app-btn--ghost app-btn--sm app-btn--icon app-btn--danger" data-delete="${s.id}" aria-label="Supprimer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  body.querySelectorAll('[data-edit]').forEach((btn) => btn.addEventListener('click', () => openStockModal(btn.dataset.edit)));
  body.querySelectorAll('[data-delete]').forEach((btn) => btn.addEventListener('click', () => openStockDeleteConfirm(btn.dataset.delete)));
}

/* ----------------- Modal formulaire ----------------- */
function bindStockModal() {
  document.getElementById('stock-modal-close').addEventListener('click', () => closeModal('stock-overlay'));
  document.getElementById('stock-cancel').addEventListener('click', () => closeModal('stock-overlay'));
  document.getElementById('stock-overlay').addEventListener('click', (e) => { if (e.target.id === 'stock-overlay') closeModal('stock-overlay'); });

  document.getElementById('stock-save').addEventListener('click', saveStockItem);

  document.getElementById('stock-confirm-cancel').addEventListener('click', () => closeModal('stock-confirm-overlay'));
  document.getElementById('stock-confirm-delete').addEventListener('click', confirmDeleteStockItem);
}

function openStockModal(id) {
  stockEditingId = id || null;
  document.getElementById('stock-save-error').textContent = '';
  const form = document.getElementById('stock-form');
  form.reset();

  if (stockEditingId) {
    const s = StockStore.get(stockEditingId);
    if (!s) return;
    document.getElementById('stock-modal-title').textContent = "Modifier l'article";
    document.getElementById('s-id').value = s.id;
    document.getElementById('s-name').value = s.name;
    document.getElementById('s-category').value = s.category;
    document.getElementById('s-quantity').value = s.quantity;
    document.getElementById('s-buy-price').value = s.buyPrice;
    document.getElementById('s-sell-price').value = s.sellPrice;
    document.getElementById('s-alert').value = s.alertThreshold ?? 1;
    document.getElementById('s-note').value = s.note || '';
  } else {
    document.getElementById('stock-modal-title').textContent = 'Ajouter un article';
    document.getElementById('s-id').value = '';
    document.getElementById('s-alert').value = 1;
  }

  openModal('stock-overlay');
}

function saveStockItem() {
  const name = document.getElementById('s-name').value.trim();
  const category = document.getElementById('s-category').value;
  const quantity = parseInt(document.getElementById('s-quantity').value, 10);
  const buyPrice = parseFloat(document.getElementById('s-buy-price').value);
  const sellPrice = parseFloat(document.getElementById('s-sell-price').value);
  const alertThresholdRaw = document.getElementById('s-alert').value;
  const alertThreshold = alertThresholdRaw === '' ? 1 : parseInt(alertThresholdRaw, 10);
  const note = document.getElementById('s-note').value.trim();

  if (!name || isNaN(quantity) || quantity < 0 || isNaN(buyPrice) || buyPrice < 0 || isNaN(sellPrice) || sellPrice < 0) {
    document.getElementById('stock-save-error').textContent = 'Merci de renseigner un nom, une quantité et des prix valides.';
    return;
  }

  const payload = { name, category, quantity, buyPrice, sellPrice, alertThreshold, note };

  if (stockEditingId) {
    StockStore.update(stockEditingId, payload);
    showToast('Article mis à jour ✓');
  } else {
    StockStore.add(payload);
    showToast('Article ajouté ✓');
  }

  closeModal('stock-overlay');
  renderStockStats();
  renderStockTable();
}

function openStockDeleteConfirm(id) {
  stockDeletingId = id;
  openModal('stock-confirm-overlay');
}

function confirmDeleteStockItem() {
  if (stockDeletingId) {
    StockStore.remove(stockDeletingId);
    showToast('Article supprimé');
  }
  stockDeletingId = null;
  closeModal('stock-confirm-overlay');
  renderStockStats();
  renderStockTable();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
