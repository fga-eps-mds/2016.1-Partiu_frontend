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
      console.error("Não foi possível incluir a carona " + $scope.ride.title);
      $scope.message = "Não foi possível incluir a carona " + $scope.ride.title;
      console.error(erro);
    });
  };

})

.controller('showRideCtrl', function($scope, RideAPI, Profile, UserAPI, $stateParams, $state, $http) {
  $scope.imgs = [
    'img/others/enabled1.png',
    'img/others/enabled2.png',
    'img/others/enabled3.png',
    'img/others/enabled4.png'
  ]
  $scope.showEditRide = false
  $scope.showEnterButton = false
  $scope.showExitButton = false

  $scope.loadRide = function() {
    RideAPI.rides.get({rideId: $stateParams.id, userId: Profile.getUser().backendId}).$promise
      .then(function(response) {
        $scope.ride = response;
        var user_id = Profile.getUser().backendId;
        if ($scope.ride.driver) {
          var driver_id = $scope.ride.driver.user_id;

          UserAPI.query().$promise.then(function(response) {
            $scope.users = response;
            console.log("users:", $scope.users);
            for(i=0; i<$scope.users.length; i++) {
              if($scope.users[i].id == user_id) {
                $scope.current_user = $scope.users[i]
              }

              if($scope.users[i].id == driver_id){
                $scope.user_driver = $scope.users[i]
                  $scope.driver_vehicles = $scope.user_driver.driver.vehicles
              }
            }

            if ($scope.driver_vehicles) {
              for(i=0; i<$scope.driver_vehicles.length; i++) {
                if($scope.driver_vehicles[i].id == $scope.ride.vehicle_id)
                  $scope.vehicle_ride = $scope.driver_vehicles[i]
              }
            }

            if ($scope.ride.passengers) {
              for(i=0; i<=$scope.ride.passengers; i++) {
                if($scope.ride.passengers[i] == $scope.current_user.id && $scope.current_user.driver.id != $scope.ride.driver.id && $scope.ride.total_seats < 4)
                  $scope.showExitButton = true
                else if($scope.ride.passengers[i] != $scope.current_user.id && $scope.current_user.driver.id != $scope.ride.driver.id && $scope.ride.total_seats > 0)
                  $scope.showEnterButton = true
                else
                  $scope.showEditRide = true
              }
              $scope.imgs.splice(0, 4-$scope.ride.total_seats + $scope.ride.passengers.length)
            }


              $scope.enterRide = function() {
                if($scope.ride.total_seats > 0 && $scope.current_user.id != $scope.ride.driver.id) {
                  console.log("inserindo usuario ", $scope.current_user.id);
                  console.log("na carona ", $scope.ride.title);
                  $http.post(AppSettings.baseApiUrl + '/api/insert_passenger', {"ride_id": $scope.ride.id, "passenger_id": $scope.current_user.passenger.id}).success(function(response) {
                    console.log(response);
                  });
                  $scope.ride.passengers.push($scope.current_user.passenger);
                  $scope.ride.total_seats -= 1
                }
              }

            $scope.exitRide = function() {
              console.log("TOTAL SEATS:", $scope.ride.total_seats);
              if($scope.ride.total_seats < 4) {
                for(i=0; i<$scope.ride.passengers; i++) {
                  if($scope.ride.passengers[i] == $scope.current_user.passenger.id)
                    $scope.ride.passengers.splice(i, 1)
                }
                $scope.ride.total_seats += 1;
                RideAPI.userRides.update({userId: $scope.user_driver.id, rideId: $scope.ride.id}, {ride: $scope.ride}).$promise.then(function(response) {
                    console.log("Passageiro incluido com sucesso");
                    $state.go('menu.rides');
                  });
              }
            }

          });
      }
    }, function(erro) {
      $scope.message = "Não foi possivel encontrar a carona " + $stateParams.id;
    });
  };
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
