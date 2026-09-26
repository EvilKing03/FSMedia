/* ===== DEVIS PC SUR MESURE ===== */

async function checkAdmin() {
  const { data: { session } } = await _sb.auth.getSession();
  if (!session) {
    location.href = 'auth.html?redirect=' + encodeURIComponent('devis.html' + location.search);
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

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

const fmtCurrency = new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' });
function money(n) {
  return fmtCurrency.format(Number(n) || 0);
}

function todayLong() {
  return new Intl.DateTimeFormat('fr-BE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
}

/* ── Lignes de composants ── */
let rows = [];
let rowSeq = 0;

function addRow(name = '', price = '') {
  rowSeq++;
  rows.push({ id: rowSeq, name, price });
  renderRows();
}

function removeRow(id) {
  rows = rows.filter((r) => r.id !== id);
  renderRows();
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function renderRows() {
  const tbody = document.getElementById('devis-rows');
  tbody.innerHTML = rows.map((r) => `
    <tr data-row="${r.id}">
      <td><textarea class="devis-input devis-input--name" rows="1" placeholder="Ex : Ryzen 5 7600">${escapeHtml(r.name)}</textarea></td>
      <td><input type="number" class="devis-input devis-input--price" min="0" step="0.01" value="${r.price === '' ? '' : Number(r.price).toFixed(2)}" placeholder="0.00" /></td>
      <td class="devis-col-action">
        <button type="button" class="devis-remove-btn" aria-label="Supprimer" data-id="${r.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
        </button>
      </td>
    </tr>`).join('');

  tbody.querySelectorAll('.devis-input--name').forEach((inp) => {
    autoGrow(inp);
    inp.addEventListener('input', (e) => {
      const id = Number(e.target.closest('tr').dataset.row);
      rows.find((r) => r.id === id).name = e.target.value;
      autoGrow(e.target);
    });
  });
  tbody.querySelectorAll('.devis-input--price').forEach((inp) => {
    inp.addEventListener('input', (e) => {
      const id = Number(e.target.closest('tr').dataset.row);
      rows.find((r) => r.id === id).price = e.target.value === '' ? '' : parseFloat(e.target.value);
      updateTotals();
    });
    inp.addEventListener('blur', (e) => {
      if (e.target.value !== '' && !isNaN(parseFloat(e.target.value))) {
        e.target.value = parseFloat(e.target.value).toFixed(2);
      }
    });
  });
  tbody.querySelectorAll('.devis-remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => removeRow(Number(btn.dataset.id)));
  });

  updateTotals();
}

function updateTotals() {
  const subtotal = rows.reduce((s, r) => s + (Number(r.price) || 0), 0);
  document.getElementById('devis-subtotal').textContent = money(subtotal);

  const total = parseFloat(document.getElementById('devis-total').value) || 0;
  const margin = total - subtotal;
  document.getElementById('devis-margin').textContent = money(margin);
  document.getElementById('devis-margin-row').classList.toggle('devis-totals__row--negative', margin < 0);
}

/* ── Impression sur 1 page (comme les fiches produit) ── */
const A4_HEIGHT_PX = 1140;

function fitToOnePage() {
  const clientRow = document.getElementById('devis-client-row');
  if (clientRow) {
    const hasClient = document.getElementById('devis-client-input').value.trim() !== '';
    clientRow.style.display = hasClient ? '' : 'none';
  }

  const sheet = document.getElementById('devis-sheet');
  if (!sheet) return;
  sheet.style.zoom = 1;
  const natural = sheet.scrollHeight;
  if (natural > A4_HEIGHT_PX) {
    sheet.style.zoom = A4_HEIGHT_PX / natural;
  }
}

function resetZoom() {
  const sheet = document.getElementById('devis-sheet');
  if (sheet) sheet.style.zoom = '';

  const clientRow = document.getElementById('devis-client-row');
  if (clientRow) clientRow.style.display = '';
}

window.addEventListener('beforeprint', fitToOnePage);
window.addEventListener('afterprint', resetZoom);

async function init() {
  const ok = await checkAdmin();
  if (!ok) return;

  document.getElementById('devis-date').textContent = `Édité le ${todayLong()}`;

  const id = new URLSearchParams(location.search).get('id');
  if (id) {
    try {
      const { data } = await _sb.from('products').select('name').eq('id', id).single();
      if (data) {
        const tag = document.getElementById('devis-subtitle');
        tag.textContent = `Basé sur : ${data.name}`;
        tag.style.display = '';
      }
    } catch (err) {
      console.error('[Devis] Supabase error:', err);
    }
  }

  addRow();

  document.getElementById('devis-add-row').addEventListener('click', () => addRow());
  const totalInput = document.getElementById('devis-total');
  totalInput.addEventListener('input', updateTotals);
  totalInput.addEventListener('blur', (e) => {
    if (e.target.value !== '' && !isNaN(parseFloat(e.target.value))) {
      e.target.value = parseFloat(e.target.value).toFixed(2);
    }
  });
  document.getElementById('print-btn').addEventListener('click', () => window.print());
}

init();
