var Score = require("../models/scores"),
    Contest = require("../models/contests"),
    errorHandler = require("../util/errorHandler"),
    _ = require("lodash");

function scoreController() {
    return {
        list: listScores,
        index: indexScores,
        getSpecific: getSpecificScore,
        create: createScores,
        update: updateScores,
        delete: deleteScores
    };
}

module.exports = scoreController();

/**
 * Listing all scores
 *
 * @param req
 * @param res
 * @param next
 */
function listScores(req, res, next) {
    Score.find({}).populate("user match").exec(function(err, scores) {
        if(err) return next(err);
        res.json(scores);
    });
}

/**
 * Getting single score
 *
 * @param req
 * @param res
 * @param next
 */
function indexScores(req, res, next) {
    var scoreId = req.params.id || null;
    if(!scoreId) next(errorHandler(404, "Not found"));
    Score.findOne({ _id: scoreId }).populate("user match").exec(function(err, score) {
        if(err) return next(err);
        if(score.length === 0) return next(errorHandler(404, "Score not found"));
        res.json(score);
    });
}

function getSpecificScore(req, res, next) {
    Score.findOne({ user: req.params.user_id, match: req.params.match_id }).populate("user match").exec(function(err, score) {
        if(err) return next(err);
        if(score.length === 0) return next(errorHandler(404, "Score not found"));
        res.json(score);
    });
}

/**
 * Creating score
 *
 * @param req
 * @param res
 * @param next
 */
function createScores(req, res, next) {
    Match.findOne({ _id: req.params.match_id }).exec(function(err, match) {
        User.findOne({_id: req.params.user_id}).exec(function (err, user) {
            var score = new Score({score: 0, user: user._id, match: match._id});
            score.save(function (err, score) {
                if (err) return next(err);

                user.scores.push(score);
                user.save(function(err, user) {});

                match.scores.push(score);
                match.save(function(err, match) {});

                res.json({
                    success: true,
                    score: score
                });

            });
        });
    });
}

/**
 * Updating score
 *
 * @param req
 * @param res
 * @param next
 */
function updateScores(req, res, next) {
    //var scoreId = req.params.user_id || null;
    //if(!scoreId) next(errorHandler(404, "Not found"));
    //console.log("Tes");
    //Score.findOneAndUpdate({ user: req.params.user_id, match: req.params.match_id }, req.body, function (err, score) {
    //    if(err) return next(err);
    //    res.json({
    //        success: true,
    //        score: score
    //    });
    //});

    Score.findOne({ user: req.params.user_id, match: req.params.match_id }, function(err, score) {
        if(err) return next(err);
        if(score.length == 0) return next(errorHandler(404, "Score not found"));
        score.score = score.score + req.body.score;
        score.save(function(err) {
            if(err) return next(err);
            res.json({
                success: true,
                score: score
            });
        })
    });
}

/**
 * Deleting score
 *
 * @param req
 * @param res
 * @param next
 */
function deleteScores(req, res, next) {
    var scoreId = req.params.id || null;
    if(!scoreId) next(errorHandler(404, "Not found"));
    Score.remove({ _id: scoreId }, function(err) {
        if(err) return next(err);
        res.json({
            success: true
        });
    });
}
