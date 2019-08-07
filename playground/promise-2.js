// Developer: Mike Schmoyer
// Created: June 6, 2018

const request = require('request');

var geocodeAddress = (address) => {

  return new Promise((resolve, reject) => {
    var encodedAddr = encodeURIComponent(address);
    var apiKey = 'AIzaSyAb1lvDjCKJBaTXLP1wyKb8QuYjJkhWwnU';
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=${apiKey}`,
      json: true
    }, (error, response, body) => {

      if( error ) {
        reject('Unable to connect to google servers.');

      } else if ( body.status === 'ZERO_RESULTS' ) {
        reject('Unable to find address ' + address);

      } else if ( body.status === 'OK' ) {
        var addr = body.results[0].formatted_address;
        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;

        var data = {'address': addr, 'lat': lat, 'lng': lng};

        resolve(data);

      } else {
        reject('Unknown error.');
      }
    });
  });
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
},  (errorMessage) => {
  console.log(errorMessage);
});
