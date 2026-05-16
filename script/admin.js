/* ===== ADMIN PANEL ===== */

let _editingId = null;
let _deleteId  = null;
let _uploadedImageUrl = null;

/* ── Auth guard ── */
async function checkAdmin() {
  const { data: { session } } = await _sb.auth.getSession();
  if (!session) { location.href = 'auth.html?redirect=admin.html'; return false; }

  const email = session.user.email;
  document.getElementById('admin-user-email').textContent = email;

  const { data, error } = await _sb.from('admins').select('email').eq('email', email).single();
  if (error || !data) {
    alert('Accès refusé. Ce compte n\'est pas administrateur.');
    await _sb.auth.signOut();
    const u = JSON.parse(localStorage.getItem('fsmedia_user') || '{}');
    delete u.isAdmin;
    localStorage.setItem('fsmedia_user', JSON.stringify(u));
    location.href = 'index.html';
    return false;
  }
  // Marquer comme admin dans le cache local pour le drawer mobile
  const u = JSON.parse(localStorage.getItem('fsmedia_user') || '{}');
  u.isAdmin = true;
  localStorage.setItem('fsmedia_user', JSON.stringify(u));
  return true;
}

/* ── Logout ── */
document.getElementById('logout-btn').addEventListener('click', async () => {
  await _sb.auth.signOut();
  location.href = 'index.html';
});

/* ── Render ── */
function badgeClass(type) {
  return { new: 'new', promo: 'promo', sold: 'sold', refurb: 'refurb' }[type] || 'new';
}

function renderGrid(products) {
  const grid = document.getElementById('admin-grid');
  document.getElementById('products-count').textContent =
    products.length === 0 ? 'Aucun produit' :
    products.length === 1 ? '1 produit' : `${products.length} produits`;

  if (!products.length) {
    grid.innerHTML = `
      <div class="admin-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        <p>Aucun produit dans le catalogue.<br>Commencez par en ajouter un.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="admin-card">
      ${p.image_url
        ? `<img class="admin-card__thumb" src="${p.image_url}" alt="${escHtml(p.name)}" />`
        : `<div class="admin-card__thumb--empty"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`
      }
      <div class="admin-card__body">
        <div class="admin-card__name">${escHtml(p.name)}</div>
        <div class="admin-card__meta">
          <span class="admin-card__cat">${escHtml(p.category || '')}</span>
          ${p.badge ? `<span class="admin-card__badge admin-card__badge--${badgeClass(p.badge_type)}">${escHtml(p.badge)}</span>` : ''}
        </div>
        <div class="admin-card__price">${p.price_label ? `<span style="font-size:0.72rem;font-weight:400;color:var(--text-muted);margin-right:4px">${escHtml(p.price_label)}</span>` : ''}${escHtml(p.price || '')}</div>
      </div>
      <div class="admin-card__actions">
        <button class="admin-btn admin-btn--ghost admin-btn--sm" onclick="openModal('${p.id}')">Modifier</button>
        <button class="admin-btn admin-btn--sm admin-btn--danger" onclick="askDelete('${p.id}')">Supprimer</button>
      </div>
    </div>`).join('');
}

/* ── Load products ── */
async function loadProducts() {
  const { data, error } = await _sb
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    document.getElementById('admin-grid').innerHTML =
      `<p style="color:#ef4444;padding:40px">Erreur : ${error.message}</p>`;
    return;
  }
  renderGrid(data || []);
}

/* ── Specs helpers ── */
function addSpecRow(key = '', val = '') {
  const list = document.getElementById('specs-list');
  const row = document.createElement('div');
  row.className = 'admin-spec-row';
  row.innerHTML = `
    <input type="text" placeholder="Composant (ex: CPU)" value="${escHtml(key)}" data-spec="key" />
    <input type="text" placeholder="Valeur (ex: Ryzen 5 5600)" value="${escHtml(val)}" data-spec="val" />
    <button type="button" class="admin-spec-remove" title="Supprimer">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  row.querySelector('.admin-spec-remove').addEventListener('click', () => row.remove());
  list.appendChild(row);
}

document.getElementById('add-spec-btn').addEventListener('click', () => addSpecRow());

function getSpecs() {
  const rows = document.querySelectorAll('.admin-spec-row');
  const specs = {};
  rows.forEach(row => {
    const k = row.querySelector('[data-spec="key"]').value.trim();
    const v = row.querySelector('[data-spec="val"]').value.trim();
    if (k) specs[k] = v;
  });
  return specs;
}

/* ── Image upload ── */
document.getElementById('f-image').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showSaveError('Image trop lourde (max 5 Mo).');
    return;
  }

  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await _sb.storage
    .from('product-images')
    .upload(fileName, file, { upsert: false });

  if (error) { showSaveError('Erreur upload : ' + error.message); return; }

  const { data: urlData } = _sb.storage.from('product-images').getPublicUrl(fileName);
  _uploadedImageUrl = urlData.publicUrl;

  const preview = document.getElementById('image-preview');
  preview.innerHTML = `<img src="${_uploadedImageUrl}" alt="preview" />`;
  document.getElementById('remove-image-btn').style.display = 'inline-flex';
});

document.getElementById('remove-image-btn').addEventListener('click', () => {
  _uploadedImageUrl = null;
  const preview = document.getElementById('image-preview');
  preview.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    <span>Aucune image</span>`;
  document.getElementById('remove-image-btn').style.display = 'none';
  document.getElementById('f-image').value = '';
});

/* ── Open modal ── */
async function openModal(id = null) {
  _editingId = id;
  _uploadedImageUrl = null;
  document.getElementById('specs-list').innerHTML = '';
  document.getElementById('product-form').reset();
  document.getElementById('remove-image-btn').style.display = 'none';
  document.getElementById('image-preview').innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    <span>Aucune image</span>`;
  showSaveError('');

  if (id) {
    document.getElementById('modal-title').textContent = 'Modifier le produit';
    document.getElementById('save-label').textContent = 'Enregistrer';

    const { data: p, error } = await _sb.from('products').select('*').eq('id', id).single();
    if (error || !p) { alert('Produit introuvable.'); return; }

    document.getElementById('f-id').value = p.id;
    document.getElementById('f-name').value = p.name || '';
    document.getElementById('f-category').value = p.category || 'gaming';
    document.getElementById('f-category-label').value = p.category_label || '';
    document.getElementById('f-price').value = p.price || '';
    document.getElementById('f-price-label').value = p.price_label || '';
    document.getElementById('f-hint').value = p.hint || '';
    document.getElementById('f-badge').value = p.badge || '';
    document.getElementById('f-badge-type').value = p.badge_type || 'new';
    document.getElementById('f-contact-subject').value = p.contact_subject || '';
    document.getElementById('f-cta-label').value = p.cta_label || 'Commander';
    document.getElementById('f-sort-order').value = p.sort_order ?? 0;

    if (p.image_url) {
      _uploadedImageUrl = p.image_url;
      document.getElementById('image-preview').innerHTML = `<img src="${p.image_url}" alt="preview" />`;
      document.getElementById('remove-image-btn').style.display = 'inline-flex';
    }

    const specs = p.specs || {};
    Object.entries(specs).forEach(([k, v]) => addSpecRow(k, v));
  } else {
    document.getElementById('modal-title').textContent = 'Ajouter un produit';
    document.getElementById('save-label').textContent = 'Ajouter';
    document.getElementById('f-cta-label').value = 'Commander';
    document.getElementById('f-sort-order').value = '0';
  }

  document.getElementById('product-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('product-overlay').classList.remove('open');
  _editingId = null;
}

/* ── Save ── */
document.getElementById('modal-save').addEventListener('click', async () => {
  const name = document.getElementById('f-name').value.trim();
  if (!name) { showSaveError('Le nom du produit est requis.'); return; }

  const price = document.getElementById('f-price').value.trim();
  if (!price) { showSaveError('Le prix est requis.'); return; }

  const payload = {
    name,
    category:        document.getElementById('f-category').value,
    category_label:  document.getElementById('f-category-label').value.trim() || null,
    price,
    price_label:     document.getElementById('f-price-label').value.trim() || null,
    hint:            document.getElementById('f-hint').value.trim() || null,
    badge:           document.getElementById('f-badge').value || null,
    badge_type:      document.getElementById('f-badge-type').value || null,
    contact_subject: document.getElementById('f-contact-subject').value.trim() || null,
    cta_label:       document.getElementById('f-cta-label').value.trim() || 'Commander',
    sort_order:      parseInt(document.getElementById('f-sort-order').value) || 0,
    image_url:       _uploadedImageUrl || null,
    specs:           getSpecs(),
  };

  const saveLabel = document.getElementById('save-label');
  saveLabel.textContent = 'Sauvegarde…';
  document.getElementById('modal-save').disabled = true;

  let error;
  if (_editingId) {
    ({ error } = await _sb.from('products').update(payload).eq('id', _editingId));
  } else {
    ({ error } = await _sb.from('products').insert(payload));
  }

  saveLabel.textContent = _editingId ? 'Enregistrer' : 'Ajouter';
  document.getElementById('modal-save').disabled = false;

  if (error) { showSaveError('Erreur : ' + error.message); return; }

  closeModal();
  await loadProducts();
});

/* ── Delete ── */
function askDelete(id) {
  _deleteId = id;
  document.getElementById('confirm-overlay').classList.add('open');
}

document.getElementById('confirm-delete').addEventListener('click', async () => {
  if (!_deleteId) return;
  const { error } = await _sb.from('products').delete().eq('id', _deleteId);
  document.getElementById('confirm-overlay').classList.remove('open');
  _deleteId = null;
  if (error) { alert('Erreur suppression : ' + error.message); return; }
  await loadProducts();
});

document.getElementById('confirm-cancel').addEventListener('click', () => {
  document.getElementById('confirm-overlay').classList.remove('open');
  _deleteId = null;
});

/* ── Modal triggers ── */
document.getElementById('add-btn').addEventListener('click', () => openModal());
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);

document.getElementById('product-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('product-overlay')) closeModal();
});
document.getElementById('confirm-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('confirm-overlay')) {
    document.getElementById('confirm-overlay').classList.remove('open');
    _deleteId = null;
  }
});

/* ── Helpers ── */
function escHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

function showSaveError(msg) {
  document.getElementById('save-error').textContent = msg;
}

/* ── Init ── */
(async () => {
  const ok = await checkAdmin();
  if (ok) await loadProducts();
})();
