var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var matchesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    contest: {
        type: Schema.Types.ObjectId,
        ref: "contests"
    },
    stage: {
        type: Number,
        default: 0
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "questions"
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }],
    scores: [{
        type: Schema.Types.ObjectId,
        ref: "scores"
    }]
});

module.exports = mongoose.model("matches", matchesSchema);