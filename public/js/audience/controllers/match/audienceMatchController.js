var audienceMatchController = function ($scope, mySocket, Score, $location) {
    mySocket.on("socket:match_start_audience", function(data) {
        $scope.match = data.match;
        $scope.question = data.question;
        $scope.users_ready = [];
        $scope.answers = [];
        $scope.showResult = false;
        $scope.showFinalResult = false;
        $scope.countdown = 1;
    });
    
    $scope.audienceCountdown = function() 
    {
        console.log("ended");
    };
   
    mySocket.on("socket:user_answered", function (data) {
        if($scope.users_ready.indexOf(data.user._id) == -1) {
            $scope.users_ready.push(data.user._id);
            $scope.answers[data.user._id] = data.answer;
        } else {
            $scope.answers[data.user._id] = data.answer;
        }
    });

    mySocket.on("socket:show_result", function(data) {
        $scope.showResult = true;
        $scope.countdown = 1;
    });

    mySocket.on("socket:show_user_result", function(data) {
        // $scope.showResult = true;
    });

    mySocket.on("socket:start_stopwatch", function(data) {
        $scope.countdown = 0;
    });

    mySocket.on("socket:stop_stopwatch", function(data) {
        $scope.countdown = 1;
    });

    mySocket.on("socket:match_result_audience", function(data) {
        var scores_flat = data.match.scores;
        var scores_populated = [];
        scores_flat.forEach(function(el) {
            Score.get({ id: el._id }, function(score) {
                scores_populated.push(score);
            });
        });
        $scope.scores = scores_populated;
        $scope.showFinalResult = true;
    });
};



angular.module("audienceMain")
    .controller("audienceMatchController", ["$scope", "mySocket", "Score", "$location", audienceMatchController]);