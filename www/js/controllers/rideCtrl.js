angular.module('starter.controllers')

.controller('rideCtrl', function($scope, $ionicHistory, RideAPI, ScheduleAPI, DaysAPI, VehicleAPI, UserAPI, RegisterRide, $http, $stateParams, $ionicModal) {
  $ionicHistory.clearHistory();
  $scope.ride = {};
  $scope.vehicle = {};
  $scope.schedule = {};
  $scope.day = {};
  $scope.message = '';
  $scope.filtro = '';


  $ionicModal.fromTemplateUrl('templates/rideSchedule.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //console.log($stateParams.user_id)

  UserAPI.query().$promise.then(function(response){
    $scope.users = response;
    console.log($scope.users);
  });

  ScheduleAPI.query().$promise.then(function(response){
    $scope.schedules = response;
    console.log($scope.schedules);
  });

  DaysAPI.query().$promise.then(function(response){
    $scope.days = response;
    console.log($scope.days);
  });

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

    RegisterRide.register($scope.ride, $scope.vehicle, $scope.schedule, $scope.day)
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

});
