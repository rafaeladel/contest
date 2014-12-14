var matchFactory = function($resource, restUrls, $routeParams) {
    return $resource(restUrls.match.index, {}, {
        update: {
            url: restUrls.match.edit,
            method: "PUT"
        },
        save: {
            url: restUrls.match.add,
            method: "POST",
            params: {
                contest_id: $routeParams.contest_id
            },
            isArray: false
        }
    });
};

angular.module("sharedMain").factory("Match", ["$resource", "restUrls", "$routeParams", matchFactory]);