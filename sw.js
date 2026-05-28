const CACHE = 'wp916-v12';

self.addEventListener('install', e => {
  self.skipWaiting(); // מיד פעיל
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => {
        // מאלץ רענון על כל הלשוניות הפתוחות
        return self.clients.matchAll({ type: 'window' }).then(clients => {
          clients.forEach(c => c.navigate(c.url));
        });
      })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if(res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
