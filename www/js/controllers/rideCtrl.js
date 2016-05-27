angular.module('starter.controllers')

.controller('rideCtrl', function($scope, $ionicHistory, RideAPI, VehicleAPI, UserAPI, RegisterRide, $http) {
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

  RideAPI.query().$promise.then(function(response){
    $scope.rides = response;
  });

  VehicleAPI.query().$promise.then(function(response){
    $scope.vehicles = response;
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
    RegisterRide.register($scope.ride, $scope.vehicle)
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

  $scope.testStub = function (value) {
    return value*5;
  }

})

.controller('rideShowCtrl', function($scope, $ionicHistory, RideAPI, VehicleAPI, UserAPI, RegisterRide, $http, $stateParams) {
  $scope.vehicles = [];

  VehicleAPI.query().$promise.then(function(response){
    $scope.vehicles = response;
    console.log($scope.vehicles);
  });

  RideAPI.get({rideID: $stateParams.id}).$promise.then(function(response){
    $scope.ride = response;
  }, function(erro){
    console.error("ID not found");
    $scope.message = "Não foi possivel encontrar a carona " + $stateParams.id;
  });
});
