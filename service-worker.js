const urlsToCache = [
  "index.html",
  "/index.html",
  "Moral.html",
  "theLimit.html",
  "manifest.json",
  "Files/icon/icon-192.png",
  "Files/icon/icon-512.png",
  "Files/icon/MountainTown.png",
  "Files/icon/clouds.jpg",
  "/Files/pdfFiles/1pdfmain.html",
  "/Files/pdf/Shikar-Memories.pdf",
  "/Files/pdf/locke.pdf",
  "/Files/pdf/Lockes2ndTreatise.pdf",
  "/Files/pdf/Shikar-Memories.pdf"
];

const CACHE_NAME = "pwa-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
