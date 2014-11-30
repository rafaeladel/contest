var express = require("express"),
    app = express(),
    path = require("path"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    dbConnect = require("./config/db_connect"),
    params = require("./config/parameters"),
    contestRouter = require("./routes/contestRouter"),
    matchRouter = require("./routes/matchRouter"),
    questionRouter = require("./routes/questionRouter"),
    userRouter = require("./routes/userRouter");

dbConnect.connect();

//app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use("/", contestRouter);
app.use("/", matchRouter);
app.use("/", questionRouter);
app.use("/", userRouter);

app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/libs", express.static(path.join(__dirname, "../public/libs")));
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/partials", express.static(path.join(__dirname, "../public/partials")));

app.use("/admin", function(req, res, next) {
    res.sendFile(path.resolve(__dirname, "..", "public/partials/admin/index.html"));
});

app.use("*", function(req, res, next) {
    res.sendFile(path.resolve(__dirname, "..", "public/partials/user/index.html"));
});

app.use(function(err, req, res, next) {
    if(err) {
        res.status(500).json(err);
    }
});

module.exports = app;