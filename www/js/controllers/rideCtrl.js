angular.module('starter.controllers')

.controller('rideCtrl', function($state, $scope, $ionicHistory, RideAPI, VehicleAPI, UserAPI, $http, Profile) {
  $ionicHistory.clearHistory();
  $scope.rides = [];
  $scope.vehicles = [];
  $scope.ride = {};
  $scope.vehicle = {};
  $scope.message = '';
  $scope.filtro = '';

  UserAPI.query().$promise.then(function(response) {
    $scope.users = response;
  });

  RideAPI.userRides.query({userId: Profile.getUser().backendId}).$promise.then(function(response) {
    $scope.rides = response;
  });

  VehicleAPI.query({userId: Profile.getUser().backendId}).$promise.then(function(response) {
    $scope.vehicles = response;
  });

  $scope.remove = function(ride) {
		RideAPI.userRide.delete({rideId: ride.id, userId: ride.driver.user_id}, function() {
			var rideIndex = $scope.rides.indexOf(ride);
			$scope.rides.splice(rideIndex, 1);
			$scope.message = "Carona " + ride.title + " foi removida com sucesso!";
		}, function(erro) {
			console.log(erro.status);
			$scope.message = "Não foi possivel remover a carona " + ride.title;
		});
	};

  $scope.submitRide = function() {
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

.controller('rideShowCtrl', function($scope, $ionicHistory, RideAPI, Profile, VehicleAPI, UserAPI, $http, $stateParams) {
  $scope.vehicles = [];

  VehicleAPI.query({userId: Profile.getUser().backendId}).$promise.then(function(response){
    $scope.vehicles = response;
    console.log($scope.vehicles);
  });

  RideAPI.rides.get({rideId: $stateParams.id, userId: Profile.getUser().backendId}).$promise
    .then(function(response) {
      $scope.ride = response;
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar a carona " + $stateParams.id;
    });
});
