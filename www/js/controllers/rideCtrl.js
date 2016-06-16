angular.module('starter.controllers')

.controller('indexRideCtrl', function($scope, RideAPI, UserAPI, Profile) {
  $scope.rides = [];
  $scope.message = '';

  UserAPI.query().$promise.then(function(response) {
    $scope.users = response;
  });

  RideAPI.userRides.query({userId: Profile.getUser().backendId}).$promise.then(function(response) {
    $scope.rides = response;
  });
})

.controller('newRideCtrl', function($state, $scope, RideAPI, UserAPI, Profile) {

  $scope.ride = {};
  $scope.message = '';

  var user_id = Profile.getUser().backendId;
  UserAPI.query().$promise.then(function(response) {
    $scope.users = response;
    for(i=1; i<=$scope.users.length; i++) {
      if($scope.users[i-1].id == user_id){
        $scope.user = $scope.users[i-1];
        $scope.vehicles = $scope.user.driver.vehicles
      }
    }
  });

  $scope.createRide = function() {
    RideAPI.userRides.save({userId: Profile.getUser().backendId}, {ride: $scope.ride}).$promise
    .then(function(response) {
      console.log("Carona " + $scope.ride.title + " incluída com sucesso");
      $scope.message = "Carona " + $scope.ride.title + " incluída com sucesso";
      $state.go('menu.showRide', {"id": response.id});
    }, function(erro) {
      console.error("Não foi possível incluír a carona " + $scope.ride.title);
      $scope.message = "Não foi possível incluír a carona " + $scope.ride.title;
      console.error(erro);
    });
  };

})

.controller('showRideCtrl', function($scope, RideAPI, Profile, UserAPI, $stateParams) {

  var user_id = Profile.getUser().backendId;
  UserAPI.query().$promise.then(function(response) {
    $scope.users = response;
    for(i=1; i<=$scope.users.length; i++) {
      if($scope.users[i-1].id == user_id){
        $scope.user = $scope.users[i-1];
        $scope.vehicles = $scope.user.driver.vehicles
      }
    }
  });

  $scope.loadRide = function() {
    $scope.loadRide = RideAPI.rides.get({rideId: $stateParams.id, userId: Profile.getUser().backendId}).$promise
    .then(function(response) {
      $scope.ride = response;
      for(i=1; i<=$scope.vehicles.length; i++) {
        if($scope.vehicles[i-1].id == $scope.ride.vehicle_id)
          $scope.vehicle = $scope.vehicles[i-1]
      }
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar a carona " + $stateParams.id;
    });
  }

  $scope.loadRide();
})

.controller('editRideCtrl', function($state, $scope, RideAPI, Profile, UserAPI, $stateParams) {

  $scope.ride = {};

  var user_id = Profile.getUser().backendId;
  UserAPI.query().$promise.then(function(response) {
    $scope.users = response;
    for(i=1; i<=$scope.users.length; i++) {
      if($scope.users[i-1].id == user_id){
        $scope.user = $scope.users[i-1];
        $scope.vehicles = $scope.user.driver.vehicles
      }
    }
  });

  $scope.loadRide = function() {
    RideAPI.rides.get({rideId: $stateParams.id}).$promise
    .then(function(response) {
      $scope.ride = response;
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar a carona " + $stateParams.id;
    });
  }

  $scope.updateRide = function() {
    RideAPI.userRides.update({userId: Profile.getUser().backendId, rideId: $scope.ride.id}, {ride: $scope.ride}).$promise
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

.controller('rideNotificationCtrl', function(){


});
