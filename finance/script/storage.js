/* =========================================================
   Couche de données — localStorage
   Toutes les données restent dans le navigateur de l'appareil.
   Pense à exporter régulièrement une sauvegarde JSON.
   ========================================================= */

const DB_KEYS = {
  transactions: 'fsm_finance_transactions_v1',
  stock: 'fsm_finance_stock_v1',
};

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Lecture localStorage échouée pour', key, e);
    return [];
  }
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

/* ----------------- Transactions ----------------- */
/* { id, date: 'YYYY-MM-DD', type: 'in'|'out', category, label, amount: number, method, note } */

const TransactionsStore = {
  all() {
    return readList(DB_KEYS.transactions).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  },
  add(tx) {
    const list = readList(DB_KEYS.transactions);
    list.push({ id: uid(), ...tx });
    writeList(DB_KEYS.transactions, list);
  },
  update(id, patch) {
    const list = readList(DB_KEYS.transactions);
    const idx = list.findIndex((t) => t.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...patch };
      writeList(DB_KEYS.transactions, list);
    }
  },
  remove(id) {
    const list = readList(DB_KEYS.transactions).filter((t) => t.id !== id);
    writeList(DB_KEYS.transactions, list);
  },
  get(id) {
    return readList(DB_KEYS.transactions).find((t) => t.id === id) || null;
  },
};

/* ----------------- Stock ----------------- */
/* { id, name, category, quantity: number, buyPrice: number, sellPrice: number, alertThreshold: number, note } */

const StockStore = {
  all() {
    return readList(DB_KEYS.stock).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  },
  add(item) {
    const list = readList(DB_KEYS.stock);
    list.push({ id: uid(), ...item });
    writeList(DB_KEYS.stock, list);
  },
  update(id, patch) {
    const list = readList(DB_KEYS.stock);
    const idx = list.findIndex((s) => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...patch };
      writeList(DB_KEYS.stock, list);
    }
  },
  remove(id) {
    const list = readList(DB_KEYS.stock).filter((s) => s.id !== id);
    writeList(DB_KEYS.stock, list);
  },
  get(id) {
    return readList(DB_KEYS.stock).find((s) => s.id === id) || null;
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

function exportBackup() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: 'Finance FSMedia',
    transactions: readList(DB_KEYS.transactions),
    stock: readList(DB_KEYS.stock),
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

function importBackup(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.transactions) || !Array.isArray(data.stock)) {
          throw new Error('Fichier invalide : structure inattendue.');
        }
        writeList(DB_KEYS.transactions, data.transactions);
        writeList(DB_KEYS.stock, data.stock);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
    reader.onerror = () => reject(new Error('Impossible de lire le fichier.'));
    reader.readAsText(file);
  });
}
