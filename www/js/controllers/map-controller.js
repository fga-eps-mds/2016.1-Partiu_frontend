var app = angular.module("starter");

app.controller("mapCtrl", function ($scope) {

    $scope.destiny = {
      place: 'UnB Gama',
      desc: 'Campos de engenharia da Unb no gama',
      lat: -15.989572,
      lon: -48.045143
    };

    $scope.img = [
      {image: 'img/cars/sobrenatural.png'},
      {image: 'img/cars/fusca.png'}
    ];

    $scope.geolocalizacao = { lat: -15.989572, lon: -48.045143 };
    $scope.gotoCurrentLocation = function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var c = position.coords;
                console.log(c);
                $scope.gotoLocation(c.latitude, c.longitude);
            });
            return true;
        }
        return false;
    };

    $scope.gotoLocation = function (lat, lon) {
        if ($scope.geolocalizacao.lat != lat || $scope.geolocalizacao.lon != lon) {
            $scope.geolocalizacao = {lat: lat, lon: lon};
            if (!$scope.$$phase) $scope.$apply("geolocalizacao");
        }
    };

});
