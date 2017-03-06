var printMesssage = function (message) {

    console.log('Message: ' + message);
};

var printWithDateMessage = function (message) {

    console.log(new Date().toUTCString() + ' - Message: ' + message)
};

exports.printMessage = printMesssage;
exports.printWithDateMessage = printWithDateMessage;

