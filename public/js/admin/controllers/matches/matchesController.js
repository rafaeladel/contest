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
        if(isNew.length == 0) {
            $scope.current_users.push(data);
            $scope.current_count = $scope.current_users.length;
            $scope.$apply();
        }
    });

    mySocket.emit("match_are_u_in", true);

    $scope.startMatch = function() {
        mySocket.emit("match_start", true)
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
    }

};



angular.module("adminMain")
    .controller("matchesListController", ["$scope", "Match", matchesListController])
    .controller("matchIndexController", ["$scope", "Match", "Question", "$routeParams", "mySocket", "$rootScope", "$location", matchIndexController])
    .controller("matchAddController", ["$scope", "Contest", "Match", "$location", "$routeParams", matchAddController]);