// Rediriger si non connecté
const userData = JSON.parse(localStorage.getItem('fsmedia_user') || 'null');
if (!userData) {
  window.location.href = 'auth.html';
}

// ===== CHARGER LES DONNÉES =====
function loadUserData() {
  const user = JSON.parse(localStorage.getItem('fsmedia_user') || 'null');
  if (!user) return;

  // Sidebar
  const initials = ((user.prenom?.[0] || '') + (user.nom?.[0] || '')).toUpperCase() || user.prenom?.[0]?.toUpperCase() || '?';
  document.getElementById('compte-avatar').textContent = initials;
  document.getElementById('compte-sidebar-name').textContent = [user.prenom, user.nom].filter(Boolean).join(' ');
  document.getElementById('compte-sidebar-pseudo').textContent = user.pseudo || '';
  document.getElementById('compte-sidebar-email').textContent = user.email || '';

  // Formulaire profil
  document.getElementById('profil-pseudo').value = user.pseudo || '';
  document.getElementById('profil-prenom').value = user.prenom || '';
  document.getElementById('profil-nom').value    = user.nom    || '';
  document.getElementById('profil-email').value  = user.email  || '';
}

loadUserData();

// ===== NAVIGATION SIDEBAR =====
const navItems = document.querySelectorAll('.compte-nav-item');
const panels   = document.querySelectorAll('.compte-panel');

navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.section;
    navItems.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('section-' + target).classList.add('active');
  });
});

// ===== DÉCONNEXION =====
document.getElementById('compte-logout').addEventListener('click', () => {
  localStorage.removeItem('fsmedia_user');
  window.location.href = 'index.html';
});

// ===== VALIDATION HELPERS =====
function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = '';
}

function showToast(id, msg, type = 'success') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = 'compte-toast ' + type;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.textContent = '';
    el.className = 'compte-toast';
  }, 3500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ===== FORMULAIRE PROFIL =====
document.getElementById('profil-form').addEventListener('submit', e => {
  e.preventDefault();

  const pseudo = document.getElementById('profil-pseudo');
  const prenom = document.getElementById('profil-prenom');
  const nom    = document.getElementById('profil-nom');
  const email  = document.getElementById('profil-email');
  let valid    = true;

  clearError('pseudo-error');
  clearError('prenom-error');
  clearError('nom-error');
  clearError('email-error');

  if (pseudo.value && !/^[a-zA-Z0-9_]{1,24}$/.test(pseudo.value)) {
    setError('pseudo-error', 'Lettres, chiffres et _ uniquement (max 24 caractères).');
    valid = false;
  }

  if (!prenom.value.trim()) {
    setError('prenom-error', 'Prénom requis.');
    valid = false;
  }

  if (!nom.value.trim()) {
    setError('nom-error', 'Nom requis.');
    valid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    setError('email-error', 'Adresse email invalide.');
    valid = false;
  }

  if (!valid) return;

  const user = JSON.parse(localStorage.getItem('fsmedia_user') || '{}');
  user.pseudo = pseudo.value.trim();
  user.prenom = prenom.value.trim();
  user.nom    = nom.value.trim();
  user.email  = email.value.trim();
  localStorage.setItem('fsmedia_user', JSON.stringify(user));

  loadUserData();
  showToast('profil-toast', 'Modifications enregistrées !', 'success');
});

// ===== FORMULAIRE SÉCURITÉ =====
document.getElementById('securite-form').addEventListener('submit', e => {
  e.preventDefault();

  const oldPass     = document.getElementById('old-password');
  const newPass     = document.getElementById('new-password');
  const confirmPass = document.getElementById('confirm-password');
  let valid         = true;

  clearError('old-pass-error');
  clearError('new-pass-error');
  clearError('confirm-pass-error');

  if (!oldPass.value) {
    setError('old-pass-error', 'Mot de passe actuel requis.');
    valid = false;
  }

  if (newPass.value.length < 8) {
    setError('new-pass-error', 'Le mot de passe doit faire au moins 8 caractères.');
    valid = false;
  }

  if (confirmPass.value !== newPass.value) {
    setError('confirm-pass-error', 'Les mots de passe ne correspondent pas.');
    valid = false;
  }

  if (!valid) return;

  // Simulation — à remplacer par appel API
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Mise à jour…';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = 'Changer le mot de passe <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    oldPass.value = '';
    newPass.value = '';
    confirmPass.value = '';
    showToast('securite-toast', 'Mot de passe mis à jour !', 'success');
  }, 1000);
});

// ===== SUPPRESSION DU COMPTE =====
document.getElementById('delete-btn').addEventListener('click', () => {
  const input = document.getElementById('delete-confirm-email');
  const user  = JSON.parse(localStorage.getItem('fsmedia_user') || '{}');
  clearError('delete-error');

  if (!input.value.trim()) {
    setError('delete-error', 'Veuillez saisir votre adresse email pour confirmer.');
    return;
  }

  if (input.value.trim().toLowerCase() !== (user.email || '').toLowerCase()) {
    setError('delete-error', 'L\'adresse email ne correspond pas.');
    return;
  }

  localStorage.removeItem('fsmedia_user');
  window.location.href = 'index.html';
});
