const request = require('request');
const geocode = require('../geocode/geocode');

var getWeather = (address, callback) => {

  geocode.geocodeAddress(address, (errorMessage, results) => {

    if( errorMessage) {
      callback(errorMessage, undefined);

    } else {
      // console.log(JSON.stringify(results, undefined, 2));

      getWeatherAtLocation(results.lat, results.lng, (errorMessage, weatherResults) => {

        if( errorMessage ) {
          // console.log( errorMessage );
          callback(errorMessage, undefined);
        } else {
          // console.log(JSON.stringify(weatherResults, undefined, 2));

          var callbackObj = {'address': results, 'weather': weatherResults};
          callback(undefined, callbackObj);
        }
      })
    }
  });
}

var getWeatherAtLocation = (lat, lng, callback) => {

  // var encodedAddr = encodeURIComponent(address);
  var apiKey = '8bd7796c19dbce08a15d2098feb18b5d';
  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if( error ) {
      callback('Unable to connect to DarkSky servers', undefined);

    } else if ( response.statusCode === 400 ) {
      callback('Unable to find weather for that address.', undefined);

    } else if ( !error && response.statusCode === 200 ) {
      callback(undefined, body.currently);

    } else {
      // console.log('Unknown error.');
      callback('Unable to fetch the weather.', undefined);
    }
  });
}

module.exports = {
  getWeather
}
