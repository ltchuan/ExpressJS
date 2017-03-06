
var connect = require('connect');

var server = connect()
    .use(connect.static(__dirname + '/public'))
    .use(function onRequest(request, response) {
        response.end('Hello from connect!\n');
    })
    .listen(3000);

