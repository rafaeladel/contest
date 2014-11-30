var app = require("./app/app"),
    params = require("./app/config/parameters");

app.listen(params.app.port, function () {
    console.log("listening on " + params.app.port);
});

module.exports = app;