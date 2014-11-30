var contestFactory = function($resource, restUrls) {
    return $resource(restUrls.contest.index, {},{
        save: {
            url: restUrls.contest.add,
            method: "POST",
            isArray: false
        }
    });
};

angular.module("adminMain").factory("Contest", ["$resource", "restUrls", contestFactory]);