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
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
});

module.exports = mongoose.model("matches", matchesSchema);