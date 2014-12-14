var socketIO = require("socket.io");

function initIO(http) {
    var io =  socketIO(http);
    io.on("connection", function (socket) {
        socket.on("match_landing_in", function (data) {
            socket.broadcast.emit("socket:match_landing_in", data );
        });

        socket.on("match_start", function (data) {
            socket.broadcast.emit("socket:match_start", data );
        });

        socket.on("match_are_u_in", function (data) {
            socket.broadcast.emit("socket:match_are_u_in", data );
        });
    });
    return io;
}

module.exports = initIO;