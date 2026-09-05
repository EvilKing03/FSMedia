/* =========================================================
   Couche de données — Supabase
   Les données sont partagées et synchronisées entre tous les appareils.
   ========================================================= */

/* ----------------- Mapping lignes DB <-> objets JS ----------------- */

function rowToTx(r) {
  return {
    id: r.id,
    type: r.type,
    date: r.date,
    amount: Number(r.amount) || 0,
    category: r.category,
    label: r.label,
    method: r.method,
    stockLink: r.stock_link,
    note: r.note,
  };
}

function txToRow(t) {
  return {
    type: t.type,
    date: t.date,
    amount: t.amount,
    category: t.category,
    label: t.label,
    method: t.method,
    stock_link: t.stockLink || null,
    note: t.note,
  };
}

function rowToStock(r) {
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    quantity: Number(r.quantity) || 0,
    buyPrice: Number(r.buy_price) || 0,
    sellPrice: Number(r.sell_price) || 0,
    alertThreshold: r.alert_threshold == null ? 1 : Number(r.alert_threshold),
    note: r.note,
  };
}

function stockToRow(s) {
  return {
    name: s.name,
    category: s.category,
    quantity: s.quantity,
    buy_price: s.buyPrice,
    sell_price: s.sellPrice,
    alert_threshold: s.alertThreshold,
    note: s.note,
  };
}

/* ----------------- Transactions ----------------- */
/* { id, date: 'YYYY-MM-DD', type: 'in'|'out', category, label, amount: number, method, stockLink, note } */

const TransactionsStore = {
  async all() {
    const { data, error } = await _sb.from('finance_transactions').select('*').order('date', { ascending: false });
    if (error) { console.error('[Finance] Lecture transactions échouée :', error); return []; }
    return (data || []).map(rowToTx);
  },
  async add(tx) {
    const { error } = await _sb.from('finance_transactions').insert(txToRow(tx));
    if (error) throw error;
  },
  async update(id, patch) {
    const { error } = await _sb.from('finance_transactions').update(txToRow(patch)).eq('id', id);
    if (error) throw error;
  },
  async remove(id) {
    const { error } = await _sb.from('finance_transactions').delete().eq('id', id);
    if (error) throw error;
  },
  async get(id) {
    const { data, error } = await _sb.from('finance_transactions').select('*').eq('id', id).single();
    if (error || !data) return null;
    return rowToTx(data);
  },
};

/* ----------------- Stock ----------------- */
/* { id, name, category, quantity: number, buyPrice: number, sellPrice: number, alertThreshold: number, note } */

const StockStore = {
  async all() {
    const { data, error } = await _sb.from('finance_stock').select('*').order('name', { ascending: true });
    if (error) { console.error('[Finance] Lecture stock échouée :', error); return []; }
    return (data || []).map(rowToStock);
  },
  async add(item) {
    const { error } = await _sb.from('finance_stock').insert(stockToRow(item));
    if (error) throw error;
  },
  async update(id, patch) {
    const { error } = await _sb.from('finance_stock').update(stockToRow(patch)).eq('id', id);
    if (error) throw error;
  },
  async remove(id) {
    const { error } = await _sb.from('finance_stock').delete().eq('id', id);
    if (error) throw error;
  },
  async get(id) {
    const { data, error } = await _sb.from('finance_stock').select('*').eq('id', id).single();
    if (error || !data) return null;
    return rowToStock(data);
  },
};

/* ----------------- Formatage ----------------- */

const fmtCurrency = new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' });
const fmtDate = new Intl.DateTimeFormat('fr-BE', { day: '2-digit', month: 'short', year: 'numeric' });
const fmtMonth = new Intl.DateTimeFormat('fr-BE', { month: 'short', year: '2-digit' });

function money(n) {
  return fmtCurrency.format(Number(n) || 0);
}

function niceDate(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr + 'T00:00:00');
  if (isNaN(d)) return isoStr;
  return fmtDate.format(d);
}

function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

/* ----------------- Export / Import (sauvegarde) ----------------- */

async function exportBackup() {
  const [transactions, stock] = await Promise.all([TransactionsStore.all(), StockStore.all()]);
  const payload = {
    exportedAt: new Date().toISOString(),
    app: 'Finance FSMedia',
    transactions,
    stock,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = todayISO();
  a.href = url;
  a.download = `fsmedia-finance-sauvegarde-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function importBackup(file) {
  const text = await file.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Fichier invalide : JSON illisible.');
  }
  if (!Array.isArray(data.transactions) || !Array.isArray(data.stock)) {
    throw new Error('Fichier invalide : structure inattendue.');
  }

  // Stock d'abord — les transactions peuvent y faire référence via stockLink
  for (const s of data.stock) {
    const { error } = await _sb.from('finance_stock').upsert({ id: s.id, ...stockToRow(s) });
    if (error) throw error;
  }
  for (const t of data.transactions) {
    const { error } = await _sb.from('finance_transactions').upsert({ id: t.id, ...txToRow(t) });
    if (error) throw error;
  }
}
