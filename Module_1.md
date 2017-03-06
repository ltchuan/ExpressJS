# Web Development with Express.js
## Introduction to node
Node.js
* Event-Driven
* Asynchronous IO
* Server-side Javascript library
* Written in C

Built on V8 JavaScript Engine which is the one used in Chrome.
+ Some custom libraries.

V8 translates JS into machine code.

Based on an idea that I/O is expensive. Most of the time spent waiting for I/O response. 

To counter this, an event-loop model is used. 

1. A main even loop runs and processes requests. 
1. I/O operation requested - fires off a new worker thread.
1. Function Callback occurs once I/O finished.

So event loop is just processing requests, any long operation is handled on a worker thread.

This reduces memory usage with increasing concurrent connections.
Also increases performance.



## Installation and tooling
### Installation
Install node from [https://nodejs.org](https://nodejs.org).

Check that it is working via `node --version` in console.

Either run interactively or by passing in a script file.
Type `node` to run interactively. You can run JavaScript commands like
```javascript
1+1
console.log('Hello from node!')
```

You also get completition by typing `con` and then tab. You can write a function
```javascript
function addNumbers(x,y) { return x+y; }
addNumbers(10,20)
```

You can also just pass in a script file e.g. `node hello.js`.

### Tools
Can use favourite text editor. Course uses WebStorm (guy works for JetBrains who make WebStorm).



## First node application
Just shows running a simple JavaScript program in WebStorm and gives various configuration ideas. writeToConsole.js
```javascript
var message = 'Hello and welcome to this express.js course';

console.log(message);
```

To run directly in Sublime, `Tools -> Build System -> New Build System...`
```javascript
{
    "shell_cmd": "node $file"
}
```



## Code organisation
`readFromFileSync.js`
```javascript
var fs = require('fs');

var content = fs.readFileSync('writeToConsole.js', 'utf-8');

console.log('File contents is:');
console.log(content);
```

The `require()` function lets us work with modules. Node consists of a series of modules. Modules allow us to organise code as JavaScript lacks namespaces.

We code this like this 
`myUtils.js`
```javascript
var printMesssage = function (message) {

    console.log('Message: ' + message);
};

var printWithDateMessage = function (message) {

    console.log(new Date().toUTCString() + ' - Message: ' + message)
};

exports.printMessage = printMesssage;
exports.printWithDateMessage = printWithDateMessage;
```
where the exports are assigning our functions. 

We can then use this via
`usingMyUtils.js`
```javascript
var myUtils = require('./myUtils.js');

myUtils.printMessage("Print Message Call");
myUtils.printWithDateMessage("Print With Date Message Class");
```
where the `require()` is assigning our exports to `myUtils`.

We can see all of the modules that exist by default in Node at [https://nodejs.org/api/](https://nodejs.org/api/).




## Writing code 'node-style'
readFromFileSync.js is named Sync as this is not really how you should write Node applications. They should be asynchronous. An example of this is in
`readFromFile.js`
```javascript
var fs = require('fs');

fs.readFile('writeToConsole.js', 'utf-8', function OnFileRead(err, data) {
    if (err) {
        throw err;
    }
    console.log('File contents is:');
    console.log(data);
});
```

In this function, we aren't actually returning a value but instead are passing in a function as a callback in the third parameter. This function will be called when the `readFile` completes.

The `OnFileRead` name of our callback isn't actually required but is added for clarity. 

We should be using this callback pattern when writing code in Node. Node many functions have two versions. E.g. `readFileSync` and `readFile`. This makes you realise when you are making a synchronous call as the function is named with Sync in it.




## A node Http Server
This is the basic hello world equivalent for Node.
`simpleHttpServer.js`
```javascript
var http = require('http');

var server = http.createServer(function onRequest(request, response) {

    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.write('This is a simple HTTP Server');
    response.end();

}).listen(3000);
```

This creates a HTTP server that takes in a function that responds to any HTTP request. This one simply always responds to the request with 'This is a simple HTTP Server'. It listens on port 3000.

A more complicated example
`enhancedHttpServer.js`
```javascript
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');


var server = http.createServer( function onRequest(req, res) {


    var urlParts = url.parse(req.url);

    var doc = './docs' + urlParts.pathname;

    fs.exists(doc, function fileExists(exists) {

        if (exists) {

            res.writeHead(200, { 'Content-Type': 'text/plain'});
            fs.createReadStream(doc).pipe(res);

        } else {
            res.writeHead(404);
            res.end('Not found\n');
        }
    });

}).listen(3000);
```
Note: `path.exists` has been removed and so this has been changed to `fs.exists`.

This one actually loads files off the disk. It decomposes the url and tries to find the filename being requested. It then serves it if its exists and returns 404 otherwise. 

`fs.createReadStream(doc).pipe(res);` is a function that pipes the file out to `res` as it reads it.




## Packages
One of the advantages of Node is its Node Package Modules (npm). We can get them from [https://npmjs.org](https://npmjs.org). We can also get them directly using the `npm` command. 

For example we can get a Twitter package via `npm install twitter`. This will download the twitter module along with all its dependencies. After it downloads, we will see we now have a folder called `node_modules`. This folder will contain a file called `package.json` that has the information about the package.




## Connect Middleware
Looking again at `enhancedHttpServer.js` we can see a lot of it is very low level and will need to be duplicated a lot. This is where Connect Middleware is useful.

Our typical request processing pipeline involves getting a request, processing it and then giving a response. Connect adds a series of components called Middleware to add certain functionality to the pipeline. 

Some examples are logging, authentication, cookie management and session management.

Connect Middleware is built on top of Node's HTTP Server. Available through npm as the `connect` package.

A simple example of using Connect.
`middleware.js`
```javascript
var connect = require('connect'),
    util = require('util');

var interceptorFunction = function (request, response, next) {
    console.log(util.format('Request for %s with method %s', request.url, request.method));
    next();
};

var server = connect()
    .use(interceptorFunction)
    .use(function onRequest(request, response) {

        response.end('Hello from Connect!');
    }).listen(3000);
```

Instead of directly creating a HTTP Server, we are doing it via the `connect` function. In this example, when a request is received, it first passes through `interceptorFunction` before running the `onRequest` function.

Looking inside the `interceptorFunction`, we see that it has a third parameter `next` and has a `next` function call. This is what calls the next function in the chain.

A more complicated example
`middlewareRoute.js`
```javascript
var connect = require('connect'),
    util = require('util');

var interceptorFunction = function (request, response, next) {
    console.log(util.format('Request for %s with method %s', request.url, request.method));
    next();
};

var server = connect()
    .use('/log', interceptorFunction)
    .use(function onRequest(request, response) {

        response.end('Hello from Connect!');
    }).listen(3000);
```
where we are intercepting requests based on path, `.use('/log', interceptorFunction)` in this example.

Connect Middleware also has some useful built in functionality. One example of this is the serving of static files. E.g.
`middlewareRoute.js`
```javascript

var connect = require('connect');

var server = connect()
    .use(connect.static(__dirname + '/public'))
    .use(function onRequest(request, response) {
        response.end('Hello from connect!\n');
    })
    .listen(3000);
```
where `.use(connect.static(__dirname + '/public'))` is now doing our previous functionality from `enhancedHttpServer.js`.