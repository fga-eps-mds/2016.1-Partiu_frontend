var app = angular.module("starter");

app.controller("mapCtrl", function ($scope) {

    $scope.destiny = {lat: 33, lon: 99};
    $scope.geolocalizacao = { lat: -15.989572, lon: -48.045143 };

    $scope.img = [
      {image: 'img/cars/sobrenatural.png'},
      {image: 'img/cars/fusca.png'}
    ];

    $scope.map;

    $scope.gotoCurrentLocation = function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var c = position.coords;
                $scope.gotoLocation(c.latitude, c.longitude);
                createOriginMarker();
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

    //Cria os marcadores de origem e destino no mapa
    var createOriginMarker = function() {
        var marker = $scope.geolocalizacao
        if (angular.isString(marker)) marker = scope.$eval($scope.geolocalizacao);
        var location = new google.maps.LatLng(marker.lat, marker.lon);
        originMarker = new google.maps.Marker({
          position: location,
          animation: google.maps.Animation.DROP,
          map: $scope.map, //Tentar colocar o icone nessa mapa
          icon: $scope.img[0].image,
          draggable: false,
        });
        originMarker.addListener('click', toggleBounce);
        // infoWindowOrigin(originMarker);
    };

    //Faz o marcadore de origem pular ao ser clicado
    var toggleBounce = function() {
      if (originMarker.getAnimation() !== null) {
        originMarker.setAnimation(null);
      } else {
        originMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };

});
