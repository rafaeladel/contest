var Match = require("../models/matches"),
    Contest = require("../models/contests"),
    errorHandler = require("../util/errorHandler"),
    _ = require("lodash");

function matchController() {
    return {
        list: listMatches,
        index: indexMatches,
        create: createMatches,
        update: updateMatches,
        delete: deleteMatches
    };
}

module.exports = matchController();

/**
 * Listing all matches
 *
 * @param req
 * @param res
 * @param next
 */
function listMatches(req, res, next) {
    Match.find({}).populate("users questions scores").exec(function(err, matches) {
        if(err) return next(err);
        res.json(matches);
    });
}

/**
 * Getting single match
 *
 * @param req
 * @param res
 * @param next
 */
function indexMatches(req, res, next) {
    var matchId = req.params.id || null;
    if(!matchId) next(errorHandler(404, "Not found"));
    Match.findOne({ _id: matchId }).populate("users questions scores").exec(function(err, match) {
        if(err) return next(err);
        if(match.length == 0) return next(errorHandler(404, "Match not found"));
        res.json(match);
    });
}

/**
 * Creating match
 *
 * @param req
 * @param res
 * @param next
 */
function createMatches(req, res, next) {
    Contest.findOne({ _id: req.params.contest_id }).populate("questions").exec(function(err, contest) {
        var match = new Match({ title: req.body.title, contest: contest._id, questions: contest.questions });
        match.save(function(err, match) {
            if(err) return next(err);
            contest.matches.push(match);
            contest.save(function(err, contest) {
                res.json({
                    success: true,
                    match: match
                });
            });

        });
    });
}

/**
 * Updating match
 *
 * @param req
 * @param res
 * @param next
 */
function updateMatches(req, res, next) {
    var matchId = req.params.id || null;
    if(!matchId) next(errorHandler(404, "Not found"));
    Match.findOne({ _id: matchId }, function(err, match) {
        if(err) return next(err);
        if(match.length === 0) return next(errorHandler(404, "Match not found"));
        for(var member in req.body) {
            if(member == "questions" || member == "users" || member == "scores"){
                match[member] = _.map(req.body[member], function(el) { return el._id; });
            } else {
                match[member] = req.body[member];
            }
        }
        match.save(function(err) {
            if(err) return next(err);
            res.json({
                success: true,
                match: match
            });
        })
    });
}

/**
 * Deleting match
 *
 * @param req
 * @param res
 * @param next
 */
function deleteMatches(req, res, next) {
    var matchId = req.params.id || null;
    if(!matchId) next(errorHandler(404, "Not found"));
    Match.remove({ _id: matchId }, function(err) {
        if(err) return next(err);
        res.json({
            success: true
        });
    });
}
