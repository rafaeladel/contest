var contestFactory = function($resource, restUrls) {
    return $resource(restUrls.contest.index, {},{
        save: {
            url: restUrls.contest.add,
            method: "POST",
            isArray: false
        }
    });
};

angular.module("sharedMain").factory("Contest", ["$resource", "restUrls", contestFactory]);