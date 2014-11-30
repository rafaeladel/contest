var questionType = function () {
    return {
        restrict: "AE",
        scope: {
            question: "="
        },
        templateUrl: "../../../../partials/admin/question/partial/question_type.html",
        link: function (scope, element, attrs) {
            scope.$watch("question.questionType", function (val) {
                scope.show_mcq = val == 0;
                scope.show_tf = val == 1;
                if (val == 1) {
                    scope.question.answers = [
                        { content: "true" },
                        { content: "false"}
                    ]
                }
            });
        }
    }
};
angular.module("adminMain").directive("questionType", questionType);