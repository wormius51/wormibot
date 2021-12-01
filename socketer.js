
var io;

function listen(server) {
    io = require('socket.io').listen(server);
}

module.exports.listen = listen;
module.exports.getIo = () => {return io};