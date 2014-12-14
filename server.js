var app = require("./app/app"),
    http = require('http').Server(app),
    io = require('./app/io.js')(http),
    params = require("./app/config/parameters");


http.listen(params.app.port, function () {
    console.log("listening on " + params.app.port);
});

module.exports = app;