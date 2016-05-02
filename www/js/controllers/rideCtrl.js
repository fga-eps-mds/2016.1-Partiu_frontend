angular.module('starter.controllers')

.controller('rideCtrl', function($scope, Ride) {
  Ride.query().$promise.then(function(response){
    $scope.rides = response;
  });
})
