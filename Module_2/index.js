var express = require('express');
	home = require('./routes/home.js');
	customer = require('./routes/customer.js');

var app = express();

// customer/20
app.get('/customer/:id', function (req, res) {
	res.send('Customer selected is ' + req.params.id);
});

//customer?id=700
app.get('/customer', function (req, res) {
	res.send('Customer selected is ' + req.query.id);
});

// range/100..300
app.get(/^\/range\/(\d+)(?:\.\.(\d+))?$/, function (req, res) {
	var from = req.params[0];
	var to = req.params[1];
	res.send('Range of values using regular expressions for /range/' + from + '..' + to);
});

app.listen(3000);