angular.module('starter.controllers')

.controller('userCtrl', function($scope, UserAPI, UserResource) {

  $scope.users = [];
  $scope.rides = [];
  $scope.vehicles = [];
  $scope.ride = {};
  $scope.filter = '';
  $scope.message = '';

  UserAPI.query(function(response) {
    $scope.users = response;
    console.log(response);
    for(i=0; i<$scope.users.length; i++) {
      $scope.rides = $scope.users[i].driver_rides
      $scope.vehicles = $scope.users[i].driver_vehicles
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
  }*/

  $scope.submit = function() {
    //  if($scope.form.$valid) {

       UserResource.register($scope.rides)
       .then(function(dados){
         $scope.message = dados.message;
         if(dados.create) $scope.ride = {};
       })
       .catch(function(erro){
         $scope.message = erro.message;
       });

    // }
  };


  $scope.remove = function(ride) {
		UserAPI.delete({id: ride.id}, function(){
			var rideIndex = $scope.rides.indexOf(ride);
			$scope.rides.splice(rideIndex, 1);
			$scope.message = "Carona " + ride.title + " foi removida com sucesso!";
		}, function(erro){
			console.log(erro);
			$scope.message = "Não foi possivel remover a carona " + ride.title;
		});
	};

})
