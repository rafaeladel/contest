var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var scoresSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "matches"
    }
});

module.exports = mongoose.model("scores", scoresSchema);