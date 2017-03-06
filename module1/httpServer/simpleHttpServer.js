var http = require('http');

var server = http.createServer(function onRequest(request, response) {

    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.write('This is a simple HTTP Server');
    response.end();

}).listen(3000);