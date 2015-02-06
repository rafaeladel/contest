var matchesListController = function($scope, Match) {
    $scope.matches = Match.query();
};

var matchIndexController = function ($scope, Match, Question, $routeParams, mySocket, $rootScope, $location) {
    $scope.match = Match.get({ id: $routeParams.id }, function(match) {
        $scope.total_count = match.users.length;
    });

    $scope.current_users = [];
    $scope.current_count = 0;
    mySocket.on("socket:match_landing_in", function (data) {
        var isNew = $scope.current_users.filter(function(el) {
            return el._id == data._id;
        });
        if(isNew.length === 0) {
            $scope.current_users.push(data);
            $scope.current_count = $scope.current_users.length;
            $scope.$apply();
        }
    });

    mySocket.emit("match_are_u_in", true);

    $scope.startMatch = function() {
        $scope.match = Match.get({ id: $routeParams.id }, function(match) {
            $scope.total_count = match.users.length;
            
            var stage = $scope.match.stage + 1;
            mySocket.emit("match_start", { stage: stage });
            mySocket.emit("match_start_audience", { match: match });
            $location.path("/admin/match/"+$scope.match._id+"/monitor");
        });

    };

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
    };

};

var matchMonitorController = function ($scope, Contest, Match, Question, mySocket, $location, $routeParams) {
    $scope.match = Match.get({ id: $routeParams.match_id }, function (match) { 
        $scope.question = match.questions[match.stage];
        if(match.stage + 1 >= match.questions.length) {
            $scope.matchEnded = true;
            match.scores.forEach(function(el) {
                $scope.scores[el.user] = el.score;
            });
        }
        mySocket.emit("match_start_audience", { match: match, question: $scope.question });
    });
    $scope.stopwatchValue = null;

    $scope.scores = [];
    $scope.users_ready = [];
    $scope.answers = [];
    $scope.showResult = false;
    $scope.matchEnded = false;
    $scope.countdown = { init: true };
    
    $scope.nextQuestion = function() {
        $scope.match = Match.get({ id: $routeParams.match_id }, function(match) {
            if(match.stage + 1 < match.questions.length) {
                $scope.question = match.questions[match.stage + 1];
                $scope.users_ready = [];
                $scope.answers = [];
                $scope.showResult = false;
                $scope.matchEnded = false;
                $scope.countdown.init = true;

                // For displaying score for each user
                match.scores.forEach(function(el) {
                    $scope.scores[el.user] = el.score;
                });
                mySocket.emit("match_start", { stage: $scope.match.stage + 2 });
                mySocket.emit("match_start_audience", { match: match, question: $scope.question });
            }

            if(match.stage + 2 == match.questions.length) {
                $scope.matchEnded = true;
            }
        });
    };
    $scope.checkAnswers = function() {
        $scope.showResult = true;
        mySocket.emit("show_result", true);
        mySocket.emit("show_user_result", true);
    };

    $scope.getResults = function() {
        mySocket.emit("match_result_audience", { match: $scope.match });

        mySocket.emit("show_final_result", { match: $scope.match });
    };

    $scope.startStopwatch = function() {
        mySocket.emit("start_stopwatch");
        $scope.stopwatchValue = 0;
        $scope.countdown.started = true;
        $scope.countdown.stopped = false;
        $scope.countdown.init = false;
    };
    $scope.stopStopwatch = function() {
        mySocket.emit("stop_stopwatch");
        $scope.stopwatchValue = 1;
        $scope.countdown.started = false;
        $scope.countdown.init = false;
        $scope.countdown.stopped = true;

    };

    mySocket.on("socket:show_user_result", function(data) {
        $scope.showResult = true;
    });

    mySocket.on("socket:user_answered", function (data) {
        if($scope.users_ready.indexOf(data.user._id) == -1) {
            $scope.users_ready.push(data.user._id);
            $scope.answers[data.user._id] = data.answer;
        } else {
            $scope.answers[data.user._id] = data.answer;
        }
    });
};



angular.module("adminMain")
    .controller("matchesListController", ["$scope", "Match", matchesListController])
    .controller("matchIndexController", ["$scope", "Match", "Question", "$routeParams", "mySocket", "$rootScope", "$location", matchIndexController])
    .controller("matchAddController", ["$scope", "Contest", "Match", "$location", "$routeParams", matchAddController])
    .controller("matchMonitorController", ["$scope", "Contest", "Match", "Question", "mySocket", "$location", "$routeParams", matchMonitorController]);