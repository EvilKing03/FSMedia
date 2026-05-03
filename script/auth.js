// Rediriger si déjà connecté
(async () => {
  const { data: { session } } = await _sb.auth.getSession();
  if (session) window.location.href = 'index.html';
})();

// ===== TABS =====
const tabs      = document.querySelectorAll('.auth-tab');
const indicator = document.querySelector('.auth-tab-indicator');
const loginForm = document.getElementById('login-form');
const regForm   = document.getElementById('register-form');
const successEl = document.getElementById('auth-success');

function switchTab(tab) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  indicator.classList.toggle('right', tab === 'register');
  loginForm.style.display = tab === 'login'    ? 'flex' : 'none';
  regForm.style.display   = tab === 'register' ? 'flex' : 'none';
  clearErrors();
}

tabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

document.querySelectorAll('.auth-switch-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ===== PASSWORD VISIBILITY =====
document.querySelectorAll('.auth-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const input    = document.getElementById(btn.dataset.target);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.querySelector('.eye-show').style.display = isHidden ? 'none' : '';
    btn.querySelector('.eye-hide').style.display = isHidden ? '' : 'none';
  });
});

// ===== PASSWORD STRENGTH =====
const regPassword   = document.getElementById('reg-password');
const strengthFill  = document.getElementById('strength-fill');
const strengthLabel = document.getElementById('strength-label');

regPassword.addEventListener('input', () => {
  const val = regPassword.value;
  if (!val) {
    strengthFill.className  = 'auth-strength-fill';
    strengthLabel.className = 'auth-strength-label';
    strengthLabel.textContent = '';
    return;
  }
  const score =
    (val.length >= 8          ? 1 : 0) +
    (/[A-Z]/.test(val)        ? 1 : 0) +
    (/[0-9]/.test(val)        ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(val) ? 1 : 0);

  const level = score <= 1 ? 'weak' : score <= 2 ? 'medium' : 'strong';
  const label = { weak: 'Faible', medium: 'Moyen', strong: 'Fort' }[level];

  strengthFill.className  = `auth-strength-fill ${level}`;
  strengthLabel.className = `auth-strength-label ${level}`;
  strengthLabel.textContent = label;
});

// ===== VALIDATION HELPERS =====
function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function setInputState(input, isValid) {
  input.classList.toggle('invalid', !isValid);
  input.classList.toggle('valid',    isValid);
}

function clearErrors() {
  document.querySelectorAll('.auth-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.auth-input-wrap input').forEach(inp => {
    inp.classList.remove('invalid', 'valid');
  });
  document.querySelectorAll('.auth-global-error').forEach(el => {
    el.textContent = '';
    el.classList.remove('visible');
  });
}

function showGlobalError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ===== LOGIN =====
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearErrors();

  const email = document.getElementById('login-email');
  const pass  = document.getElementById('login-password');
  let valid   = true;

  if (!isValidEmail(email.value.trim())) {
    setError('login-email-error', 'Adresse email invalide.');
    setInputState(email, false);
    valid = false;
  } else { setInputState(email, true); }

  if (pass.value.length < 6) {
    setError('login-password-error', 'Mot de passe trop court.');
    setInputState(pass, false);
    valid = false;
  } else { setInputState(pass, true); }

  if (!valid) return;

  const btn = document.getElementById('login-btn');
  btn.textContent = 'Connexion…';
  btn.disabled    = true;

  const { data, error } = await _sb.auth.signInWithPassword({
    email:    email.value.trim(),
    password: pass.value
  });

  if (error) {
    btn.textContent = 'Se connecter';
    btn.disabled    = false;
    const msg = error.message.includes('Email not confirmed')
      ? 'Confirmez votre email avant de vous connecter.'
      : 'Email ou mot de passe incorrect.';
    showGlobalError('login-global-error', msg);
    return;
  }

  // Charger le profil et mettre en cache localStorage
  const { data: profile } = await _sb.from('profiles').select('*').eq('id', data.user.id).single();
  localStorage.setItem('fsmedia_user', JSON.stringify({
    id:     data.user.id,
    email:  data.user.email,
    prenom: profile?.prenom || data.user.email.split('@')[0],
    nom:    profile?.nom    || '',
    pseudo: profile?.pseudo || '',
    photo:  profile?.photo_url || null
  }));

  window.location.href = 'index.html';
});

// ===== REGISTER =====
regForm.addEventListener('submit', async e => {
  e.preventDefault();
  clearErrors();

  const prenom  = document.getElementById('reg-prenom');
  const nom     = document.getElementById('reg-nom');
  const email   = document.getElementById('reg-email');
  const pass    = document.getElementById('reg-password');
  const confirm = document.getElementById('reg-confirm');
  let valid     = true;

  if (!prenom.value.trim()) {
    setError('reg-prenom-error', 'Prénom requis.');
    setInputState(prenom, false);
    valid = false;
  } else { setInputState(prenom, true); }

  if (!nom.value.trim()) {
    setError('reg-nom-error', 'Nom requis.');
    setInputState(nom, false);
    valid = false;
  } else { setInputState(nom, true); }

  if (!isValidEmail(email.value.trim())) {
    setError('reg-email-error', 'Adresse email invalide.');
    setInputState(email, false);
    valid = false;
  } else { setInputState(email, true); }

  if (pass.value.length < 8) {
    setError('reg-password-error', 'Le mot de passe doit faire au moins 8 caractères.');
    setInputState(pass, false);
    valid = false;
  } else { setInputState(pass, true); }

  if (confirm.value !== pass.value) {
    setError('reg-confirm-error', 'Les mots de passe ne correspondent pas.');
    setInputState(confirm, false);
    valid = false;
  } else if (confirm.value) { setInputState(confirm, true); }

  if (!valid) return;

  const btn = document.getElementById('register-btn');
  btn.textContent = 'Création…';
  btn.disabled    = true;

  const { error } = await _sb.auth.signUp({
    email:    email.value.trim(),
    password: pass.value,
    options: {
      data: {
        prenom: prenom.value.trim(),
        nom:    nom.value.trim()
      }
    }
  });

  btn.textContent = 'Créer mon compte';
  btn.disabled    = false;

  if (error) {
    const msg = error.message.includes('already registered')
      ? 'Un compte existe déjà avec cet email.'
      : 'Erreur lors de la création du compte. Réessayez.';
    showGlobalError('register-global-error', msg);
    return;
  }

  showSuccess(
    'Vérifiez votre email !',
    `Un lien de confirmation a été envoyé à ${email.value.trim()}. Cliquez dessus pour activer votre compte.`
  );
});

// ===== SUCCESS =====
function showSuccess(title, desc) {
  loginForm.style.display = 'none';
  regForm.style.display   = 'none';
  successEl.style.display = 'flex';
  document.getElementById('success-title').textContent = title;
  document.getElementById('success-desc').textContent  = desc;
}

document.querySelectorAll('.auth-input-wrap input').forEach(inp => {
  inp.addEventListener('focus', () => inp.classList.remove('invalid', 'valid'));
});
