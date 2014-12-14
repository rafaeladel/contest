var frontPageController = function($scope, User) {
    $scope.users = User.query({});
};

angular.module("userMain")
    .controller("frontPageController", ["$scope", "User", frontPageController]);