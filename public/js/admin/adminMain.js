angular.module("adminMain", ["sharedMain", "ngRoute", "ngResource", "checklist-model"])
    .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when("/admin", {
                controller: "mainPageController",
                templateUrl: "../../partials/admin/main/index.html"
            })
            .when("/admin/contests/add", {
                controller: "contestAddController",
                templateUrl: "../../partials/admin/contest/add.html"
            })
            .when("/admin/contests/:id", {
                controller: "contestIndexController",
                templateUrl: "../../partials/admin/contest/index.html"
            })
            .when("/admin/contests/", {
                controller: "contestsListController",
                templateUrl: "../../partials/admin/contest/list.html"
            })
            .when("/admin/questions/add", {
                controller: "questionAddController",
                templateUrl: "../../partials/admin/question/add.html"
            })
            .when("/admin/questions/:id", {
                controller: "questionIndexController",
                templateUrl: "../../partials/admin/question/index.html"
            })
            .when("/admin/questions/", {
                controller: "questionsListController",
                templateUrl: "../../partials/admin/question/list.html"
            })
            .when("/admin/contests/:contest_id/matches/add", {
                controller: "matchAddController",
                templateUrl: "../../partials/admin/match/add.html"
            })
            .when("/admin/matches/:id", { controller: "matchIndexController", templateUrl: "../../partials/admin/match/index.html"})
            .when("/admin/match/:match_id/monitor", {
                controller: "matchMonitorController" ,
                templateUrl: "../../partials/admin/match/monitor.html"
            })
            .when("/admin/matches/", {
                controller: "matchesListController",
                templateUrl: "../../partials/admin/match/list.html"
            })
            .when("/admin/users/add", {
                controller: "userAddController",
                templateUrl: "../../partials/admin/user/add.html"
            })
            .when("/admin/users/:id", {
                controller: "userIndexController",
                templateUrl: "../../partials/admin/user/index.html"
            })
            .when("/admin/users/", {
                controller: "usersListController",
                templateUrl: "../../partials/admin/user/list.html"
            })

            .otherwise({
                redirectTo: "/admin"
            })
        ;

    }]);