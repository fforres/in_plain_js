if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    if(!!ENV) {
      navigator.serviceWorker.register('/js/service_workers/general.js', {
        scope: window.location.href
      }).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }
  });
}
