var app = require("express")(),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    dbConnect = require("./config/db_connect"),
    params = require("./config/parameters"),
    adminRouter = require("./routes/admin"),
    contestRouter = require("./routes/contestRouter"),
    matchRouter = require("./routes/matchRouter"),
    questionRouter = require("./routes/questionRouter"),
    userRouter = require("./routes/userRouter");

dbConnect.connect();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));


app.use("/", adminRouter);
app.use("/", contestRouter);
app.use("/", matchRouter);
app.use("/", questionRouter);
app.use("/", userRouter);

app.use(function(req, res, next) {
    var err = { status: 404, message: "Page not found" };
    return next(err);
});

app.use(function(err, req, res, next) {
    if(err) {
        res.json(err);
    }
});

module.exports = app;