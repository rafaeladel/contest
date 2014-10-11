var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var contestSchema = new Schema({
    title: {
        type: String,
        required: true
    },  
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "questions"
    }],
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "matches"
    }],
});

module.exports = mongoose.model("contests", contestSchema);