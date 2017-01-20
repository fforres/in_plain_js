if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    if(!ENV) {
      navigator.serviceWorker.register('./general.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }
  });
}

window.onfocus = function () {
  isActive = true;
};

window.onblur = function () {
  isActive = false;
};
