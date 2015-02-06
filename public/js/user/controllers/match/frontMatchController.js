var frontMatchLandingController = function($scope, $routeParams, mySocket, User, Match, $location) {
    $scope.user = User.get({ id: $routeParams.id }, function() {
        mySocket.emit("match_landing_in", $scope.user);

        mySocket.on("socket:match_are_u_in", function(data) {
            mySocket.emit("match_landing_in", $scope.user);
        });

        mySocket.on("socket:match_start", function(data) {
            $location.path("/user/"+$scope.user._id+"/match/"+$scope.match._id+"/stage/"+data.stage);
        });

        mySocket.on("disconnect", function() {
            mySocket.emit("match_landing_in", $scope.user);
        });
    });
    $scope.match = Match.get({ id: $routeParams.match_id });


};

var frontMatchResultController = function($scope, $routeParams, mySocket, Score, $location)
{
    $scope.score = Score.getSpecific(function(scores){
    });
    mySocket.on("socket:match_start", function(data) {
        $location.path("/user/"+$scope.user._id+"/match/"+$scope.match._id+"/stage/"+data.stage);
    });
};

var frontMatchStartController = function($scope, $routeParams, mySocket, User, Match, Score, $location, $route, $rootScope) {
    $scope.user = User.get({ id: $routeParams.id });
    $scope.selected_answer = { answer: {} };
    $scope.showResult = false;
    $scope.key = null;
    $scope.countdown = null;
    $scope.disableAnswer = false;

    $scope.match = Match.get({ id: $routeParams.match_id }, function (match) {
        //getting question according to the current stage
        var stage = $routeParams.stage - 1;
        if(stage < match.questions.length) {
            $scope.question = match.questions[stage];
            match.stage = stage;

            Match.update({ id: match._id }, match, function(val, res) {});
        } else {

        }
    });


    $scope.submitAnswer = function (answer) {
        if($scope.countdown === 0 && $scope.showResult === true) {
            $scope.selected_answer.answer = answer; 
        }
        mySocket.emit("user_answered", { user: $scope.user, answer: answer});
    };

    $scope.countdownEnd = function(answer) {
        $scope.submitAnswer(answer);
        $scope.countdown = 1;
        mySocket.emit("show_user_result");   
    };

    $scope.$on('keypress', function (evt, obj, key) {
        $scope.$apply(function () {
            if(key <= Object.keys($scope.question.answers).length) {
                $scope.key = key;
                $scope.submitAnswer($scope.question.answers[key -1]);
            }
        });
    });

    $scope.$on("$destroy", function(e) {
        mySocket.removeAllListeners("socket:show_final_result");
    });

    mySocket.on("socket:show_final_result", function(data) {
        $location.path("/user/"+$scope.user._id+"/match/"+$scope.match._id+"/result");
        $scope.$destroy();
    });

    mySocket.on("socket:match_start", function(data) {
        $scope.countdown = 1;
        $location.path("/user/"+$scope.user._id+"/match/"+$scope.match._id+"/stage/"+data.stage);
    });

    mySocket.on("socket:start_stopwatch", function(data) {
        $scope.countdown = 0;
    });

    mySocket.on("socket:stop_stopwatch", function(data) {
        $scope.countdown = 1;
    });

    mySocket.on("socket:show_result", function(data) {
        if(!$scope.showResult){
            $scope.showResult = true;
            $scope.countdown = 1;
            if($scope.key) {
                if($scope.question.answers[$scope.key -1].is_true == "true" || $scope.question.answers[$scope.key -1].is_true == true || $scope.question.answers[$scope.key -1].is_true == 1 ) {
                    Score.update({}, { score: 10 }, function(val, res){});
                } 
            }
        }
    });

    mySocket.on("socket:match_are_u_in", function(data) {
        mySocket.emit("match_landing_in", $scope.user);
    });

    mySocket.emit("match_landing_in", $scope.user);
};

angular.module("userMain")
    .controller("frontMatchLandingController", ["$scope", "$routeParams", "mySocket", "User", "Match", "$location", frontMatchLandingController])
    .controller("frontMatchResultController", ["$scope", "$routeParams", "mySocket", "Score", "$location", frontMatchResultController])
    .controller("frontMatchStartController", ["$scope", "$routeParams", "mySocket", "User", "Match", "Score", "$location", "$route", "$rootScope", frontMatchStartController]);