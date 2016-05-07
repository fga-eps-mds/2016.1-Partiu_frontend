angular.module('starter.controllers')
/*
.controller('rideCtrl', function($scope, Ride) {
  Ride.query().$promise.then(function(response){
    $scope.rides = response;
  });
})

.controller('vehicleCtrl', function($scope, Vehicle) {
  Vehicle.query().$promise.then(function(response){
    $scope.vehicles = response;
  });
})
origin destiny is_only_departure total_seats departure_time return_time is_finished is_subsistence_allowance description rank
*/
.controller('rideCtrl', function ($scope){
   $scope.rides = [
       {nameDriver: 'Daniel', numberSeats: 4,
        img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7803325b0b54_main400-300x300.jpg",
        origin: 'Gama', destiny:'Asa Norte', is_only_departure: 'Sim',
        departure_time: '10:00', return_time:'12:00', is_finished: 'Não',
        is_subsistence_allowance: 'Não', description: 'Bora Galera!',
        rank: 'Confiável'
       },
       {nameDriver: 'Eduardo', numberSeats: 4,
        img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7803734ee134_main400-300x300.jpg",
        origin: 'Taguatinga', destiny:'Plano Piloto', is_only_departure: 'Sim',
        departure_time: '14:00', return_time:'19:00', is_finished: 'Não',
        is_subsistence_allowance: 'Sim', description: 'Partiu!',
        rank: 'Confiável'
       },
       {nameDriver: 'Arnauld', numberSeats: 0,
        img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7804712858de_main400-300x300.jpg",
        origin: 'Riacho Fundo', destiny:'Luziânia', is_only_departure: 'Não',
        departure_time: '12:00', return_time:'23:00', is_finished: 'Não',
        is_subsistence_allowance: 'Sim', description: 'Partiu!',
        rank: 'Confiável'
       },
       {nameDriver: 'Sconetto', numberSeats: 1,
        img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7804530f1b10_main400-300x300.jpg",
        origin: 'Gama', destiny:'Taguatinga', is_only_departure: 'Não',
        departure_time: '12:00', return_time:'23:00', is_finished: 'Não',
        is_subsistence_allowance: 'Sim', description: 'Partiu!',
        rank: 'Confiável'
       },



   ];
});
