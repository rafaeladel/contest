var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "matches"
    }],
});

module.exports = mongoose.model("users", usersSchema);