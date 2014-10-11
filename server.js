var express = require("express"),
    app = express(),
    dbConnect = require("./app/config/db_connect"),
    params = require("./app/config/parameters");

dbConnect.connect();

app.use(function(err, req, res, next) {
    if(err) {
        res.json(err);
    } 
});


app.listen(params.app.port, function() {
    console.log("listening on " + params.app.port);
});