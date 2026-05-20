/* ── Badge API (icône sur l'écran d'accueil) ───────── */
window.majBadge = function(count) {
  if ('setAppBadge' in navigator) {
    if (count > 0) navigator.setAppBadge(count).catch(() => {});
    else            navigator.clearAppBadge().catch(() => {});
  }
};

/* Effacer le badge dès que l'app est ouverte / visible */
function clearBadge() {
  if ('clearAppBadge' in navigator) navigator.clearAppBadge().catch(() => {});
}
clearBadge();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') clearBadge();
});

/* ── Notifications push ────────────────────────────── */
window.envoyerNotification = function(titre, corps, url) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    const n = new Notification(titre, {
      body: corps,
      icon: '/icon-192.png',
      badge: '/badge-96.png'
    });
    if (url) n.onclick = () => { window.focus(); window.location.href = url; };
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') window.envoyerNotification(titre, corps, url);
    });
  }
};

/* ── Service Worker ────────────────────────────────── */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
