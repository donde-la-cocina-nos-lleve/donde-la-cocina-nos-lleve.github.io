var APP_PREFIX = 'DLCNL'
var VERSION = 'version_02'
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [
    '/offline.html',
    '/styles.css',
    '/assets/icons/cabecera.jpg',
    '/assets/js/simple-jekyll-search.js',
    '/assets/js/navegacion.js',
    '/assets/js/search.js'
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
