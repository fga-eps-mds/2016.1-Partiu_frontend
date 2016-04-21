var app = angular.module('starter');

app.controller('mapCtrl2', function($scope, $ionicLoading, $compile) {
  var findMe = false;
  var marker = [];
  var line;
  var image = 'img/cars/sobrenatural.png';
  var origin_place_id = null;
  var destination_place_id = null;
  var travel_mode = google.maps.TravelMode.DRIVING;
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var mapDiv = document.getElementById("map");
  var origin_input = document.getElementById('origin-input');
  var destination_input = document.getElementById('destination-input');
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

  console.log(mapDiv);
  console.log(findMe);
  $scope.teste = "Testando...";
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

  /* Detecta o tipo de dispositivo, movel ou desktop */
  var detectDevice = function(mapDiv) {
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

  /* Pega as informações de trafego das vias */
  var getTraficInformation = function(map) {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }

  /* Localiza o usuário */
  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    deleteIcon();
    findMe = true;
    console.log(findMe);

    $scope.loading = $ionicLoading.show({
      content: 'Procurando posição atual...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      $scope.map.setCenter($scope.position);
      $ionicLoading.hide();
      createIcon($scope.map, $scope.position);
      infoWindow($scope.map);
    }, function(error) {
      alert('A posição atual não foi encontrada: ' + error.message);
    });
  };

  /* Organizar o formulario dentro do mapa */
  var organizeInputs = function(map, origin_input, destination_input) {
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
  }

  /* Expandir a vista para caber no mapa  caso necessario */
  var expandViewportToFitPlace = function(map, place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  }

  /* Calcula a rota entre a origem e o destino */
  var route = function(origin_place_id, destination_place_id, travel_mode,
  directionsService, directionsDisplay) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    directionsService.route({
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: travel_mode
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  /* Autocompleta o formulario de origin e destino */
  var autocomplete_route = function(map, origin_input, destination_input, origin_place_id, destination_place_id,
  travel_mode, directionsService, directionsDisplay) {
    /* ORIGEM AUTOCOMPLETE */
    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', map);

    origin_autocomplete.addListener('place_changed', function() {
      var place = origin_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      expandViewportToFitPlace(map, place);

      origin_place_id = place.place_id;
      route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });
    /* DESTINATION AUTOCOMPLETE */
    var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
    destination_autocomplete.bindTo('bounds', map);

    destination_autocomplete.addListener('place_changed', function() {
      var place = destination_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      expandViewportToFitPlace(map, place);

      destination_place_id = place.place_id;
      route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });
  }


  var initialize = function() {

    detectDevice(mapDiv);

    var mapOptions = {
      center: users[0],
      zoom: 16,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(mapDiv, mapOptions);
    directionsDisplay.setMap(map);

    createIcon(map, users[0]);

    infoWindow(map);

    getTraficInformation(map);

    organizeInputs(map, origin_input, destination_input);

    autocomplete_route(map, origin_input, destination_input, origin_place_id, destination_place_id,
    travel_mode, directionsService, directionsDisplay);

    $scope.map = map;
  };

  google.maps.event.addDomListener(window, 'load', initialize);

});
