/* ===== AVIS CLIENTS ===== */

const STAR_PATH = 'M12 2.5l2.9 6.02 6.6.83-4.85 4.6 1.28 6.58L12 17.6l-5.93 2.93 1.28-6.58-4.85-4.6 6.6-.83z';

function starIcon(filled) {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="${STAR_PATH}"/></svg>`;
}

function starsDisplay(rating) {
  return `<span class="reviews__stars-display" aria-label="${rating} sur 5 étoiles">${
    [1, 2, 3, 4, 5].map(i => `<span class="${i <= rating ? 'filled' : ''}">${starIcon(i <= rating)}</span>`).join('')
  }</span>`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function niceDate(iso) {
  return new Intl.DateTimeFormat('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
}

let currentRating = 0;
let isAdmin = false;

/* ── Étoiles cliquables (formulaire) ── */
function buildStarsInput() {
  const wrap = document.getElementById('review-stars-input');
  wrap.innerHTML = [1, 2, 3, 4, 5].map(i => `
    <button type="button" class="reviews__star-btn" data-value="${i}" aria-label="${i} étoile${i > 1 ? 's' : ''}">
      ${starIcon(false)}
    </button>`).join('');

  const buttons = wrap.querySelectorAll('.reviews__star-btn');
  function paint(value) {
    buttons.forEach(btn => {
      const v = Number(btn.dataset.value);
      btn.classList.toggle('active', v <= value);
      btn.innerHTML = starIcon(v <= value);
    });
  }
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentRating = Number(btn.dataset.value);
      paint(currentRating);
    });
    btn.addEventListener('mouseenter', () => paint(Number(btn.dataset.value)));
  });
  wrap.addEventListener('mouseleave', () => paint(currentRating));
}

/* ── Résumé (moyenne + nombre) ── */
function renderSummary(reviews) {
  const el = document.getElementById('reviews-summary');
  if (!reviews.length) {
    el.innerHTML = '';
    return;
  }
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  el.innerHTML = `
    ${starsDisplay(Math.round(avg))}
    <span class="reviews__summary-text">${avg.toFixed(1)} / 5 — ${reviews.length} avis</span>
  `;
}

/* ── Liste des avis ── */
function renderList(reviews) {
  const list = document.getElementById('reviews-list');

  if (!reviews.length) {
    list.innerHTML = `<p class="reviews__empty">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</p>`;
    return;
  }

  list.innerHTML = reviews.map(r => `
    <div class="reviews__card">
      <div class="reviews__card-top">
        <div>
          <div class="reviews__card-name">${escapeHtml(r.name)}</div>
          ${starsDisplay(r.rating)}
        </div>
        <div class="reviews__card-right">
          <span class="reviews__card-date">${niceDate(r.created_at)}</span>
          ${isAdmin ? `<button type="button" class="reviews__delete-btn" data-id="${r.id}" aria-label="Supprimer cet avis">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </button>` : ''}
        </div>
      </div>
      ${r.comment ? `<p class="reviews__card-comment">${escapeHtml(r.comment)}</p>` : ''}
    </div>
  `).join('');

  list.querySelectorAll('.reviews__delete-btn').forEach(btn => {
    btn.addEventListener('click', () => askDeleteReview(btn.dataset.id));
  });
}

/* ── Confirmation de suppression (modale) ── */
let pendingDeleteId = null;

function askDeleteReview(id) {
  pendingDeleteId = id;
  document.getElementById('review-confirm-overlay').classList.add('open');
}

function closeDeleteConfirm() {
  document.getElementById('review-confirm-overlay').classList.remove('open');
  pendingDeleteId = null;
}

async function confirmDeleteReview() {
  if (!pendingDeleteId) return;
  const deleteBtn = document.getElementById('review-confirm-delete');
  deleteBtn.disabled = true;

  const { error } = await _sb.from('reviews').delete().eq('id', pendingDeleteId);

  deleteBtn.disabled = false;
  closeDeleteConfirm();

  if (error) { alert('Erreur lors de la suppression : ' + error.message); return; }
  loadReviews();
}

function bindDeleteConfirm() {
  const overlay = document.getElementById('review-confirm-overlay');
  document.getElementById('review-confirm-cancel').addEventListener('click', closeDeleteConfirm);
  document.getElementById('review-confirm-delete').addEventListener('click', confirmDeleteReview);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDeleteConfirm(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeDeleteConfirm();
  });
}

/* ── Chargement ── */
async function loadReviews() {
  const { data, error } = await _sb
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    document.getElementById('reviews-list').innerHTML = `<p class="reviews__empty">Impossible de charger les avis pour le moment.</p>`;
    return;
  }

  renderSummary(data || []);
  renderList(data || []);
}

/* ── Vérif admin (silencieuse, juste pour afficher les boutons supprimer) ── */
async function checkAdminSilent() {
  try {
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) return false;
    const { data } = await _sb.from('admins').select('email').eq('email', session.user.email).single();
    return !!data;
  } catch {
    return false;
  }
}

/* ── Soumission du formulaire ── */
function bindForm() {
  const form = document.getElementById('review-form');
  const msg = document.getElementById('review-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    msg.classList.remove('error');

    const name = document.getElementById('review-name').value.trim();
    const comment = document.getElementById('review-comment').value.trim();

    if (!name) {
      msg.textContent = 'Merci de renseigner votre nom.';
      msg.classList.add('error');
      return;
    }
    if (currentRating < 1) {
      msg.textContent = 'Merci de sélectionner une note.';
      msg.classList.add('error');
      return;
    }

    const submitBtn = document.getElementById('review-submit');
    submitBtn.disabled = true;

    const { error } = await _sb.from('reviews').insert({
      name,
      rating: currentRating,
      comment: comment || null,
    });

    submitBtn.disabled = false;

    if (error) {
      msg.textContent = "Erreur lors de l'envoi de l'avis. Réessayez.";
      msg.classList.add('error');
      return;
    }

    form.reset();
    currentRating = 0;
    buildStarsInput();
    msg.textContent = 'Merci pour votre avis !';
    loadReviews();
  });
}

async function init() {
  buildStarsInput();
  bindForm();
  bindDeleteConfirm();
  isAdmin = await checkAdminSilent();
  await loadReviews();
}

init();
