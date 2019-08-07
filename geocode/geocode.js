
const request = require('request');

var geocodeAddress = (address, completion) => {

  var encodedAddr = encodeURIComponent(address);
  var apiKey = 'AIzaSyAb1lvDjCKJBaTXLP1wyKb8QuYjJkhWwnU';
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=${apiKey}`,
    json: true
  }, (error, response, body) => {

    if( error ) {
      completion('Unable to connect to google servers', undefined);

    } else if ( body.status === 'ZERO_RESULTS' ) {
      completion('Unable to find that address.', undefined);

    } else if ( body.status === 'OK' ) {
      var addr = body.results[0].formatted_address;
      var lat = body.results[0].geometry.location.lat;
      var lng = body.results[0].geometry.location.lng;

      var data = {'address': addr, 'lat': lat, 'lng': lng};

      // console.log(`Address: ${addr}`);
      // console.log(`Coords: Lat=${lat}, Lng=${lng}`);
      completion(undefined, data);

    } else {
      // console.log('Unknown error.');
      completion('Unknown error', undefined);
    }
  });
}

module.exports = {
  geocodeAddress
}
