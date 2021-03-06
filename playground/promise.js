var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be number');
      }
    }, 1500);
  });
};

asyncAdd(5, 7).then((res) => {
  console.log('1. Result:', res);
  return asyncAdd(res, 50);
}).then((res) => {
  console.log('2. Result:', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Hey, It worked');
//     reject('Unable to fulfill promise');
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log('Success:', message);
// }, (errorMessage) => {
//   console.log('Error:', errorMessage);
// });
