// Developer: Mike Schmoyer
// Created: June 6, 2018

const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'The address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddr = encodeURIComponent(argv.address);
var apiKey      = 'AIzaSyAb1lvDjCKJBaTXLP1wyKb8QuYjJkhWwnU';
var geocodeUrl  = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}&key=${apiKey}`;

axios.get(geocodeUrl)
  .then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find given address.');
    }
    var addr        = response.data.results[0].formatted_address;
    var lat         = response.data.results[0].geometry.location.lat;
    var lng         = response.data.results[0].geometry.location.lng;
    var apiKey      = '8bd7796c19dbce08a15d2098feb18b5d';
    var weatherUrl  = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;

    console.log(`At ${addr}...`);

    return axios.get(weatherUrl);
  })
  .then((response) => {
    printWeather(response.data);
  })
  .catch((e) => {
    if(e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(e.message);
    }
  });

var printWeather = (data) => {

  // console.log(JSON.stringify(data, undefined, 2));

  var temp            = data.currently.temperature;
  var humidity        = data.currently.humidity;
  var feelsLike       = data.currently.apparentTemperature;
  var summary         = data.daily.summary;
  var todaySummary    = data.currently.summary;
  var precipProb      = data.currently.precipProbability;
  var precipIntensity = data.currently.precipIntensity;

  console.log(`Today is ${todaySummary}.`);
  console.log(`Temperature: ${temp} degrees. Humidity: ${humidity}`);
  console.log(`It feels like ${feelsLike} degrees.`);
  console.log(`There is a ${precipProb}% chance of rain.`);
  if(precipProb > 99) {
    console.log(`Rain intensity: ${precipIntensity}`);
  }
  console.log('Week outlook: ' + summary);
};
