/* ===== ADMIN GUARD — Finance & Stock ===== */
(async function () {
  const page = location.pathname.split('/').pop();

  const { data: { session } } = await _sb.auth.getSession();
  if (!session) {
    location.href = '../auth.html?redirect=finance/' + page;
    return;
  }

  const { data, error } = await _sb.from('admins').select('email').eq('email', session.user.email).single();
  if (error || !data) {
    alert('Accès refusé. Cette section est réservée aux administrateurs.');
    location.href = '../index.html';
    return;
  }

  document.body.style.visibility = 'visible';
})();
