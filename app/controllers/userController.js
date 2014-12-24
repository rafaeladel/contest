var User = require("../models/users"),
    Match = require("../models/matches"),
    Score = require("../models/scores"),
    errorHandler = require("../util/errorHandler");

function userController() {
    return {
        list: listUsers,
        index: indexUsers,
        create: createUsers,
        update: updateUsers,
        delete: deleteUsers
    };
}

module.exports = userController();

/**
 * Listing all users
 *
 * @param req
 * @param res
 * @param next
 */
function listUsers(req, res, next) {
    User.find({}).populate("matches scores").exec(function(err, users) {
        if(err) return next(err);
        res.json(users);
    });
}

/**
 * Getting single user
 *
 * @param req
 * @param res
 * @param next
 */
function indexUsers(req, res, next) {
    var userId = req.params.id || null;
    if(!userId) next(errorHandler(404, "Not found"));
    User.findOne({ _id: userId }).populate("matches scores").exec(function(err, user) {
        if(err) return next(err);
        if(user.length == 0) return next(errorHandler(404, "User not found"));
        res.json(user);
    });
}

/**
 * Creating user
 *
 * @param req
 * @param res
 * @param next
 */
function createUsers(req, res, next) {
    User.create(req.body, function(err, user) {
        if(err) return next(err);
        res.json({
            success: true,
            user: user
        });
    });
}

/**
 * Updating user
 *
 * @param req
 * @param res
 * @param next
 */
function updateUsers(req, res, next) {
    var userId = req.params.id || null;
    if(!userId) next(errorHandler(404, "Not found"));
    User.findOne({ _id: userId }).populate("matches scores").exec(function(err, user) {
        if(err) return next(err);
        if(user.length === 0) return next(errorHandler(404, "User not found"));
        user.username = req.body.username;
        user.password = req.body.password;
        user.syncMatches(req.body.matches, function(matches, exMatches, updatedUser) {
            for(var i =0 ; i < matches.length; i++){
                Match.findOne({ _id: matches[i]._id }).populate("users").exec(function(err, match) {
                    if(match !== null) {
                        match.users.push(updatedUser._id);

                        // create score for a user
                        var score = new Score({score: 0, user: updatedUser._id, match: match._id});
                        score.save(function (err, score) {
                            if (err) return next(err);
                            updatedUser.scores.push(score._id);
                            updatedUser.save();
                            match.scores.push(score._id);
                            match.save(function (err) {
                                if (err) return next(err);
                            });
                        });
                        
                    }
                });
            }
            for(var j =0 ; j < exMatches.length; j++){
                Match.findOne({ _id: exMatches[j] }).populate("users scores").exec(function(err, match) {
                    match.users.pull(user._id);

                    // remove score for a user with an execluded match
                    Score.findOneAndRemove({ user: updatedUser._id, match: match._id }, function (err, score) {
                        if (err) return;
                        match.scores.pull(score._id);
                        updatedUser.scores.pull(score._id);
                        updatedUser.save();

                        match.save(function (err) {
                            if(err) return next(err);
                        });
                    });
                    
                });
            }
            updatedUser.save(function(err, savedUser) {
                if(err) return next(err);
                res.json({
                    success: true,
                    user: savedUser
                });
            });
        });
        
    });
}

/**
 * Deleting user
 *
 * @param req
 * @param res
 * @param next
 */
function deleteUsers(req, res, next) {
    var userId = req.params.id || null;
    if(!userId) next(errorHandler(404, "Not found"));
    User.remove({ _id: userId }, function(err) {
        if(err) return next(err);
        res.json({
            success: true
        });
    });
}
