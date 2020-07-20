const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
      default: '288/28 Tiptana Village Phetkasem 53 bangkok'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=tvHftfSE6cTl9DVTdez4qz6AP3OsQPMR&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.info.statuscode !== 0) {
    throw new Error(response.data.info.messages[0]);
  } else if (response.data.results[0].locations.length === 0) {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].locations[0].latLng.lat;
  var lng = response.data.results[0].locations[0].latLng.lng;
  var weatherUrl = `https://api.darksky.net/forecast/c990dc97c1109cfd63e13a49f609925f/${lat},${lng}`;
  console.log(response.data.results[0].providedLocation.location);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
