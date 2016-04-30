angular.module('starter.directives')

.directive("appMap", function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        controller: 'mapCtrl',
        link: function(scope, element, attrs) {
              scope.initialize(element[0]);
        }
    };
});
