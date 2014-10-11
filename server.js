var express = require("express"),
    app = express(),
    dbConnect = require("./app/config/db_connect"),
    params = require("./app/config/parameters"),
    adminRouter = require("./app/routes/admin");

dbConnect.connect();

app.use("/admin", adminRouter);

app.use(function(req, res, next) {
    var err = {
        status: 404,
        message: "Page not found"
    } 
    return next(err);
});

app.use(function(err, req, res, next) {
    if(err) {
        res.json(err);
    } 
});


app.listen(params.app.port, function() {
    console.log("listening on " + params.app.port);
});