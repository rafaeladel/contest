var questionFactory = function($resource, restUrls, $routeParams) {
    return $resource(restUrls.question.index, {}, {
        addToContest: {
            url: restUrls.question.addToContest,
            method: "POST",
            params: {
                contest_id: $routeParams.contest_id
            }
        },
        save: {
            url: restUrls.question.add,
            method: "POST",
            isArray: false
        }
    });
};

angular.module("sharedMain").factory("Question", ["$resource", "restUrls", "$routeParams", questionFactory]);