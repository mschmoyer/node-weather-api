console.log('starting app');

setTimeout(() => {
  console.log('timeout function fired.');
}, 2000);

setTimeout(() => {
  console.log('second timeout');
}, 0);

console.log('finishing up');
