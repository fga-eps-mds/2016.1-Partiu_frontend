angular.module('starter.controllers')

.controller('rideCtrl', function($scope, Ride) {
  Ride.query().$promise.then(function(response){
    $scope.rides = response;
  });
})

.controller('vehicleCtrl', function($scope, Vehicle) {
  Vehicle.query().$promise.then(function(response){
    $scope.vehicles = response;
  });
})
