angular.module("userMain", ["sharedMain", "ngRoute", "ngResource"])
    .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when("/", {
                controller: "frontPageController",
                templateUrl: "../../partials/user/main/index.html"
            })
            .when("/user/:id", {
                controller: "frontProfileController",
                templateUrl: "../../partials/user/profile/index.html"
            })
            .when("/user/:id/match/:match_id", {
                controller: "frontMatchLandingController",
                templateUrl: "../../partials/user/match/match_landing.html"
            })
            .when("/user/:id/match/:match_id/stage/:stage", {
                controller: "frontMatchStartController",
                templateUrl: "../../partials/user/match/match_running.html"
            })
            .when("/user/:id/match/:match_id/result", {
                controller: "frontMatchResultController",
                templateUrl: "../../partials/user/match/match_result.html"
            })
        ;

    }]);