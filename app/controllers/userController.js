var User = require("../models/users"),
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
    User.find({}, function(err, users) {
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
    User.findOne({ _id: userId }, function(err, user) {
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
    console.log(req.body);

    var userId = req.params.id || null;
    if(!userId) next(errorHandler(404, "Not found"));
    User.findOne({ _id: userId }, function(err, user) {
        if(err) return next(err);
        if(user.length == 0) return next(errorHandler(404, "User not found"));
        for(var member in req.body) {
            user[member] = req.body[member];
        }
        user.save(function(err) {
            if(err) return next(err);
            res.json({
                success: true,
                user: user
            });
        })
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
