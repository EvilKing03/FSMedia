// ===== PRÉ-REMPLISSAGE DEPUIS LE COMPTE =====
(function () {
  const user = JSON.parse(localStorage.getItem('fsmedia_user') || 'null');
  if (!user) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
  set('prenom', user.prenom);
  set('nom',    user.nom);
  set('email',  user.email);
})();

// ===== PRÉ-REMPLISSAGE SUJET DEPUIS L'URL =====
const params = new URLSearchParams(window.location.search);
const sujet = params.get('sujet');
if (sujet) {
  const select = document.getElementById('sujet');
  if (select) {
    [...select.options].forEach(opt => {
      if (opt.value.toLowerCase().includes(sujet.toLowerCase()) ||
          sujet.toLowerCase().includes(opt.value.toLowerCase())) {
        opt.selected = true;
      }
    });
  }
}

// ===== ENVOI FORMULAIRE =====
const WEB3FORMS_KEY = 'cc6957f4-66d9-4915-a1d5-8eb305458999';
const form       = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

function validateForm() {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) { field.style.borderColor = '#FF6B6B'; valid = false; }
  });
  const emailField = form.querySelector('input[type="email"]');
  if (emailField?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    emailField.style.borderColor = '#FF6B6B'; valid = false;
  }
  return valid;
}

async function submitToWeb3Forms() {
  const data = new FormData(form);
  data.append('access_key', WEB3FORMS_KEY);
  data.append('subject', `[FSMedia] Nouveau message — ${data.get('sujet') || 'Contact'}`);
  data.append('from_name', `${data.get('prenom')} ${data.get('nom')}`);
  const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
  const json = await res.json();
  return json.success;
}

function showSuccess() {
  form.style.display = 'none';
  document.getElementById('otp-step').style.display = 'none';
  if (successMsg) successMsg.style.display = 'block';
}

let countdownTimer = null;

function startCountdown() {
  let seconds = 60;
  const resendBtn = document.getElementById('otp-resend-btn');
  resendBtn.disabled = true;
  resendBtn.textContent = `Renvoyer (${seconds}s)`;
  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      resendBtn.disabled = false;
      resendBtn.textContent = 'Renvoyer le code';
    } else {
      resendBtn.textContent = `Renvoyer (${seconds}s)`;
    }
  }, 1000);
}

async function sendOtp(email) {
  const { error } = await _sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  return !error;
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.textContent = 'Vérification…';
    submitBtn.disabled = true;

    const { data: { session } } = await _sb.auth.getSession();

    if (session) {
      // Déjà authentifié — envoi direct
      try {
        const ok = await submitToWeb3Forms();
        if (ok) {
          showSuccess();
        } else {
          submitBtn.textContent = 'Erreur — Réessayer';
          submitBtn.disabled = false;
        }
      } catch {
        submitBtn.textContent = 'Erreur réseau — Réessayer';
        submitBtn.disabled = false;
      }
    } else {
      // Non authentifié — envoi OTP
      const email = form.querySelector('input[type="email"]').value.trim();
      const ok = await sendOtp(email);

      submitBtn.textContent = 'Envoyer le message';
      submitBtn.disabled = false;

      if (!ok) return;

      document.getElementById('otp-email-display').textContent = email;
      document.getElementById('otp-step').style.display = 'block';
      document.querySelector('.form-submit').style.display = 'none';
      document.getElementById('otp-code').focus();
      startCountdown();
    }
  });

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => { field.style.borderColor = ''; });
  });
}

// ===== OTP VERIFY =====
document.getElementById('otp-verify-btn')?.addEventListener('click', async () => {
  const code      = document.getElementById('otp-code').value.trim();
  const email     = form.querySelector('input[type="email"]').value.trim();
  const errorEl   = document.getElementById('otp-error');
  const verifyBtn = document.getElementById('otp-verify-btn');

  errorEl.textContent = '';

  if (!/^\d{6}$/.test(code)) {
    errorEl.textContent = 'Entrez les 6 chiffres du code.';
    return;
  }

  verifyBtn.textContent = 'Vérification…';
  verifyBtn.disabled = true;

  const { error } = await _sb.auth.verifyOtp({ email, token: code, type: 'email' });

  if (error) {
    verifyBtn.textContent = 'Vérifier et envoyer';
    verifyBtn.disabled = false;
    errorEl.textContent = 'Code invalide ou expiré. Réessayez.';
    return;
  }

  try {
    const ok = await submitToWeb3Forms();
    if (ok) {
      await _sb.auth.signOut();
      showSuccess();
    } else {
      verifyBtn.textContent = 'Vérifier et envoyer';
      verifyBtn.disabled = false;
      errorEl.textContent = 'Erreur lors de l\'envoi. Réessayez.';
    }
  } catch {
    verifyBtn.textContent = 'Vérifier et envoyer';
    verifyBtn.disabled = false;
    errorEl.textContent = 'Erreur réseau. Réessayez.';
  }
});

document.getElementById('otp-resend-btn')?.addEventListener('click', async () => {
  const email = form.querySelector('input[type="email"]').value.trim();
  document.getElementById('otp-error').textContent = '';
  await sendOtp(email);
  startCountdown();
});

document.getElementById('otp-code')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('otp-verify-btn').click();
});

// ===== APPARITION CARDS =====
const contactCards = document.querySelectorAll('.contact-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, i * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

contactCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(-16px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});
