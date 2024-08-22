// These are the dependencies for workbox.
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
// This is used to precache the workbox manifest.
precacheAndRoute(self.__WB_MANIFEST);
// This is used to create a new instance of the cache first strategy.
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
// This offline fallback is used to cache the index.html file.
offlineFallback({
  pageFallback: "/index.html",
  pageFallbackDependencies: ["/index.html"],
  strategy: pageCache,
});

// This warm strategy cache is used to cache the index.html file.
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});
// This register route is used to cache the page.
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
// This register route is used to cache the assets.
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
