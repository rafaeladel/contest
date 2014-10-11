var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var questionsSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    questionType: {
        type: Number,
        required: true
    },
    answers: {
        type: Schema.Types.Mixed
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "matches"
    }],
});

module.exports = mongoose.model("questions", questionsSchema);