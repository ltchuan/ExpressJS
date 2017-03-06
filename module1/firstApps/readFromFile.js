var fs = require('fs');

fs.readFile('writeToConsole.js', 'utf-8', function OnFileRead(err, data) {
    if (err) {
        throw err;
    }
    console.log('File contents is:');
    console.log(data);
});
