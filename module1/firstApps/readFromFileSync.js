var fs = require('fs');

var content = fs.readFileSync('writeToConsole.js', 'utf-8');

console.log('File contents is:');
console.log(content);
