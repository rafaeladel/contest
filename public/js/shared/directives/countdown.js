angular.module("sharedMain").directive("countdown", ["$interval", function($interval) {
	return {	
		restrict: "E",
		scope: {
			start: "=",
			questionType: "=",
			onFinish: "&"
		},
		template: "<div class='countdown-wrapper'><p>{{ counter }}</p></div>",
		link: function(scope, element, attrs) {
			var stop;
			scope.$watch("start", function(value) {
				if(scope.questionType === 0) {
					scope.counter = 30;
				} else if(scope.questionType === 1) {
					scope.counter = 15;
				}

				if(scope.start === 0) {
					
					stop = $interval(function() {
						if(scope.counter !== 0) {
							scope.counter -= 1;
						} else {
							scope.onFinish();
							$interval.cancel(stop);
						}
					}, attrs.interval);
				} else if(scope.start === 1) {
					scope.counter = 0;
					$interval.cancel(stop);
				}		
			});
			
		}
	};	
}]);