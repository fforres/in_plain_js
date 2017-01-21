var CACHE_NAME = 'netflix_general_cache';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js',

  './style/normalize.css',
  './style/master.css',
  './style/topbar.css',
  './style/billboard.css',
  './style/row.css',
  './js/config.js',
  './js/service_workers/index.js',
  './js/models/youtube.js',
  './js/index.js',
];

var data = null;

// Install Service Worker
self.addEventListener('install', function(event){
});

// Service Worker Active
self.addEventListener('activate', function(event){
});

self.addEventListener('fetch', function(event) {
  if (
    event.request.url.lastIndexOf('googleapi') !== -1
  ) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
      .then(function(r) {
        caches.open('v1').then((cache) => {
          cache.put(event.request, r);
        });
        return r.clone();
      })
    );
  } else if (
    event.request.url.lastIndexOf('ytimg') !== -1
  ) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
      .then(function(r) {
        caches.open('v1').then((cache) => {
          cache.put(event.request, r);
        });
        return r.clone();
      })
    );
  }

  return
});
