angular.module('starter.controllers')

.controller('mapCtrl', function($scope, $ionicHistory, RideAPI) {
  $ionicHistory.clearHistory();
  var origin_place_id = null;
  var destination_place_id = null;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  // Creates the map marker
  function createIcon(position) {
    $scope.img = [
      {oldcar: 'img/cars/oldcar.png'},
      {beetle: 'img/cars/beetle.png'}
    ];

    $scope.marker = new google.maps.Marker({
      position: position,
           animation: google.maps.Animation.DROP,
           icon: $scope.img[1].beetle,
           draggable: true,
    });

    $scope.marker.setMap($scope.map);
    $scope.marker.addListener('click', toggleBounce);
    draggableLocation();
    infoWindow();
  };

  // Marker jumps when clicked
  function toggleBounce() {
      if($scope.marker.getAnimation() !== null) {
         $scope.marker.setAnimation(null);
      }else{
         $scope.marker.setAnimation(google.maps.Animation.BOUNCE);
         window.setTimeout(function(){
           $scope.marker.setAnimation(null);
         }, 3000);
      }
  };

  // Pick up location marker
  function draggableLocation() {
    var geocoder = new google.maps.Geocoder;
    google.maps.event.addListener($scope.marker, 'drag', function(event){
      var coordinates = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      geocoder.geocode({'location': coordinates}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1])
            document.getElementById('origin-input').value = results[1].formatted_address;
        }
      });
     });
  }

  // To delete a bookmark
  function deleteIcon() {
    $scope.marker.setMap(null);
  };

  // Create an information window by clicking on the marker
  function infoWindow() {
    var infowindow = new google.maps.InfoWindow({
      content: '<div id="content">'+
                 '<h3 class="infoHtml">Partiu!</h3>'+
                 '<div id="bodyContent">'+
                    '<p>'+$scope.destiny+'</p>'+
                 '</div>'+
               '</div>' ,
      maxWidth: 200
    });
    google.maps.event.addListener($scope.marker, 'click', function() {
      infowindow.open($scope.map, $scope.marker);
    });
  };

  // Organize inputs on map
  function organizeInputs() {
    var find_me = document.getElementById('findMe');
    $scope.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(find_me);
  }

  // Expand the view to fit the map when calculating the route
  function expandViewportToFitPlace(place) {
    if (place.geometry.viewport) {
      $scope.map.fitBounds(place.geometry.viewport);
    } else {
      $scope.map.setCenter(place.geometry.location);
      $scope.map.setZoom(17);
    }
  }

  // Calcule distance of route
  function distance() {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [$scope.origin],
      destinations: [$scope.destiny],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }, calculeDistance);
  }

  // 
  function calculeDistance(response, status) {
    if(status == google.maps.DistanceMatrixStatus.OK) {
      document.getElementById('km').value = response.rows[0].elements[0].distance.text
      document.getElementById('time').value = response.rows[0].elements[0].duration.text
    }else{
     console.log(status);
    }
  }

  // Translates the placeIdOrigem to latitudes and longitudes
  function geocodePlaceIdOrigem(placeID_origin) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'placeId': placeID_origin}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        createIcon(results[0].geometry.location);
        $scope.origin = results[0].geometry.location;
      } else {
        window.alert('Geocoder falhou devido a: ' + status);
      }
    });
  }

  // Translates the placeIdDestiny to latitudes and longitudes
  function geocodePlaceIdDestiny(placeID_destiny) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'placeId': placeID_destiny}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.destiny = results[0].geometry.location;
      } else {
        window.alert('Geocoder falhou devido a: ' + status);
      }
    });
    
  }

  // Calculates the route between the origin and destination
  function route(origin_place_id, destination_place_id) {
    var directionsService = new google.maps.DirectionsService;
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    var request = {
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: google.maps.TravelMode.DRIVING
    }
    deleteIcon();
    geocodePlaceIdOrigem(request.origin.placeId)
    geocodePlaceIdDestiny(request.destination.placeId)
    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        distance();
      } else {
        window.alert('A rota requerida falhou devido a ' + status);
      }
    });
  }

  // Autocomplete origin field
  function originAutocomplete() {
    var origin_input = document.getElementById('origin-input')
    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', $scope.map);

    origin_autocomplete.addListener('place_changed', function() {
      var place = origin_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("O local não foi encontrado");
        return;
      }
      expandViewportToFitPlace(place);

      origin_place_id = place.place_id;
      route(origin_place_id, destination_place_id);
    });
  }

  // Autocomplete destiny field
  function destinyAutocomplete() {
    var destination_input = document.getElementById('destination-input');
    var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
    destination_autocomplete.bindTo('bounds', $scope.map);

    destination_autocomplete.addListener('place_changed', function() {
      var place = destination_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("O local não foi encontrado");
        return;
      }
      expandViewportToFitPlace(place);

      destination_place_id = place.place_id;
      route(origin_place_id, destination_place_id);
    });
  }



  // Find the user geolocation
  $scope.geoLocation = function() {
    var geocoder = new google.maps.Geocoder;
    if(!$scope.map) 
      return;
    navigator.geolocation.getCurrentPosition(function(pos) {
      geolocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      $scope.map.setCenter(geolocation);
      deleteIcon();
      createIcon(geolocation);
      geocoder.geocode({
         "location": geolocation
      },
      function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {
           if (results[1]){
             document.getElementById('origin-input').value = results[1].formatted_address;
           }
         }
      });
    }, function(error) {
      alert('A posição atual não foi encontrada: ' + error.message);
    });
  }

  // map initialization function (main function)
  $scope.initialize = function(element) {
    $scope.origin = {lat: -15.793327, lng: -47.882489}

    var mapOptions = {
      center: $scope.origin,
      zoom: 16,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    $scope.map = new google.maps.Map(element, mapOptions);
    directionsDisplay.setMap($scope.map);

    createIcon($scope.origin);

    organizeInputs();

    $scope.geoLocation();

    originAutocomplete();

    destinyAutocomplete();
  
  };

});
