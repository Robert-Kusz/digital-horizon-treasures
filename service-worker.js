self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open("dht-cache-v1").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

/* Push-ready (safe to leave even if unused) */
self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  self.registration.showNotification(
    data.title || "Digital Horizon Treasures",
    {
      body: data.body || "New update available",
      icon: "/icons/icon-192.png"
    }
  );
});
