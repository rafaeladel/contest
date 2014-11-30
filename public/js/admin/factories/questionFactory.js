var questionFactory = function($resource, restUrls) {
    return $resource(restUrls.question.index, {}, {
        save: {
            url: restUrls.question.add,
            method: "POST",
            isArray: false
        }
    });
};

angular.module("adminMain").factory("Question", ["$resource", "restUrls", questionFactory]);