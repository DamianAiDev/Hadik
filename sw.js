const CACHE_NAME = 'hadik-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// TU JE TEN INSTALL EVENT:
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Cachujem súbory');
      return cache.addAll(ASSETS);
    })
  );
});

// Aktivácia a čistenie starej cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Obsluha požiadaviek (aby to išlo offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
