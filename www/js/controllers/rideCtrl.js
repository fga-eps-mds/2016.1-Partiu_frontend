angular.module('starter.controllers')

.controller('rideCtrl', function($scope, $ionicHistory, RideAPI, VehicleAPI, UserAPI, RegisterRide, $http, Profile) {
  $ionicHistory.clearHistory();
  $scope.rides = [];
  $scope.vehicles = [];
  $scope.ride = {};
  $scope.vehicle = {};
  $scope.message = '';
  $scope.filtro = '';

  UserAPI.query().$promise.then(function(response){
    $scope.users = response;
  });

  RideAPI.query({userId: Profile.getUser().backendId}).$promise.then(function(response){
    $scope.rides = response;
  });

  VehicleAPI.query({userId: Profile.getUser().backendId}).$promise.then(function(response){
    $scope.vehicles = response;
  });

  $scope.remove = function(ride) {
		RideAPI.delete({rideId: ride.id, userId: ride.driver.user_id}, function(){
			var rideIndex = $scope.rides.indexOf(ride);
			$scope.rides.splice(rideIndex, 1);
			$scope.message = "Carona " + ride.title + " foi removida com sucesso!";
		}, function(erro){
			console.log(erro.status);
			$scope.message = "Não foi possivel remover a carona " + ride.title;
		});
	};

  $scope.submitRide = function() {
    RegisterRide.register($scope.ride, $scope.vehicle, Profile.getUser().backendId)
      .then(function(data_success){
        $scope.message = data_success.message;
        console.log($scope.message);
        if(data_success.create);
      })
    .catch(function(data_error){
      $scope.message = data_error.message;
      console.log($scope.message);
    });

  };

});
