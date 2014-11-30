var contestsListController = function($scope, Contest) {
    $scope.contests = Contest.query();
};

var contestIndexController = function ($scope, Contest, Question, $routeParams, $rootScope, $location) {
    $scope.contest = Contest.get({
        id: $routeParams.id
    });
    $scope.questions = Question.query();
    $rootScope.referer = $location.path();
};
var contestAddController = function($scope, Contest, $location) {
    var contest = new Contest();
    $scope.contest = contest;
    $scope.addContest = function(newContest) {
        newContest.$save(function(val , res){
            $scope.error = val;
            $location.path("/admin/contests");
        });
    }
};

angular.module("adminMain")
    .controller("contestsListController", ["$scope", "Contest", contestsListController])
    .controller("contestIndexController", ["$scope", "Contest", "Question", "$routeParams", "$rootScope", "$location", contestIndexController])
    .controller("contestAddController", ["$scope", "Contest", "$location", contestAddController]);