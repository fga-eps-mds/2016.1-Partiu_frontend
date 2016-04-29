var app = angular.module('starter');
app.controller('rideCtrl', function ($scope){
    $scope.rides = [
        {nameDriver: 'Nome motorista 1', numberSeats: 10},
        {nameDriver: 'Nome motorista 2', numberSeats: 10}
    ];
});
