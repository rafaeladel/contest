var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var matchesSchema = new Schema({
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "questions"
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
});

module.exports = mongoose.model("matches", matchesSchema);