var express = require('express');

var app = express();

app.configure( function () {
	
	app.use(express.logger('dev'));
	app.use(express.favicon());
	app.use(express.static(__dirname + '/public'));
});

app.listen(3000);