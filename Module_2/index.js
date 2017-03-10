var express = require('express');

var app = express();

app.configure('production', function () {
	// middleware
	app.set('title', 'CRM Application');
});

app.configure('development', function () {
	// middleware
	app.set('title', 'CRM Application - Development');
});

app.get('/', function (req, res) {
	res.send('Value of title is' + app.get('title'));
});

app.listen(3000);