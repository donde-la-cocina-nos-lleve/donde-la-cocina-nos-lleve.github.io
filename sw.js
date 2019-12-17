var APP_PREFIX = 'DLCNL'
var VERSION = 'version_04'
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
    '/offline.html',
    '/styles.css',
    '/assets/icons/cabecera_larga.jpg',
    '/assets/icons/svg/menu.svg',
    '/assets/icons/svg/search.svg',
    '/assets/icons/svg/close.svg',
    '/assets/icons/svg/settings.svg',
    '/assets/icons/svg/chevron-left-white.svg',
    '/assets/icons/svg/chevron-right-white.svg',
    '/assets/fonts/Franklin-Gothic-ITC-Book-BT.ttf',
    '/assets/fonts/FuturaMediumBT.ttf',
    '/assets/js/index.js',
    '/assets/js/simple-jekyll-search.js',
    '/assets/js/navegacion.js',
]

//network first then cache
self.addEventListener('fetch', function (e) {
    e.respondWith(
        fetch(e.request).catch(function() {
            return caches.match(e.request)
                .then(function(res){
                    if (res === undefined) { 
                        return caches.match('offline.html');
                    } 
                    return res;
                })
        })
    );
});

// Install cache static resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(URLS);
        })
    );
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('push', ev => {
  const data = ev.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    image: data.image,
    badge: '/assets/icons/icono.png',
    icon: '/assets/icons/icon-512x512.png'
  });
});

self.addEventListener('notificationclick', function(event) {
    let url = event.notification.data.url;
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
