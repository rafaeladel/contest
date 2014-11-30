var userFactory = function($resource, restUrls) {
    return $resource(restUrls.user.index, {}, {
        update: {
            url: restUrls.user.edit,
            method: "PUT"
        },
        save: {
            url: restUrls.user.add,
            method: "POST",
            isArray: false
        }
    });
};

angular.module("adminMain").factory("User", ["$resource", "restUrls", userFactory]);