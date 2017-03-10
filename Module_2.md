# An Introduction to Express.js
## Express.js Overview
Express.js
* Inspired by Sintra. Sintra was original developed as an alternative to Ruby on Rails.
* Built on top of Connect Middleware.
* Adds functionality to Connect.
* Exposes Connect Middleware but indirectly through itself.

Basic Architecture
Request -> Routing -> Function -> View
A request is routed via a routing mechanism to a function that processes it and most commonly responds with a view (HTTP page).

Model View Controller (MVC)
No such concept as a controller in Express.js unlike things like ASP.net MVC and Rails where a URL is mapped to a controller and the controller has the methods to respond to the request.

Although we can create our own controllers in Express, normally we do not do this. So instead of MVC we have Model View Router, where we have a router that lets us map our functionality to any place we like.



## Our first Express Application
Install express via `npm install express`.
`index.js`
```javascript
var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('Welcome to express!');
});

app.listen(3000);
```
One advantage of this over our earlier examples is that rather than having to process the request parameter ourselves in the callback function of our HTTP server, Express exposes methods to do this for us.

We can then add another route
```javascript
var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('Welcome to express!');
});

app.get('/customers', function (req, res) {
    res.send('Welcome to customers section');
});
app.listen(3000);
```
To get this to work we would normally need to restart the server. Instead of doing this we can install a module called `nodemon` which monitors a folder for any changes in the project and if it detect a change it will then restart the server.

It should be installed using `npm install -g nodemon` to install it globally so that the `nodemon` command is added to the path. To use it, we use `nodemon index.js`.

If we now make a modification to `index.js`, the server will automatically be restarted.




## Routing
In Express.js there isn't the concept of a controller and we are free to put the functions to process requests wherever we want. As such, we need some organisation to make things manageable. 

One way to do this is to group things into their own files. This can be done using the `require` function in Node. We can remove the routing functions from within `index.js` and put them into their own files like so.
`home.js`
```javascript
exports.index = function (req, res) {
    res.send('Welcome to the index home page');
};
```
`customer.js`
```javascript
exports.index = function (req, res) {
    res.send('Welcome to the customer index page');
};

exports.contact = function (req, res) {
    res.send('Welcome to the customer contact page');
};
```
and then include these using require in the `index.js`
```javascript
var express = require('express');
    home = require('./routes/home.js');
    customer = require('./routes/customer.js');

var app = express();

app.get('/', home.index);
app.get('/customer', customer.index);
app.get('/customer/contact', customer.contact);

app.listen(3000);
```

So eventhough their isn't the concept of a controller, we can view these individual Javascript files as the controllers if we <wish class=""></wish>




## Route parameters and queries
What about if our URL has parameters, for example if our URL is `/customer/20`. We can do this easily in Express. We define a pattern via 
```javascript
app.get('/customer/:id', function (req, res) {
    res.send('Customer selected is ' + req.params.id);
});
```
or alternatively we can pass in the name `id` as a string via `req.params['id']`

If we have a query instead, e.g. `customer?id=700` we do
```javascript
app.get('/customer', function (req, res) {
    res.send('Customer selected is ' + req.query.id);
});
```

We can also define patterns for our path using regular expressions such as 
```javascript
app.get(/^\/range\/(\d+)(?:\.\.(\d+))?$/, function (req, res) {
    var from = req.params[0];
    var to = req.params[1];
    res.send('Range of values using regular expressions for /range/' + from + '..' + to);
});
```
which works for a URL such as `/range/100..300`.




## Configurations
Note: The configure function has been removed in Express.js 4.

We can also configure Express at startup. We do this via
```javascript
app.configure( function () {
    // Functions
});
```
We can use this to configure Middleware. We can also use the functions `app.set` and `app.get` to set values at start and then read these values later. An example of this is `app.set('title', 'CRM Application')`.

We can also define different configurations for states such as one for development and one for production. We can do this by adding another parameter to the configuration
```javascript
app.configure('production', function () {
    // middleware
    app.set('title', 'CRM Application');
});

app.configure('development', function () {
    // middleware
    app.set('title', 'CRM Application - Development');
});
```

We can check which configuration is being run via
```javascript
app.get('/', function (req, res) {
    res.send('Value of title is' + app.get('title'));
});
```
and if we run this we will find it is using the development configuration. To run the production configuration we would have to define an environmental variable `NODE_ENV=production` before launching it.