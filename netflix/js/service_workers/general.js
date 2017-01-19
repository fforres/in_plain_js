var CACHE_NAME = 'netflix_general_cache';
var urlsToCache = [
  '/',
  'styles/main.css',
  'script/main.js'
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
  console.log(event);
});
