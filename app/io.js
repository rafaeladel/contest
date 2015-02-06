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

        socket.on("start_stopwatch", function (data) {
            socket.broadcast.emit("socket:start_stopwatch", data );
        });
        socket.on("stop_stopwatch", function (data) {
            socket.broadcast.emit("socket:stop_stopwatch", data );
        });

        socket.on("match_start_audience", function (data) {
            socket.broadcast.emit("socket:match_start_audience", data );
        });

        socket.on("match_are_u_in", function (data) {
            socket.broadcast.emit("socket:match_are_u_in", data );
        });

        socket.on("user_answered", function (data) {
            socket.broadcast.emit("socket:user_answered", data );
        });

        socket.on("show_result", function (data) {
            socket.broadcast.emit("socket:show_result", data );
        });

        socket.on("show_user_result", function (data) {
            socket.broadcast.emit("socket:show_user_result", data );
        });

        socket.on("show_final_result", function (data) {
            socket.broadcast.emit("socket:show_final_result", data );
        });
        
        socket.on("match_result_audience", function (data) {
            socket.broadcast.emit("socket:match_result_audience", data );
        });
    });
    return io;
}

module.exports = initIO;