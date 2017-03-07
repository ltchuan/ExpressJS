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
