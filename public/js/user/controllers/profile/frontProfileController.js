var frontProfileController = function($scope, $routeParams, mySocket, User) {
    $scope.user = User.get({ id: $routeParams.id });
    mySocket.on("socket:test_response", function (ev, data) {
        console.log("wewE");
    });

};

angular.module("userMain")
    .controller("frontProfileController", ["$scope", "$routeParams", "mySocket", "User", frontProfileController]);
