
var ruleFile = require('./promise-file');

console.log('starting test.');

ruleFile['determineRule'](5,6).then((res) => {
  console.log(res);
}).catch((e) => {
  console.log(e);
});
