angular.module('starter.services')

.factory('RegisterRide', function(RideAPI, VehicleAPI, $q, $rootScope){

  var service = {};

  service.register = function(ride, vehicle, backendId) {
    return $q(function(success, failure){
      if(ride.id) {
        RideAPI.update({rideID: ride.id, userId: backendId}, ride, function() {
          success({
            message: "Carona " + ride.title + " foi atualizada com sucesso!",
            create: false
          });
        }, function(erro){
          console.log(erro.status);
          failure({
            message: "Não foi possivel editar a carona " + ride.title
          });
        });
      } else {
        RideAPI.save({userId: backendId}, ride, function() {
            success({
              message: "Carona " + ride.title + " incluída com sucesso",
              create: true
            });
        }, function(erro) {
          console.log(erro.status);
          failure({
            message: "Não foi possível incluír a carona " + ride.title
          });
        });
      }
    });
  };

  return service;

})
