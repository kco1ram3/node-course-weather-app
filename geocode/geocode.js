const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  // 288/28 Tiptana Village Phetkasem 53 bangkok

  request({
    url: `https://www.mapquestapi.com/geocoding/v1/address?key=tvHftfSE6cTl9DVTdez4qz6AP3OsQPMR&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    if (error) {
      callback('Unable to connect to services.');
    } else if (body.info.statuscode !== 0) {
      callback(body.info.messages[0]);
    } else if (body.results[0].locations.length === 0) {
      callback('Unable to find that address.');
    } else {
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
