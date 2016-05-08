angular.module('starter.controllers')

.controller('rideCtrl', function($scope, Ride, $http) {
  Ride.query().$promise.then(function(response){
    $scope.rides = response;
  });

  $scope.submitRide = function(newRide) {
    console.log("ride:");
    console.log(newRide);
    newRide.departure_time = newRide.endTime;
    $http.post('http://localhost:3000/api/rides', newRide).success(function(data) {
      console.log("data:");
      console.log(data);
    });
  }
})

.controller('vehicleCtrl', function($scope, Vehicle) {
  Vehicle.query().$promise.then(function(response){
    $scope.vehicles = response;
  });
})
