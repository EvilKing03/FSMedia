const TX_CATEGORIES = {
  in: ['Vente PC', 'Vente périphérique', 'Réparation', 'Conseil', 'Remboursement', 'Autre entrée'],
  out: ['Achat de PC', 'Achat stock / composants', 'Frais & abonnements', 'Marketing / Pub', 'Transport / Livraison', 'Matériel / Outillage', 'Autre sortie'],
};

let currentType = 'all';
let currentCategory = '';
let currentSearch = '';
let editingId = null;
let deletingId = null;
let ALL_TX = [];

document.addEventListener('DOMContentLoaded', async () => {
  populateCategoryFilter();
  populateFormCategories('in');
  bindToolbar();
  bindModal();
  await Promise.all([refresh(), populateStockLinkSelect()]);
});

async function refresh() {
  ALL_TX = await TransactionsStore.all();
  renderStats();
  renderTable();
}

/* ----------------- Toolbar / filtres ----------------- */
function populateCategoryFilter() {
  const select = document.getElementById('category-filter');
  const all = [...TX_CATEGORIES.in, ...TX_CATEGORIES.out];
  select.innerHTML = '<option value="">Toutes catégories</option>' + all.map((c) => `<option value="${c}">${c}</option>`).join('');
}

function bindToolbar() {
  document.querySelectorAll('#type-filter .segmented__opt').forEach((opt) => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('#type-filter .segmented__opt').forEach((o) => o.classList.remove('active'));
      opt.classList.add('active');
      currentType = opt.dataset.val;
      renderStats();
      renderTable();
    });
  });

  document.getElementById('category-filter').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderTable();
  });

  document.getElementById('search-input').addEventListener('input', (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    renderTable();
  });

  document.getElementById('add-tx-btn').addEventListener('click', () => openTxModal());
}

/* ----------------- Stats filtrées ----------------- */
function renderStats() {
  const list = filteredTransactions();
  const totalIn = list.filter((t) => t.type === 'in').reduce((s, t) => s + Number(t.amount), 0);
  const totalOut = list.filter((t) => t.type === 'out').reduce((s, t) => s + Number(t.amount), 0);

  const cards = [
    { label: 'Entrées', value: money(totalIn), cls: 'stat-card__value--in', icon: 'in', svg: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>' },
    { label: 'Sorties', value: money(totalOut), cls: 'stat-card__value--out', icon: 'out', svg: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>' },
    { label: 'Solde (filtré)', value: money(totalIn - totalOut), cls: '', icon: 'cyan', svg: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  ];

  document.getElementById('tx-stat-grid').innerHTML = cards.map((c) => `
    <div class="stat-card">
      <div class="stat-card__top">
        <span class="stat-card__label">${c.label}</span>
        <span class="stat-card__icon stat-card__icon--${c.icon}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${c.svg}</svg>
        </span>
      </div>
      <div class="stat-card__value ${c.cls}">${c.value}</div>
      <div class="stat-card__hint">${list.length} transaction(s) affichée(s)</div>
    </div>
  `).join('') + `
    <a href="recap.html" class="stat-card stat-card--action">
      <span class="stat-card__icon stat-card__icon--cyan">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
      </span>
      <span class="stat-card--action__label">Récapitulatif</span>
      <span class="stat-card--action__sub">Voir le rapport complet</span>
      <svg class="stat-card--action__arrow" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  `;
}

/* ----------------- Table ----------------- */
function filteredTransactions() {
  return ALL_TX.filter((t) => {
    if (currentType !== 'all' && t.type !== currentType) return false;
    if (currentCategory && t.category !== currentCategory) return false;
    if (currentSearch && !t.label.toLowerCase().includes(currentSearch)) return false;
    return true;
  });
}

function renderTable() {
  const list = filteredTransactions();
  const body = document.getElementById('tx-table-body');

  if (list.length === 0) {
    body.innerHTML = `<tr><td colspan="7">
      <div class="empty-state" style="padding:50px 10px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <p><strong>Aucune transaction.</strong><br>Ajustez les filtres ou ajoutez une nouvelle transaction.</p>
      </div>
    </td></tr>`;
    return;
  }

  body.innerHTML = list.map((t) => `
    <tr>
      <td class="cell-muted">${niceDate(t.date)}</td>
      <td><span class="pill ${t.type === 'in' ? 'pill--in' : 'pill--out'}">${t.type === 'in' ? 'Entrée' : 'Sortie'}</span></td>
      <td>${escapeHtml(t.label)}</td>
      <td class="cell-muted">${escapeHtml(t.category || '—')}</td>
      <td class="cell-muted">${escapeHtml(t.method || '—')}</td>
      <td style="text-align:right" class="cell-amount ${t.type === 'in' ? 'cell-amount--in' : 'cell-amount--out'}">
        ${t.type === 'in' ? '+' : '−'}${money(t.amount)}
      </td>
      <td>
        <div class="cell-actions">
          <button class="app-btn app-btn--ghost app-btn--sm app-btn--icon" data-edit="${t.id}" aria-label="Modifier">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
          </button>
          <button class="app-btn app-btn--ghost app-btn--sm app-btn--icon app-btn--danger" data-delete="${t.id}" aria-label="Supprimer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  body.querySelectorAll('[data-edit]').forEach((btn) => btn.addEventListener('click', () => openTxModal(btn.dataset.edit)));
  body.querySelectorAll('[data-delete]').forEach((btn) => btn.addEventListener('click', () => openDeleteConfirm(btn.dataset.delete)));
}

/* ----------------- Modal formulaire ----------------- */
function populateFormCategories(type) {
  const select = document.getElementById('f-category');
  const current = select.value;
  select.innerHTML = TX_CATEGORIES[type].map((c) => `<option value="${c}">${c}</option>`).join('');
  if (TX_CATEGORIES[type].includes(current)) select.value = current;
}

async function populateStockLinkSelect() {
  const select = document.getElementById('f-stock-link');
  const items = await StockStore.all();
  select.innerHTML = '<option value="">Aucun</option>' + items.map((s) => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('');
}

function bindModal() {
  document.querySelectorAll('#type-toggle .type-toggle__opt').forEach((opt) => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('#type-toggle .type-toggle__opt').forEach((o) => o.dataset.active = 'false');
      opt.dataset.active = 'true';
      populateFormCategories(opt.dataset.val);
    });
  });

  document.getElementById('tx-modal-close').addEventListener('click', () => closeModal('tx-overlay'));
  document.getElementById('tx-cancel').addEventListener('click', () => closeModal('tx-overlay'));
  document.getElementById('tx-overlay').addEventListener('click', (e) => { if (e.target.id === 'tx-overlay') closeModal('tx-overlay'); });

  document.getElementById('tx-save').addEventListener('click', saveTransaction);

  document.getElementById('tx-confirm-cancel').addEventListener('click', () => closeModal('tx-confirm-overlay'));
  document.getElementById('tx-confirm-delete').addEventListener('click', confirmDeleteTransaction);
}

function currentFormType() {
  return document.querySelector('#type-toggle .type-toggle__opt[data-active="true"]').dataset.val;
}

function setFormType(type) {
  document.querySelectorAll('#type-toggle .type-toggle__opt').forEach((o) => o.dataset.active = (o.dataset.val === type) ? 'true' : 'false');
  populateFormCategories(type);
}

async function openTxModal(id) {
  editingId = id || null;
  await populateStockLinkSelect();
  document.getElementById('tx-save-error').textContent = '';
  const form = document.getElementById('tx-form');
  form.reset();

  if (editingId) {
    const t = ALL_TX.find((x) => x.id === editingId);
    if (!t) return;
    document.getElementById('tx-modal-title').textContent = 'Modifier la transaction';
    document.getElementById('f-id').value = t.id;
    setFormType(t.type);
    document.getElementById('f-date').value = t.date;
    document.getElementById('f-amount').value = t.amount;
    document.getElementById('f-category').value = t.category;
    document.getElementById('f-label').value = t.label;
    document.getElementById('f-method').value = t.method || 'Virement';
    document.getElementById('f-stock-link').value = t.stockLink || '';
    document.getElementById('f-note').value = t.note || '';
  } else {
    document.getElementById('tx-modal-title').textContent = 'Nouvelle transaction';
    document.getElementById('f-id').value = '';
    setFormType('in');
    document.getElementById('f-date').value = todayISO();
  }

  openModal('tx-overlay');
}

async function saveTransaction() {
  const type = currentFormType();
  const date = document.getElementById('f-date').value;
  const amount = parseFloat(document.getElementById('f-amount').value);
  const category = document.getElementById('f-category').value;
  const label = document.getElementById('f-label').value.trim();
  const method = document.getElementById('f-method').value;
  const stockLink = document.getElementById('f-stock-link').value;
  const note = document.getElementById('f-note').value.trim();

  if (!date || !label || isNaN(amount) || amount < 0) {
    document.getElementById('tx-save-error').textContent = 'Merci de renseigner une date, un libellé et un montant valide.';
    return;
  }

  const payload = { type, date, amount, category, label, method, stockLink: stockLink || null, note };
  const saveBtn = document.getElementById('tx-save');
  saveBtn.disabled = true;

  try {
    if (editingId) {
      await TransactionsStore.update(editingId, payload);
      showToast('Transaction mise à jour ✓');
    } else {
      await TransactionsStore.add(payload);
      showToast('Transaction ajoutée ✓');
    }
    closeModal('tx-overlay');
    await refresh();
  } catch (err) {
    document.getElementById('tx-save-error').textContent = 'Erreur : ' + (err.message || 'échec de la sauvegarde.');
  } finally {
    saveBtn.disabled = false;
  }
}

function openDeleteConfirm(id) {
  deletingId = id;
  openModal('tx-confirm-overlay');
}

async function confirmDeleteTransaction() {
  if (deletingId) {
    try {
      await TransactionsStore.remove(deletingId);
      showToast('Transaction supprimée');
    } catch (err) {
      showToast('Erreur : ' + (err.message || 'échec de la suppression.'), true);
    }
  }
  deletingId = null;
  closeModal('tx-confirm-overlay');
  await refresh();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
