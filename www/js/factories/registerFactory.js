angular.module('starter.services')

.factory('RegisterRide', function(RideAPI, $q, $rootScope){

  var service = {};

  service.register = function(ride, backendId) {
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


.factory('RegisterVehicle', function(VehicleAPI, $q, $rootScope){

  var service = {};

  service.register = function(vehicle, backendId) {
    return $q(function(success, failure){
      if(vehicle.id) {
        VehicleAPI.update({vehicleID: vehicle.id, userId: backendId}, vehicle, function() {
          success({
            message: "Veiculo " + vehicle.car_model + " foi atualizada com sucesso!",
            create: false
          });
        }, function(erro){
          console.log(erro.status);
          failure({
            message: "Não foi possivel editar o veiculo " + vehicle.car_model
          });
        });
      } else {
        VehicleAPI.save({userId: backendId}, vehicle, function() {
            success({
              message: "Veiculo " + vehicle.car_model + " incluída com sucesso",
              create: true
            });
        }, function(erro) {
          console.log(erro.status);
          failure({
            message: "Não foi possível incluír o veiculo " + vehicle.car_model
          });
        });
      }
    });
  };

  return service;

})
