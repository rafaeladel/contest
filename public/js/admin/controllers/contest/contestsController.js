var contestsListController = function($scope, Contest) {
    $scope.contests = Contest.query();
};

var contestIndexController = function ($scope, Contest, Question, $routeParams, $rootScope, $location) {
    Contest.get({ id: $routeParams.id }, function (data) {
        $scope.contest = data;
        $scope.selected_questions = [];
        for(var i = 0; i < data.questions.length ; i++) {
            $scope.selected_questions.push(data.questions[i]);
        }
        $scope.questions = Question.query();
        $scope.manageQuestions = function (questions) {
            Question.addToContest({ contest_id: $routeParams.id }, questions, function(data) {
                $location.path("/admin/contests");
            });
        };
    });

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