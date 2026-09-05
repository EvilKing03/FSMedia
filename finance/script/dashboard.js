document.addEventListener('DOMContentLoaded', async () => {
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) {
    dateEl.textContent = new Intl.DateTimeFormat('fr-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  }

  const [txs, stock] = await Promise.all([TransactionsStore.all(), StockStore.all()]);

  renderStats(txs, stock);
  renderChart(txs);
  renderRecentTransactions(txs);
  renderLowStock(stock);
});

function renderStats(txs, stock) {
  const totalIn = txs.filter((t) => t.type === 'in').reduce((s, t) => s + Number(t.amount), 0);
  const totalOut = txs.filter((t) => t.type === 'out').reduce((s, t) => s + Number(t.amount), 0);
  const balance = totalIn - totalOut;

  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthTxs = txs.filter((t) => t.date.startsWith(ym));
  const monthIn = monthTxs.filter((t) => t.type === 'in').reduce((s, t) => s + Number(t.amount), 0);
  const monthOut = monthTxs.filter((t) => t.type === 'out').reduce((s, t) => s + Number(t.amount), 0);

  const stockValue = stock.reduce((s, i) => s + Number(i.quantity) * Number(i.buyPrice), 0);
  const stockUnits = stock.reduce((s, i) => s + Number(i.quantity), 0);

  const cards = [
    {
      label: 'Solde total',
      value: money(balance),
      hint: `${money(totalIn)} entrées — ${money(totalOut)} sorties`,
      icon: 'cyan',
      valueClass: '',
      svg: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    },
    {
      label: 'Entrées ce mois-ci',
      value: money(monthIn),
      hint: `${monthTxs.filter((t) => t.type === 'in').length} transaction(s)`,
      icon: 'in',
      valueClass: 'stat-card__value--in',
      svg: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    },
    {
      label: 'Sorties ce mois-ci',
      value: money(monthOut),
      hint: `${monthTxs.filter((t) => t.type === 'out').length} transaction(s)`,
      icon: 'out',
      valueClass: 'stat-card__value--out',
      svg: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
    },
    {
      label: 'Valeur du stock',
      value: money(stockValue),
      hint: `${stockUnits} unité(s) — prix d'achat`,
      icon: 'warn',
      valueClass: '',
      svg: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    },
  ];

  document.getElementById('stat-grid').innerHTML = cards.map((c) => `
    <div class="stat-card">
      <div class="stat-card__top">
        <span class="stat-card__label">${c.label}</span>
        <span class="stat-card__icon stat-card__icon--${c.icon}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${c.svg}</svg>
        </span>
      </div>
      <div class="stat-card__value ${c.valueClass}">${c.value}</div>
      <div class="stat-card__hint">${c.hint}</div>
    </div>
  `).join('');
}

function renderChart(txs) {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months.push({ key, label: fmtMonth.format(d) });
  }

  const totals = months.map((m) => {
    const monthTxs = txs.filter((t) => t.date.startsWith(m.key));
    const inSum = monthTxs.filter((t) => t.type === 'in').reduce((s, t) => s + Number(t.amount), 0);
    const outSum = monthTxs.filter((t) => t.type === 'out').reduce((s, t) => s + Number(t.amount), 0);
    return { ...m, inSum, outSum, count: monthTxs.length };
  });

  const max = Math.max(1, ...totals.map((t) => Math.max(t.inSum, t.outSum)));

  const chart = document.getElementById('chart');
  const hasData = totals.some((t) => t.count > 0);

  if (!hasData) {
    chart.innerHTML = `
      <div class="empty-state" style="width:100%;padding:30px 20px;">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
        <p><strong>Aucune donnée pour le moment.</strong><br>Ajoutez une transaction pour voir apparaître le graphique.</p>
      </div>`;
    return;
  }

  chart.innerHTML = totals.map((t) => `
    <div class="chart__col">
      <div class="chart__bars" title="${t.label} — Entrées ${money(t.inSum)} / Sorties ${money(t.outSum)}">
        <div class="chart__bar chart__bar--in" style="height:${(t.inSum / max) * 100}%"></div>
        <div class="chart__bar chart__bar--out" style="height:${(t.outSum / max) * 100}%"></div>
      </div>
      <span class="chart__label">${t.label}</span>
    </div>
  `).join('');
}

function renderRecentTransactions(txs) {
  const recent = txs.slice(0, 6);
  const body = document.getElementById('recent-tx-body');
  const sub = document.getElementById('tx-recent-sub');
  sub.textContent = `${txs.length} transaction(s) enregistrée(s)`;

  if (recent.length === 0) {
    body.innerHTML = `<tr><td colspan="4">
      <div class="empty-state" style="padding:36px 10px;">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <p><strong>Pas encore de transaction.</strong><br>Ajoutez votre première entrée ou sortie d'argent.</p>
      </div>
    </td></tr>`;
    return;
  }

  body.innerHTML = recent.map((t) => `
    <tr>
      <td class="cell-muted">${niceDate(t.date)}</td>
      <td>${escapeHtml(t.label)}</td>
      <td class="cell-muted">${escapeHtml(t.category || '—')}</td>
      <td style="text-align:right" class="cell-amount ${t.type === 'in' ? 'cell-amount--in' : 'cell-amount--out'}">
        ${t.type === 'in' ? '+' : '−'}${money(t.amount)}
      </td>
    </tr>
  `).join('');
}

function renderLowStock(stock) {
  const low = stock.filter((s) => Number(s.quantity) <= Number(s.alertThreshold ?? 1));
  const el = document.getElementById('low-stock-list');

  if (low.length === 0) {
    el.innerHTML = `
      <div class="empty-state" style="padding:36px 10px;">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <p><strong>Aucune alerte.</strong><br>Le stock est au-dessus des seuils définis.</p>
      </div>`;
    return;
  }

  el.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px;">` + low.map((s) => `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--bg-soft);border-radius:var(--radius-md);border:1px solid var(--border);">
      <div>
        <div style="font-weight:700;font-size:0.87rem;">${escapeHtml(s.name)}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(s.category || 'Sans catégorie')}</div>
      </div>
      <span class="pill pill--warn">${s.quantity} restant(s)</span>
    </div>
  `).join('') + `</div>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
