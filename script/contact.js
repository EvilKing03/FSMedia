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

// ===== ENVOI FORMULAIRE VIA WEB3FORMS =====
// Remplace YOUR_ACCESS_KEY par ta clé obtenue sur https://web3forms.com
const WEB3FORMS_KEY = 'cc6957f4-66d9-4915-a1d5-8eb305458999';

const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#FF6B6B';
        valid = false;
      }
    });

    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.style.borderColor = '#FF6B6B';
        valid = false;
      }
    }

    if (!valid) return;

    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    const data = new FormData(form);
    data.append('access_key', WEB3FORMS_KEY);
    data.append('subject', `[FSMedia] Nouveau message — ${data.get('sujet') || 'Contact'}`);
    data.append('from_name', `${data.get('prenom')} ${data.get('nom')}`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();

      if (json.success) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        btn.textContent = 'Erreur — Réessayer';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Erreur réseau — Réessayer';
      btn.disabled = false;
    }
  });

  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => {
      field.style.borderColor = '';
    });
  });
}

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
