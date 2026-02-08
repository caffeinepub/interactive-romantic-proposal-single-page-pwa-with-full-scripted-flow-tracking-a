const CACHE_NAME = 'romantic-proposal-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/generated/stars-overlay.dim_1920x1080.png',
  '/assets/generated/heart-particle.dim_128x128.png',
  '/assets/generated/rose-petal.dim_256x256.png',
  '/assets/generated/vignette-glow.dim_1920x1080.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
