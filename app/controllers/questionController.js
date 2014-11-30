var Question = require("../models/questions"),
    errorHandler = require("../util/errorHandler");

function questionController() {
    return {
        list: listQuestions,
        index: indexQuestions,
        create: createQuestions,
        update: updateQuestions,
        delete: deleteQuestions
    };
}

module.exports = questionController();

/**
 * Listing all questions
 *
 * @param req
 * @param res
 * @param next
 */
function listQuestions(req, res, next) {
    Question.find({}, function(err, questions) {
        if(err) return next(err);
        res.json(questions);
    });
}

/**
 * Getting single question
 *
 * @param req
 * @param res
 * @param next
 */
function indexQuestions(req, res, next) {
    var questionId = req.params.id || null;
    if(!questionId) next(errorHandler(404, "Not found"));
    Question.findOne({ _id: questionId }, function(err, question) {
        if(err) return next(err);
        if(question.length === 0) return next(errorHandler(404, "Question not found"));
        res.json(question);
    });
}

/**
 * Creating question
 *
 * @param req
 * @param res
 * @param next
 */
function createQuestions(req, res, next) {
    Question.create(req.body, function(err, question) {
        if(err) return next(err);
        res.json({
            success: true,
            question: question
        });
    });
}

/**
 * Updating question
 *
 * @param req
 * @param res
 * @param next
 */
function updateQuestions(req, res, next) {
    var questionId = req.params.id || null;
    if(!questionId) next(errorHandler(404, "Not found"));
    Question.findOne({ _id: questionId }, function(err, question) {
        if(err) return next(err);
        if(question.length == 0) return next(errorHandler(404, "Question not found"));
        for(var member in req.body) {
            question[member] = req.body[member];
        }
        question.save(function(err) {
            if(err) return next(err);
            res.json({
                success: true,
                question: question
            });
        })
    });
}

/**
 * Deleting question
 *
 * @param req
 * @param res
 * @param next
 */
function deleteQuestions(req, res, next) {
    var questionId = req.params.id || null;
    if(!questionId) next(errorHandler(404, "Not found"));
    Question.remove({ _id: questionId }, function(err) {
        if(err) return next(err);
        res.json({
            success: true
        });
    });
}
