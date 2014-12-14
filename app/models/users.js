var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    _ = require("lodash");

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
    scores: [{
        type: Schema.Types.ObjectId,
        ref: "scores"
    }]
});

usersSchema.methods.addMatch = function (match, callback) {
    this.matches.push(match._id);
    match.users.push(this._id);
    callback(match)
};

usersSchema.methods.syncMatches = function (matches, callback) {
    var exMatches = _.difference(this.matches, matches);
    this.matches = [];
    for(var i = 0; i < matches.length; i++) {
        this.matches.push(matches[i]._id);
    }
    callback(matches, exMatches);
};

module.exports = mongoose.model("users", usersSchema);