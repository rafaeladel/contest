var usersListController = function($scope, User) {
    $scope.users = User.query();

};

var userIndexController = function ($scope, User, Contest, $routeParams, $rootScope, $location) {
    
    $scope.user = User.get({
        id: $routeParams.id
    });
    
    $scope.contests = Contest.query(function(contests) {
        $scope.selected_contest = contests[0];
        
        $scope.$watch("selected_contest", function(newVal, oldVal) {
            $scope.contest_matches = newVal.matches;
        });
    });

    $scope.assignMatch = function () {
        User.update({ id: $scope.user._id }, $scope.user, function(data) {
            $location.path("/admin/users")
        });
    };

    $rootScope.referer = $location.path();
};

var userAddController = function($scope, User, $location) {
    var user = new User();
    $scope.user = user;
    $scope.addUser = function(newUser) {
        newUser.$save(function(val , res){
            $scope.error = val;
            $location.path("/admin/users");
        });
    };
};

angular.module("adminMain")
    .controller("usersListController", ["$scope", "User", usersListController])
    .controller("userIndexController", ["$scope", "User", "Contest", "$routeParams", "$rootScope", "$location", userIndexController])
    .controller("userAddController", ["$scope", "User", "$location", userAddController]);