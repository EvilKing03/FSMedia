/* ===== RÉCAPITULATIF FINANCIER IMPRIMABLE ===== */

let currentFrom = null;
let currentTo = null;
let ALL_TX = [];

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function presetRange(preset) {
  const now = new Date();
  if (preset === 'month') {
    return [ymd(new Date(now.getFullYear(), now.getMonth(), 1)), ymd(new Date(now.getFullYear(), now.getMonth() + 1, 0))];
  }
  if (preset === 'lastmonth') {
    return [ymd(new Date(now.getFullYear(), now.getMonth() - 1, 1)), ymd(new Date(now.getFullYear(), now.getMonth(), 0))];
  }
  if (preset === 'year') {
    return [ymd(new Date(now.getFullYear(), 0, 1)), ymd(new Date(now.getFullYear(), 11, 31))];
  }
  return [null, null]; // 'all'
}

function periodLabel(from, to) {
  if (!from && !to) return 'Historique complet';
  return `Du ${niceDate(from)} au ${niceDate(to)}`;
}

function byCategory(list) {
  const map = {};
  list.forEach(t => { map[t.category || 'Autre'] = (map[t.category || 'Autre'] || 0) + Number(t.amount); });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function categoryRows(entries, total) {
  if (!entries.length) return '<p class="recap-empty-cat">Aucune donnée</p>';
  return `<table class="recap-cat-table"><tbody>${entries.map(([cat, sum]) => `
    <tr>
      <td>${escapeHtml(cat)}</td>
      <td class="recap-cat-bar-cell"><div class="recap-cat-bar"><div style="width:${total ? (sum / total * 100) : 0}%"></div></div></td>
      <td class="recap-cat-amount">${money(sum)}</td>
    </tr>`).join('')}</tbody></table>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function renderRecap() {
  const sheet = document.getElementById('recap-sheet');
  const txs = ALL_TX.filter(t => (!currentFrom || t.date >= currentFrom) && (!currentTo || t.date <= currentTo));
  const sorted = [...txs].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

  const totalIn = txs.filter(t => t.type === 'in').reduce((s, t) => s + Number(t.amount), 0);
  const totalOut = txs.filter(t => t.type === 'out').reduce((s, t) => s + Number(t.amount), 0);
  const solde = totalIn - totalOut;

  const inByCat = byCategory(txs.filter(t => t.type === 'in'));
  const outByCat = byCategory(txs.filter(t => t.type === 'out'));

  const rowsHtml = sorted.length ? sorted.map(t => `
    <tr>
      <td class="recap-cell-muted">${niceDate(t.date)}</td>
      <td><span class="recap-pill ${t.type === 'in' ? 'recap-pill--in' : 'recap-pill--out'}">${t.type === 'in' ? 'Entrée' : 'Sortie'}</span></td>
      <td>${escapeHtml(t.label)}</td>
      <td class="recap-cell-muted">${escapeHtml(t.category || '—')}</td>
      <td class="recap-cell-muted">${escapeHtml(t.method || '—')}</td>
      <td class="recap-amount ${t.type === 'in' ? 'recap-amount--in' : 'recap-amount--out'}">${t.type === 'in' ? '+' : '−'}${money(t.amount)}</td>
    </tr>`).join('') : `<tr><td colspan="6" class="recap-empty">Aucune transaction sur cette période.</td></tr>`;

  sheet.innerHTML = `
    <header class="fiche-header">
      <div class="fiche-header__brand">
        <img src="../images/favicon1.png" alt="" />
        <span>FS<strong>Media</strong></span>
      </div>
      <div class="fiche-header__meta">
        <span class="fiche-header__title">Récapitulatif financier</span>
        <span class="fiche-header__tag">${periodLabel(currentFrom, currentTo)}</span>
      </div>
    </header>

    <div class="recap-stats">
      <div class="recap-stat">
        <span class="recap-stat__label">Entrées</span>
        <span class="recap-stat__value recap-stat__value--in">${money(totalIn)}</span>
      </div>
      <div class="recap-stat">
        <span class="recap-stat__label">Sorties</span>
        <span class="recap-stat__value recap-stat__value--out">${money(totalOut)}</span>
      </div>
      <div class="recap-stat">
        <span class="recap-stat__label">Solde</span>
        <span class="recap-stat__value ${solde >= 0 ? 'recap-stat__value--in' : 'recap-stat__value--out'}">${money(solde)}</span>
      </div>
    </div>

    <div class="recap-breakdown">
      <div>
        <h2 class="recap-section-title">Entrées par catégorie</h2>
        ${categoryRows(inByCat, totalIn)}
      </div>
      <div>
        <h2 class="recap-section-title">Sorties par catégorie</h2>
        ${categoryRows(outByCat, totalOut)}
      </div>
    </div>

    <h2 class="recap-section-title">Détail des transactions <span class="recap-count">(${sorted.length})</span></h2>
    <div class="recap-table-wrap">
      <table class="recap-table">
        <thead>
          <tr><th>Date</th><th>Type</th><th>Libellé</th><th>Catégorie</th><th>Méthode</th><th style="text-align:right">Montant</th></tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>

    <footer class="fiche-footer">
      <div class="fiche-footer__info">
        <span>FSMedia — Récapitulatif généré le ${niceDate(todayISO())}</span>
        <span>contact@fsmedia.be · fsmedia.be</span>
      </div>
    </footer>
  `;
}

function setActivePresetButton(preset) {
  document.querySelectorAll('.recap-period-btn').forEach(b => b.classList.toggle('active', b.dataset.preset === preset));
}

function applyPreset(preset) {
  const [from, to] = presetRange(preset);
  currentFrom = from;
  currentTo = to;
  document.getElementById('recap-from').value = from || '';
  document.getElementById('recap-to').value = to || '';
  setActivePresetButton(preset);
  renderRecap();
}

function bindToolbar() {
  document.querySelectorAll('.recap-period-btn').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
  });

  const fromInput = document.getElementById('recap-from');
  const toInput = document.getElementById('recap-to');
  function applyCustomRange() {
    currentFrom = fromInput.value || null;
    currentTo = toInput.value || null;
    setActivePresetButton(null);
    renderRecap();
  }
  fromInput.addEventListener('change', applyCustomRange);
  toInput.addEventListener('change', applyCustomRange);

  document.getElementById('print-btn').addEventListener('click', () => window.print());
}

async function init() {
  bindToolbar();
  ALL_TX = await TransactionsStore.all();
  applyPreset('month');
}

init();
