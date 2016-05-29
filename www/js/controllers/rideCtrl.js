angular.module('starter.controllers')

.controller('indexRideCtrl', function($state, $scope, RideAPI, UserAPI, $http, Profile) {
  $scope.rides = [];
  $scope.message = '';

  UserAPI.query().$promise.then(function(response) {
    $scope.users = response;
  });

  RideAPI.userRides.query({userId: Profile.getUser().backendId}).$promise.then(function(response) {
    $scope.rides = response;
  });

})

.controller('newRideCtrl', function($state, $scope, RideAPI, UserAPI, $http, Profile) {

  $scope.ride = {};
  $scope.message = '';

  $scope.createRide = function() {
    RideAPI.userRides.save({userId: Profile.getUser().backendId}, {ride: $scope.ride, vehicle: $scope.vehicle}).$promise
    .then(function(response) {
      console.log("Carona " + $scope.ride.title + " incluída com sucesso");
      $state.go('menu.showRide', {"id": response.id});
    }, function(erro) {
      console.error("Não foi possível incluír a carona " + $scope.ride.title);
      console.error(erro);
    });
  };

})

.controller('showRideCtrl', function($scope, $ionicHistory, RideAPI, Profile, VehicleAPI, UserAPI, $http, $stateParams) {

  $scope.loadRide = function() {
    $scope.loadRide = RideAPI.rides.get({rideId: $stateParams.id, userId: Profile.getUser().backendId}).$promise
    .then(function(response) {
      $scope.ride = response;
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar a carona " + $stateParams.id;
    });
  }

  $scope.loadRide();
})

.controller('editRideCtrl', function($state, $scope, $ionicHistory, RideAPI, Profile, UserAPI, $http, $stateParams) {

  $scope.ride = {};

  $scope.loadRide = function() {
    RideAPI.rides.get({rideId: $stateParams.id}).$promise
    .then(function(response) {
      $scope.ride = response;
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar a carona " + $stateParams.id;
    });
  }

  $scope.updateRide = function() {
    console.log("asdf");
    RideAPI.userRides.update({userId: Profile.getUser().backendId, rideId: $scope.ride.id}, {ride: $scope.ride, vehicle: $scope.vehicle}).$promise
    .then(function(response) {
      console.log("Carona " + $scope.ride.title + " atualizada com sucesso");
      $state.go('menu.rides', {"id": response.id});
    }, function(erro) {
      console.error("Não foi possível atualizar a carona " + $scope.ride.title);
      console.error(erro);
    });
  };

  $scope.loadRide();
});
