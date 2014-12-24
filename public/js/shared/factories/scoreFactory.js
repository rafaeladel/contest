var scoreFactory = function($resource, restUrls, $routeParams) {
    return $resource(restUrls.score.index, {}, {
        getSpecific: {
            url: restUrls.score.getSpecific,
            method: "GET",
            params: {
                user_id: $routeParams.id,
                match_id: $routeParams.match_id
            },
            isArray: false
        },
        update: {
            url: restUrls.score.edit,
            method: "PUT",
            params: {
                user_id: $routeParams.id,
                match_id: $routeParams.match_id
            }
        },
        save: {
            url: restUrls.score.add,
            method: "POST",
            params: {
                contest_id: $routeParams.contest_id
            },
            isArray: false
        }
    });
};

angular.module("sharedMain").factory("Score", ["$resource", "restUrls", "$routeParams", scoreFactory]);