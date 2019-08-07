
var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Invalid parameters. Numbers required.');
      }
    }, 1500);
  });
}

asyncAdd('5', 7).then((res) => {
  console.log('result: ', res);
  return asyncAdd(res, '33');
}).then((res) => {
  console.log('result2: ', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Hey. it worked.');
//     reject('Unable to fulfill promise.');
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// })
