/* ===== FICHE TECHNIQUE IMPRIMABLE ===== */

async function checkAdmin() {
  const { data: { session } } = await _sb.auth.getSession();
  if (!session) {
    location.href = 'auth.html?redirect=' + encodeURIComponent('fiche-technique.html' + location.search);
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

function specsEntries(p) {
  if (!p.specs) return [];
  if (Array.isArray(p.specs)) {
    return p.specs.filter(s => s.label).map(s => [s.label, s.value]);
  }
  return Object.entries(p.specs);
}

function todayLong() {
  return new Intl.DateTimeFormat('fr-BE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
}

function renderSheet(p) {
  document.title = `Fiche technique — ${p.name}`;

  const imgSrc = p.image_url || (p.image ? `images/${p.image}` : null);
  const specsHtml = specsEntries(p).map(([k, v]) => `
    <tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>
  `).join('');

  document.getElementById('fiche-sheet').innerHTML = `
    <header class="fiche-header">
      <div class="fiche-header__brand">
        <img src="../images/favicon1.png" alt="" />
        <span>FS<strong>Media</strong></span>
      </div>
      <div class="fiche-header__meta">
        <span class="fiche-header__title">Fiche technique produit</span>
        <span class="fiche-header__date">Éditée le ${todayLong()}</span>
      </div>
    </header>

    <section class="fiche-product">
      ${imgSrc ? `<div class="fiche-product__img"><img src="${imgSrc}" alt="${escapeHtml(p.name)}" /></div>` : ''}
      <div class="fiche-product__main">
        <span class="fiche-product__cat">${escapeHtml(p.category_label || p.category || '')}</span>
        <h1 class="fiche-product__name">${escapeHtml(p.name)}</h1>
        ${p.hint ? `<p class="fiche-product__hint">${escapeHtml(p.hint)}</p>` : ''}
        <div class="fiche-product__price">
          ${escapeHtml(p.price || '')}
          ${p.price_label ? `<span>${escapeHtml(p.price_label)}</span>` : ''}
        </div>
      </div>
    </section>

    ${specsHtml ? `
    <section class="fiche-specs">
      <h2>Spécifications</h2>
      <table class="fiche-specs__table">
        <tbody>${specsHtml}</tbody>
      </table>
    </section>` : ''}

    <section class="fiche-sale">
      <h2>Informations de vente</h2>
      <div class="fiche-sale__grid">
        <div class="fiche-sale__field"><span>Date de vente</span><i></i></div>
        <div class="fiche-sale__field"><span>Vendu par</span><i></i></div>
      </div>
      <div class="fiche-sale__note">
        <span>Remarques</span>
        <i></i>
      </div>
    </section>

    <footer class="fiche-footer">
      <div class="fiche-footer__info">
        <span>FSMedia — Vente, réparation et conseil informatique</span>
        <span>contact@fsmedia.be · fsmedia.be</span>
      </div>
      <div class="fiche-footer__qr">
        <img id="fiche-qr" alt="QR code vers la fiche produit" />
        <span>Voir en ligne</span>
      </div>
    </footer>
  `;

  const qrImg = document.getElementById('fiche-qr');
  if (qrImg && window.qrcode) {
    const qr = qrcode(0, 'M');
    qr.addData('https://fsmedia.be/');
    qr.make();
    qrImg.src = qr.createDataURL(4, 0);
  }
}

function renderNotFound() {
  document.getElementById('fiche-sheet').innerHTML = `
    <p class="fiche-loading">Produit introuvable. <a href="admin.html">Retour à l'admin</a></p>`;
}

document.getElementById('print-btn').addEventListener('click', () => window.print());

/* ── Tenir sur 1 seule page à l'impression ── */
const A4_HEIGHT_PX = 1140; // ~297mm à 96dpi (1122px) + marge pour le min-height du pied de page

function fitToOnePage() {
  const sheet = document.getElementById('fiche-sheet');
  if (!sheet) return;
  sheet.style.zoom = 1;
  const natural = sheet.scrollHeight;
  if (natural > A4_HEIGHT_PX) {
    sheet.style.zoom = A4_HEIGHT_PX / natural;
  }
}

function resetZoom() {
  const sheet = document.getElementById('fiche-sheet');
  if (sheet) sheet.style.zoom = '';
}

window.addEventListener('beforeprint', fitToOnePage);
window.addEventListener('afterprint', resetZoom);

async function init() {
  const ok = await checkAdmin();
  if (!ok) return;

  const id = new URLSearchParams(location.search).get('id');
  if (!id) { renderNotFound(); return; }

  try {
    const { data, error } = await _sb.from('products').select('*').eq('id', id).single();
    if (error || !data) throw error || new Error('not found');
    renderSheet(data);
  } catch (err) {
    console.error('[Fiche] Supabase error:', err);
    renderNotFound();
  }
}

init();
