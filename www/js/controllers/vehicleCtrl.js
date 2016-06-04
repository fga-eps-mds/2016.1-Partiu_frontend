angular.module('starter.controllers')

.controller('indexVehicleCtrl', function($state, $scope, VehicleAPI, UserAPI, $http, Profile) {
  $scope.vehicles = [];
  $scope.message = '';

  UserAPI.query().$promise.then(function(response) {
    $scope.users = response;
    console.log($scope.users)
  });

  VehicleAPI.query({userId: Profile.getUser().backendId}).$promise.then(function(response) {
    $scope.vehicles = response;
    console.log($scope.vehicles)
  });
})

.controller('newVehicleCtrl', function($state, $scope, VehicleAPI, UserAPI, $http, Profile) {

  $scope.vehicle = {};
  $scope.message = '';

  $scope.createVehicle = function() {
    VehicleAPI.save({userId: Profile.getUser().backendId}, {vehicle: $scope.vehicle}).$promise
    .then(function(response) {
      console.log("Veículo " + $scope.vehicle.car_model + " incluída com sucesso");
      $scope.vehicle = {};
      $state.go('menu.showVehicle', {"id": response.id});
    }, function(erro) {
      console.error("Não foi possível incluír o veículo " + $scope.vehicle.car_model);
      console.error(erro);
    });
  };
})

.controller('showVehicleCtrl', function($scope, $ionicHistory, VehicleAPI, Profile, UserAPI, $http, $stateParams) {

  $scope.loadVehicle = function() {
    $scope.loadVehicle = VehicleAPI.get({vehicleId: $stateParams.id, userId: Profile.getUser().backendId}).$promise
    .then(function(response) {
      $scope.vehicle = response;
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar o veículo " + $stateParams.id;
    });
  }

  $scope.loadVehicle();
})

.controller('editVehicleCtrl', function($state, $scope, $ionicHistory, VehicleAPI, Profile, UserAPI, $http, $stateParams) {

  $scope.vehicle = {};

  $scope.loadVehicle = function() {
    VehicleAPI.get({vehicleId: $stateParams.id, userId: Profile.getUser().backendId}).$promise
    .then(function(response) {
      $scope.vehicle = response;
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar o veículo " + $stateParams.id;
    });
  }

  $scope.updateVehicle = function() {
    VehicleAPI.update({userId: Profile.getUser().backendId, vehicleId: $scope.vehicle.id}, {vehicle: $scope.vehicle}).$promise
    .then(function(response) {
      console.log("Veículo " + $scope.vehicle.car_model + " atualizada com sucesso");
      $state.go('menu.showVehicle', {"id": response.id});
    }, function(erro) {
      console.error("Não foi possível atualizar o veículo " + $scope.vehicle.car_model);
      console.error(erro);
    });
  };
  $scope.loadVehicle();
});

