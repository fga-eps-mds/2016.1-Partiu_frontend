var app = angular.module('starter');

app.controller('mapCtrl', function($scope, $ionicLoading, $compile) {
  var mapDiv = document.getElementById("map");
  var image = 'img/cars/sobrenatural.png';
  var marker = [];
  var line;
  var users = [
    {lat: -15.989091, lng: -48.045011},
    {lat: -15.802255, lng: -47.939872}
  ];
  var InfoHtml =  '<div id="content">'+
                    '<h3 class="infoHtml">Partiu!</h3>'+
                    '<div id="bodyContent">'+
                      '<p>Casa</p>'+
                    '</div>' +
                  '</div>';

  $scope.teste = "mapCtrl";
  $scope.img = image;
  $scope.users = users;

  //Cria o marcador do mapa
  var createIcon = function(map, position) {
      marker = new google.maps.Marker({
        position: position,
        animation: google.maps.Animation.DROP,
        icon: $scope.img,
        title: 'UnB',
        draggable: false,
      });
      marker.setMap(map);
      marker.addListener('click', toggleBounce);
  };

  //Faz o marcadore pular ao ser clicado
  var toggleBounce = function() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };

  //Deleta um marcador
  var deleteIcon = function() {
    marker.setMap(null);
  };

  //Cria uma janela de informação ao clicar no marcador
  var infoWindow = function(map) {
    var infowindow = new google.maps.InfoWindow({
      content:InfoHtml,
      maxWidth: 200
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  };



  var detectDevice = function() {
    var useragent = navigator.userAgent;

    if (useragent.indexOf('iPhone') != -1 ||
        useragent.indexOf('Android') != -1 ) {
      mapDiv.style.width = '100%';
      mapDiv.style.height = '100%';
    } else {
      mapDiv.style.width = '600px';
      mapDiv.style.height = '800px';
    }
  };

  var getTraficInformation = function(map) {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }

  var getPublicTransportation = function(map) {
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
  }

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    deleteIcon();

    $scope.loading = $ionicLoading.show({
      content: 'Procurando posição atual...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      $scope.map.setCenter($scope.position);
      $scope.loading.hide();
      createIcon($scope.map, $scope.position);
      infoWindow($scope.map);
    }, function(error) {
      alert('A posição atual não foi encontrada: ' + error.message);
    });
  };


  var initialize = function() {

    // detectDevice();

    var mapOptions = {
      center: users[0],
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapDiv, mapOptions);

    createIcon(map, users[0]);

    infoWindow(map);

    getTraficInformation(map);


    $scope.map = map;
  };

  google.maps.event.addDomListener(window, 'load', initialize);

});
