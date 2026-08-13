/**
 * AgriConnect Service Worker
 * Paths are relative to the app scope (repo root on GitHub Pages).
 * Site: https://durgarao-r-dev.github.io/agriconnect/
 */
const CACHE_NAME = "agriconnect-portal-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./login.html",
  "./register.html",
  "./farmer-dashboard.html",
  "./admin-dashboard.html",
  "./style.css",
  "./dashboard.css",
  "./auth.css",
  "./agri-portal-background.css",
  "./data.js",
  "./main.js",
  "./dashboard-farmer.js",
  "./dashboard-admin.js",
  "./soil-data.js",
  "./soil-intelligence.js",
  "./manifest.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        if (res && res.ok && event.request.url.startsWith(self.location.origin)) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return new Response("Offline", { status: 503, statusText: "Offline" });
      });
    })
  );
});
