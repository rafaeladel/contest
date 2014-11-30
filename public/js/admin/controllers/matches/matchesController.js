var matchesListController = function($scope, Match) {
    $scope.matches = Match.query();
};

var matchIndexController = function ($scope, Match, Question, $routeParams, $rootScope, $location) {
    $scope.match = Match.get({
        id: $routeParams.id
    });
    $rootScope.referer = $location.path();
};

var matchAddController = function($scope, Contest, Match, $location, $routeParams) {
    var match = new Match();
    $scope.contest = Contest.get({
        id: $routeParams.contest_id
    });
    $scope.match = match;
    $scope.addMatch = function(newMatch) {
        newMatch.$save(function(val , res){
            $scope.error = val;
            $location.path("/admin/contests/" + $routeParams.contest_id);
        });
    }
};

angular.module("adminMain")
    .controller("matchesListController", ["$scope", "Match", matchesListController])
    .controller("matchIndexController", ["$scope", "Match", "Question", "$routeParams", "$rootScope", "$location", matchIndexController])
    .controller("matchAddController", ["$scope", "Contest", "Match", "$location", "$routeParams", matchAddController]);