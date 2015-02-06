var myApp = angular.module('userMain');

myApp.directive('keypressEvents', ["$document", "$rootScope", function ($document, $rootScope) {
	function link($scope, $element, $attrs) {
	    $document.bind('keypress', function (e) {

	    	var key = String.fromCharCode(e.which);
	    	if(key == 1 || key == 2 || key == 3) {
	            $scope.$emit('keypress', e, String.fromCharCode(e.which));
	    	}
	    });
    }

    return {
        restrict: 'A',
        link: link
    };
}]);
