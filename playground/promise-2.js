const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    // 288/28 Tiptana Village Phetkasem 53 bangkok

    request({
      url: `https://www.mapquestapi.com/geocoding/v1/address?key=tvHftfSE6cTl9DVTdez4qz6AP3OsQPMR&location=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to services.');
      } else if (body.info.statuscode !== 0) {
        reject(body.info.messages[0]);
      } else if (body.results[0].locations.length === 0) {
        reject('Unable to find that address.');
      } else {
        resolve({
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });
  });
};

geocodeAddress('288/28 Tiptana Village Phetkasem 53 bangkok').then(location => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
