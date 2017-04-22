if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    if(!ENV) {
      navigator.serviceWorker.register('./general.js').then(function(registration) {
        // Registration was successful
      }).catch(function(err) {
        // registration failed :(
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
