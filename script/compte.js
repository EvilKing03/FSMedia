// ===== VÉRIFICATION SESSION =====
let currentUser = null;

(async () => {
  const { data: { session } } = await _sb.auth.getSession();
  if (!session) {
    window.location.href = 'auth.html';
    return;
  }
  currentUser = session.user;
  await loadUserData();
})();

// ===== CHARGER LES DONNÉES =====
async function loadUserData() {
  const { data: profile } = await _sb.from('profiles').select('*').eq('id', currentUser.id).single();

  const user = {
    id:     currentUser.id,
    email:  currentUser.email,
    prenom: profile?.prenom || currentUser.email.split('@')[0],
    nom:    profile?.nom    || '',
    pseudo: profile?.pseudo || '',
    photo:  profile?.photo_url || null
  };

  // Mettre à jour le cache localStorage
  localStorage.setItem('fsmedia_user', JSON.stringify(user));

  // Avatar
  const avatarEl  = document.getElementById('compte-avatar');
  let   initSpan  = avatarEl.querySelector('.avatar-initials');
  let   avatarImg = avatarEl.querySelector('img');

  if (!initSpan) {
    initSpan = document.createElement('span');
    initSpan.className = 'avatar-initials';
    avatarEl.prepend(initSpan);
  }

  const initials = ((user.prenom?.[0] || '') + (user.nom?.[0] || '')).toUpperCase() || '?';
  initSpan.textContent = initials;

  if (user.photo) {
    if (!avatarImg) {
      avatarImg = document.createElement('img');
      avatarImg.alt = 'Photo de profil';
      avatarEl.prepend(avatarImg);
    }
    avatarImg.src = user.photo;
    initSpan.style.display = 'none';
  } else {
    if (avatarImg) avatarImg.remove();
    initSpan.style.display = '';
  }

  // Sidebar
  document.getElementById('compte-sidebar-name').textContent  = [user.prenom, user.nom].filter(Boolean).join(' ');
  document.getElementById('compte-sidebar-pseudo').textContent = user.pseudo || '';
  document.getElementById('compte-sidebar-email').textContent  = user.email  || '';

  // Formulaire profil
  document.getElementById('profil-pseudo').value = user.pseudo || '';
  document.getElementById('profil-prenom').value = user.prenom || '';
  document.getElementById('profil-nom').value    = user.nom    || '';
  document.getElementById('profil-email').value  = user.email  || '';
}

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
document.getElementById('compte-logout').addEventListener('click', async () => {
  await _sb.auth.signOut();
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
document.getElementById('profil-form').addEventListener('submit', async e => {
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

  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;

  // Mettre à jour le profil dans Supabase
  const { error: profileError } = await _sb.from('profiles').upsert({
    id:     currentUser.id,
    pseudo: pseudo.value.trim(),
    prenom: prenom.value.trim(),
    nom:    nom.value.trim()
  });

  // Mettre à jour l'email si changé
  if (email.value.trim() !== currentUser.email) {
    const { error: emailError } = await _sb.auth.updateUser({ email: email.value.trim() });
    if (emailError) {
      setError('email-error', 'Impossible de changer l\'email.');
      btn.disabled = false;
      return;
    }
  }

  btn.disabled = false;

  if (profileError) {
    const msg = profileError.message.includes('unique')
      ? 'Ce pseudo est déjà utilisé.'
      : 'Erreur lors de la sauvegarde.';
    setError('pseudo-error', msg);
    return;
  }

  await loadUserData();
  showToast('profil-toast', 'Modifications enregistrées !', 'success');
});

// ===== FORMULAIRE SÉCURITÉ =====
document.getElementById('securite-form').addEventListener('submit', async e => {
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

  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Mise à jour…';

  // Vérifier l'ancien mot de passe en re-authentifiant
  const { error: signInError } = await _sb.auth.signInWithPassword({
    email:    currentUser.email,
    password: oldPass.value
  });

  if (signInError) {
    btn.disabled = false;
    btn.innerHTML = 'Changer le mot de passe <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    setError('old-pass-error', 'Mot de passe actuel incorrect.');
    return;
  }

  const { error } = await _sb.auth.updateUser({ password: newPass.value });

  btn.disabled = false;
  btn.innerHTML = 'Changer le mot de passe <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  if (error) {
    setError('new-pass-error', 'Erreur lors du changement de mot de passe.');
    return;
  }

  oldPass.value = '';
  newPass.value = '';
  confirmPass.value = '';
  showToast('securite-toast', 'Mot de passe mis à jour !', 'success');
});

// ===== SUPPRESSION DU COMPTE =====
document.getElementById('delete-btn').addEventListener('click', async () => {
  const input = document.getElementById('delete-confirm-email');
  clearError('delete-error');

  if (!input.value.trim()) {
    setError('delete-error', 'Veuillez saisir votre adresse email pour confirmer.');
    return;
  }

  if (input.value.trim().toLowerCase() !== currentUser.email.toLowerCase()) {
    setError('delete-error', 'L\'adresse email ne correspond pas.');
    return;
  }

  // Suppression via Supabase (nécessite une Edge Function côté serveur pour delete user)
  // Pour l'instant : déconnexion + suppression du profil local
  await _sb.from('profiles').delete().eq('id', currentUser.id);
  await _sb.auth.signOut();
  localStorage.removeItem('fsmedia_user');
  window.location.href = 'index.html';
});

// ===== PHOTO DE PROFIL =====
const avatarEl    = document.getElementById('compte-avatar');
const avatarInput = document.getElementById('avatar-input');

avatarEl.addEventListener('click', () => avatarInput.click());

avatarInput.addEventListener('change', async () => {
  const file = avatarInput.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert('La photo ne doit pas dépasser 2 Mo.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;

    await _sb.from('profiles').upsert({
      id:        currentUser.id,
      photo_url: base64
    });

    // Mettre à jour le cache
    const cached = JSON.parse(localStorage.getItem('fsmedia_user') || '{}');
    cached.photo = base64;
    localStorage.setItem('fsmedia_user', JSON.stringify(cached));

    await loadUserData();
  };
  reader.readAsDataURL(file);
  avatarInput.value = '';
});
