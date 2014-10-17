var Contest = require("../models/contests"),
    errorHandler = require("../util/errorHandler");

function contestController() {
    return {
        list: listContests,
        index: indexContests,
        create: createContests,
        update: updateContests,
        delete: deleteContests
    };
}

module.exports = contestController();

/**
 * Listing all contests
 *
 * @param req
 * @param res
 * @param next
 */
function listContests(req, res, next) {
    Contest.find({}, function(err, contests) {
        if(err) return next(err);
        res.json(contests);
    });
}

/**
 * Getting single contest
 *
 * @param req
 * @param res
 * @param next
 */
function indexContests(req, res, next) {
    var contestId = req.params.id || null;
    if(!contestId) next(errorHandler(404, "Not found"));
    Contest.find({ _id: contestId }, function(err, contest) {
        if(err) return next(err);
        if(contest.length == 0) return next(errorHandler(404, "Contest not found"));
        res.json(contest);
    });
}

/**
 * Creating contest
 *
 * @param req
 * @param res
 * @param next
 */
function createContests(req, res, next) {
    Contest.create(req.body, function(err, contest) {
        if(err) return next(err);
        res.json({
            success: true,
            contest: contest
        });
    });
}

/**
 * Updating contest
 *
 * @param req
 * @param res
 * @param next
 */
function updateContests(req, res, next) {
    var contestId = req.params.id || null;
    if(!contestId) next(errorHandler(404, "Not found"));
    Contest.findOne({ _id: contestId }, function(err, contest) {
        if(err) return next(err);
        if(contest.length == 0) return next(errorHandler(404, "Contest not found"));
        for(var member in req.body) {
            contest[member] = req.body[member];
        }
        contest.save(function(err) {
            if(err) return next(err);
            res.json({
                success: true,
                contest: contest
            });
        })
    });
}

/**
 * Deleting contest
 *
 * @param req
 * @param res
 * @param next
 */
function deleteContests(req, res, next) {
    var contestId = req.params.id || null;
    if(!contestId) next(errorHandler(404, "Not found"));
    Contest.remove({ _id: contestId }, function(err) {
        if(err) return next(err);
        res.json({
            success: true
        });
    });
}
