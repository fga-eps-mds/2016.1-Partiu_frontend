angular.module('starter.controllers')

.controller('rideCtrl', function($scope, RideAPI, VehicleAPI, RegisterRide, $http) {
  $scope.rides = [];
  $scope.vehicles = [];
  $scope.ride = {};
  $scope.vehicle = {};
  $scope.message = '';
  $scope.filtro = '';

  /*if($routeParams.rideID) {
      RideAPI.get({rideId: $routeParams.rideID}, function(ride) {
          $scope.ride = ride;
      }, function(erro) {
          console.log(erro.status);
          $scope.message = 'Não foi possível obter a carona'
      });
  }*/

  RideAPI.query().$promise.then(function(response){
    $scope.rides = response;
    console.log($scope.rides);
  });

  VehicleAPI.query().$promise.then(function(response){
    $scope.vehicles = response;
    console.log($scope.vehicles);
  });

  $scope.remove = function(ride) {
		RideAPI.delete({rideID: ride.id}, function(){
			var rideIndex = $scope.rides.indexOf(ride);
			$scope.rides.splice(rideIndex, 1);
			$scope.message = "Carona " + ride.title + " foi removida com sucesso!";
		}, function(erro){
			console.log(erro.status);
			$scope.message = "Não foi possivel remover a carona " + ride.title;
		});
	};

  $scope.submitRide = function() {
    //  if($scope.form.$valid) {
       console.log("ride:");
       console.log($scope.ride);
       console.log($scope.vehicle);

       RegisterRide.register($scope.ride, $scope.vehicle)
       .then(function(data_success){
         $scope.message = data_success.message;
         console.log($scope.message);
         if(data_success.create) $scope.ride = {};
       })
       .catch(function(data_error){
         $scope.message = data_error.message;
         console.log($scope.message);
       });

    // }
  };
});
