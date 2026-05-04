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

// ===== BLACKLIST EMAILS JETABLES =====
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','mailinator2.com','guerrillamail.com','guerrillamail.info',
  'guerrillamail.biz','guerrillamail.de','guerrillamail.net','guerrillamail.org',
  'sharklasers.com','grr.la','guerrillamailblock.com','spam4.me',
  'yopmail.com','yopmail.fr','cool.fr.nf','jetable.fr.nf','courriel.fr.nf',
  'trashmail.com','trashmail.at','trashmail.io','trashmail.me',
  'trashmail.net','trashmail.org','trashmail.xyz',
  '10minutemail.com','10minutemail.net','10minutemail.org','10minutemail.de',
  '20minutemail.com','tempmail.com','temp-mail.org','temp-mail.ru',
  'throwam.com','throwaway.email','dispostable.com','mailnull.com',
  'fakeinbox.com','fakeinbox.info','fakemail.fr','fakemail.net',
  'jetable.com','jetable.net','jetable.org',
  'discard.email','discardmail.com','discardmail.de',
  'maildrop.cc','mailbucket.org','mailcatch.com','mailexpire.com',
  'mailguard.me','mailseal.de','mailsucker.net','mailtv.net',
  'mailzilla.com','mailzilla.org','mailnesia.com','mailtemp.info',
  'spamgourmet.com','spamgourmet.net','spamgourmet.org',
  'spambox.us','spamex.com','spamhole.com','spamtroll.net',
  'spam.la','spamoff.de','spaml.com','spammotel.com',
  'mytrashmail.com','meltmail.com','mohmal.com',
  'moakt.co','moakt.com','moakt.ws',
  'tempr.email','tempinbox.com','tempmailaddress.com','tempmailo.com',
  'mintemail.com','instant-mail.de','rcpt.at',
  'nwytg.net','mailme24.com','harakirimail.com',
  'filzmail.com','getonemail.com','getonemail.net',
  'binkmail.com','bobmail.info','devnullmail.com',
  'mail-temporaire.com','mail-temporaire.fr',
  'getairmail.com','crazymailing.com','spamthisplease.com',
  'incognitomail.com','incognitomail.net','incognitomail.org',
  'deadaddress.com','despam.it','dontreg.com','dontsendmespam.de',
  'e4ward.com','emailias.com','emailinfive.com',
  'fastacura.com','fux0ringduh.com','girlsundertheinfluence.com','gishpuppy.com',
  'nomail.xl.cx','no-spam.ws','nobulk.com','noclickemail.com',
  'nodensity.com','nogmailspam.info','nospam.ze.tc','nospam4.us',
  'nospamfor.us','nospammail.net','nospamthanks.info',
]);

function isDisposableEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
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
  const { error } = await _sb.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: window.location.origin + '/contact.html'
    }
  });
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
      return;
    }

    // Non authentifié — vérification email
    const emailField = form.querySelector('input[type="email"]');
    const email = emailField.value.trim();

    if (isDisposableEmail(email)) {
      emailField.style.borderColor = '#FF6B6B';
      let errEl = document.getElementById('email-disposable-error');
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.id = 'email-disposable-error';
        errEl.style.cssText = 'font-size:0.8rem;color:#ef4444;margin-top:-6px;display:block;';
        emailField.parentElement.appendChild(errEl);
      }
      errEl.textContent = 'Les adresses email jetables ne sont pas acceptées.';
      submitBtn.textContent = 'Envoyer le message';
      submitBtn.disabled = false;
      return;
    }
    const errEl = document.getElementById('email-disposable-error');
    if (errEl) errEl.textContent = '';

    const ok = await sendOtp(email);

    submitBtn.textContent = 'Envoyer le message';
    submitBtn.disabled = false;

    if (!ok) {
      // Erreur côté Supabase
      const otpErr = document.getElementById('otp-send-error');
      if (otpErr) { otpErr.textContent = 'Impossible d\'envoyer le code. Réessayez.'; otpErr.style.display = 'block'; }
      return;
    }

    document.getElementById('otp-email-display').textContent = email;
    document.getElementById('otp-step').style.display = 'block';
    document.querySelector('.form-submit').style.display = 'none';
    document.getElementById('otp-code').focus();
    startCountdown();
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
