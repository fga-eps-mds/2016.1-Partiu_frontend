angular.module('starter.directives')

.directive("filterRide", function() {
	return {
		restrict: "E",
		transclude: true,
        templateUrl: 'templates/filterRide.html'
	}
})