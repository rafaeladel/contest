var frontMatchLandingController = function($scope, $routeParams, mySocket, User, Match, $location) {
    $scope.user = User.get({ id: $routeParams.id });
    $scope.match = Match.get({ id: $routeParams.match_id });

    mySocket.emit("match_landing_in", $scope.user);
    mySocket.on("socket:match_start", function(data) {
        $location.path("/user/"+$scope.user._id+"/match/"+$scope.match._id+"/start");
    });

    mySocket.on("socket:match_are_u_in", function(data) {
        mySocket.emit("match_landing_in", $scope.user);
    });
};

var frontMatchStartController = function($scope, $routeParams, mySocket, User, Match, $location) {
    $scope.user = User.get({ id: $routeParams.id });
    $scope.match = Match.get({ id: $routeParams.match_id }, function (match) {
        if(match.stage == match.questions.length) {
            //trigger match_end event
        } else {
            $scope.question = match.questions[match.stage];
            match.stage++;
            console.log(match);
            Match.update({ id: match._id}, match, function(val, res) {
                console.log(val);
            });

        }

    });

    mySocket.on("socket:match_are_u_in", function(data) {
        mySocket.emit("match_landing_in", $scope.user);
    });

    mySocket.emit("match_landing_in", $scope.user);
};

angular.module("userMain")
    .controller("frontMatchLandingController", ["$scope", "$routeParams", "mySocket", "User", "Match", "$location", frontMatchLandingController])
    .controller("frontMatchStartController", ["$scope", "$routeParams", "mySocket", "User", "Match", "$location", frontMatchStartController]);