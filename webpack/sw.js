/* eslint-disable */

const assetManifest = require('../build/assets-manifest.json');

const hashString = (input) => {
  let hash = 0;
  if (input.length === 0) return hash;
  for (let i = 0; i < input.length; i += 1) {
    const chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr; // eslint-disable-line no-bitwise
    hash |= 0; // eslint-disable-line no-bitwise
  }
  return hash;
};

const VERSION_FORCE = 5;
const ASSETS_HASH = hashString(JSON.stringify(assetManifest));
const CACHE_NAME = `serverlesswebsite-sw-cache-${VERSION_FORCE}-${ASSETS_HASH}`;
const STATIC_HOST = 'https://serverlessweb.site/';

// Perform install steps (cache statics)
self.addEventListener('install', event => event.waitUntil(
    caches.open(CACHE_NAME)
        .then(cache =>
            cache.addAll([
              '/',
              `${STATIC_HOST}${assetManifest['manifest.js']}?sw`,
              `${STATIC_HOST}${assetManifest['vendor.js']}?sw`,
              `${STATIC_HOST}${assetManifest['app.js']}?sw`,
            ]),
        ).then(() => self.skipWaiting()),
));


// clear old cache
self.addEventListener('activate', event => event.waitUntil(
    caches.keys().then(keyList => Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        }),
    )),
));

// Check cache for values
self.addEventListener('fetch', (event) => {
  let request = event.request;
  if (request.url &&
    request.url.indexOf('/public/') !== -1 &&
    request.url.startsWith(STATIC_HOST)
  ) {
    request = new Request(`${request.url}?sw`, {
      method: request.method,
      headers: request.headers,
      mode: request.mode,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
    });
  }

  return event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(request)
        .then(response => response || fetch(request).then(response)),
      ),
  );
});

self.addEventListener('push', (event) => {
  if (!event.data) {
    return; // dummy notification, used to update the service worker
  }
  const data = event.data.json();
  const title = data.title;

  event.waitUntil(self.registration.showNotification(title, data));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

    // This looks to see if the target path is already open and
    // focuses if it is
  event.waitUntil(
        clients.matchAll({
          type: 'window',
        })
            .then((clientList) => {
              for (let i = 0; i < clientList.length; i += 1) {
                const client = clientList[i];
                const url = client.url;
                const parts = url.split('/');
                const path = `/${parts[parts.length - 1]}`;
                if (path === event.notification.tag && 'focus' in client) {
                  return client.focus();
                }
              }
              if (clients.openWindow) {
                return clients.openWindow(event.notification.tag);
              }
              return null;
            }),
    );
});
