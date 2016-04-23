var app = angular.module('starter');

app.controller('mapCtrl', function ($scope) {

    $scope.destiny = {lat: 33, lon: 99};
    $scope.geolocalizacao = { lat: -15.989572, lon: -48.045143 };

    $scope.img = [
      {image: 'img/cars/sobrenatural.png'},
      {image: 'img/cars/fusca.png'}
    ];

});
