const yargs   = require('yargs');
const weather = require('./weather/weather');
const geocode = rquire('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {

});

weather.getWeather(argv.address, (errorMessage, results) => {
  if( errorMessage ) {
    console.log(errorMessage);
  } else {
    // console.log(JSON.stringify(results, undefined, 2));

    var addr = results.address.address;
    var temp = results.weather.temperature;
    var feelsLike = results.weather.apparentTemperature;

    console.log(`At ${addr},`);
    console.log(`It is currently ${temp} degrees.`);
    console.log(`It feels like ${feelsLike} degrees.`);
  }
});
