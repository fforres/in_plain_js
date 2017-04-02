function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
    }
}
getLocation();
