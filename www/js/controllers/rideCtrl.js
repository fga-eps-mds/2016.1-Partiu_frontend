angular.module('starter.controllers')

.controller('rideCtrl', function($scope, RideAPI, $http) {
  $scope.rides = [];

  RideAPI.query().$promise.then(function(response){
    $scope.rides = response;
    console.log($scope.rides)
  });

  $scope.submitRide = function(newRide) {
    console.log("ride:");
    console.log(newRide);
    $http.post('http://localhost:3000/api/rides', newRide).success(function(data) {
      console.log("data_ride:");
      console.log(data);
    });
    $http.post('http://localhost:3000/api/vehicles', newRide).success(function(data) {
      console.log("data_vehicle");
      console.log(data);
    })
  }

});
