angular.module('starter.controllers')

/*.controller('userCtrl', function($scope, UserAPI, UserResource) {

  $scope.users = [];
  $scope.driver_rides = [];
  $scope.passenger_rides = [];
  $scope.vehicles = [];
  $scope.ride = {};
  $scope.filter = '';
  $scope.message = '';*/

.controller('rideCtrl', function($scope, Ride, $http) {
  Ride.query().$promise.then(function(response){
    $scope.rides = response;
  });

  $scope.submitRide = function(newRide) {
    console.log("ride:");
    console.log(newRide);
    newRide.departure_time = newRide.endTime;
    $http.post('http://localhost:3000/api/rides', newRide).success(function(data) {
      console.log("data:");
      console.log(data);
    });
  }


  /*UserAPI.query(function(response) {
    $scope.users = response;
    console.log("Users:");
    console.log(response);
    for(i=0; i<$scope.users.length; i++) {
      if($scope.users[i].driver) {
        $scope.driver_rides[i] = $scope.users[i].driver.rides
        $scope.vehicles[i] = $scope.users[i].driver.vehicles
        // console.log("Driver ride[" + i + "]:");
        // console.log($scope.driver_rides[i]);
        // console.log("Vehicle[" + i + "]:");
        // console.log($scope.vehicles[i]);
      }
        $scope.passenger_rides[i] = $scope.users[i].passenger.rides
        // console.log("Passenger ride[" + i + "]:");
        // console.log($scope.passenger_rides[i]);
    }
  }, function(erro) {
    console.log(erro)
  });

  /*if($routeParams.id) {
      UserAPI.get({id: $routeParams.id}, function(ride) {
          $scope.ride = ride;
      }, function(erro) {
          console.log(erro);
          $scope.message = 'Não foi possível obter a carona'
      });
  }

  $scope.submit = function() {
    //  if($scope.form.$valid) {

       UserResource.register($scope.driver_rides[0])
       .then(function(dados){
         $scope.message = dados.message;
         if(dados.create) $scope.ride = {};
       })
       .catch(function(erro){
        $scope.message = erro.message;
       });

    // }
  };*/


  $scope.remove = function(ride) {
    console.log(ride);
		UserAPI.delete({ID: ride.id}, function(){
			var rideIndex = $scope.rides.indexOf(ride);
			$scope.rides.splice(rideIndex, 1);
			$scope.message = "Carona " + ride.title + " foi removida com sucesso!";
      console.log("Carona " + ride.title + " foi removida com sucesso!")
		}, function(erro){
			// console.log(erro);
      console.log("Não foi possivel remover a carona " + ride.title);
			$scope.message = "Não foi possivel remover a carona " + ride.title;
		});
	};

});
