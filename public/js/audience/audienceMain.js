angular.module("audienceMain", ["sharedMain", "ngRoute", "ngResource"])
    .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when("/audience/match", {
                controller: "audienceMatchController",
                templateUrl: "../../partials/audience/match/monitor.html"
            })
        ;

    }]);