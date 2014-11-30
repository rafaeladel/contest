var matchFactory = function($resource, restUrls, $routeParams) {
    return $resource(restUrls.match.index, {}, {
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

angular.module("adminMain").factory("Match", ["$resource", "restUrls", "$routeParams", matchFactory]);