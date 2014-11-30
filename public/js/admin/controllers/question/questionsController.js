var questionsListController = function ($scope, Question) {
    $scope.questions = Question.query();
};

var questionIndexController = function ($scope, Question, $routeParams) {
    var question = Question.get({id: $routeParams.id});
    $scope.question = question;
    console.log(question);
};

var questionAddController = function ($scope, Question, $location, $rootScope) {
    var question = new Question();
    question.questionType = 0;
    $scope.question = question;
    $scope.addQuestion = function (newQuestion) {
        newQuestion.$save(function (val, res) {
            $scope.error = val;
            $location.path($rootScope.referer || "/admin/questions");
        });
    };
};

angular.module("adminMain")
    .controller("questionsListController", ["$scope", "Question", questionsListController])
    .controller("questionIndexController", ["$scope", "Question", "$routeParams", questionIndexController])
    .controller("questionAddController", ["$scope", "Question", "$location", "$rootScope", questionAddController]);