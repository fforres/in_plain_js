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
// self.addEventListener('install', function(event) {
//   console.log('installING')
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// Install Service Worker
self.addEventListener('install', function(event){
  console.log('installed!');
});

// Service Worker Active
self.addEventListener('activate', function(event){
  console.log('activated!');
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.lastIndexOf('googleapi') !== -1) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        console.log('found cache!')
        return response || fetch(event.request);
      })
      .then(function(r) {
        caches.open('v1').then((cache) => {
          console.log('cached!!!', event.request)
          cache.put(event.request, r);
        });
        return r.clone();
      })
    );
  }
  return
});
