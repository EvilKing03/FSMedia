/* =========================================================
   UI partagée : thème, navigation active, toast, modales, backup
   ========================================================= */

/* ----------------- Thème clair / sombre ----------------- */
(function initTheme() {
  const THEME_KEY = 'fsm_finance_theme';
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
  });
})();

/* ----------------- Lien de nav actif ----------------- */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('.app-nav__link').forEach((link) => {
    if (link.getAttribute('data-page') === page) link.classList.add('active');
  });
});

/* ----------------- Toast ----------------- */
let toastTimer = null;
function showToast(message, isError = false) {
  let el = document.getElementById('app-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.toggle('toast--error', isError);
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ----------------- Modales ----------------- */
function openModal(overlayId) {
  document.getElementById(overlayId)?.classList.add('open');
}
function closeModal(overlayId) {
  document.getElementById(overlayId)?.classList.remove('open');
}

/* ----------------- Sauvegarde (export / import) ----------------- */
document.addEventListener('DOMContentLoaded', () => {
  const exportBtn = document.getElementById('backup-export-btn');
  const importBtn = document.getElementById('backup-import-btn');
  const importInput = document.getElementById('backup-import-input');

  exportBtn?.addEventListener('click', () => {
    exportBackup();
    showToast('Sauvegarde exportée ✓');
  });

  importBtn?.addEventListener('click', () => importInput?.click());

  importInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importBackup(file);
      showToast('Sauvegarde importée ✓ — rechargement…');
      setTimeout(() => location.reload(), 900);
    } catch (err) {
      showToast(err.message || "Échec de l'import", true);
    } finally {
      importInput.value = '';
    }
  });
});
