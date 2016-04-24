angular.module('starter.controllers')

.controller('mapCtrl', function($scope) {
  var origin_place_id = null;
  var destination_place_id = null;
  var travel_mode = google.maps.TravelMode.DRIVING;
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var origin_input = document.getElementById('origin-input');
  var destination_input = document.getElementById('destination-input');
  var origin_span = document.getElementById('origin');
  var destiny_span = document.getElementById('destiny');
  var find_me = document.getElementById('findMe');
  var geocoder = new google.maps.Geocoder;
  var marker;
  var map;
  var geolocation = {lat: -15.793327, lng: -47.882489};
  $scope.origin
  $scope.destiny
  $scope.img = [
    {oldcar: 'img/cars/oldcar.png'},
    {beetle: 'img/cars/beetle.png'}
  ];
  $scope.infoHtml = '<div id="content">'+
                      '<h3 class="infoHtml">Partiu!</h3>'+
                      '<div id="bodyContent">'+
                        '<p>Casa</p>'+
                      '</div>' +
                    '</div>';

  // Creates the map marker
  var createIcon = function(position, info) {
      marker = new google.maps.Marker({
        position: position,
        animation: google.maps.Animation.DROP,
        icon: $scope.img[1].beetle,
        draggable: true,
      });
      marker.setMap(map);
      marker.addListener('click', toggleBounce);
      draggableLocation();
      infoWindow(info);
  };

  // Marker jumps when clicked
  var toggleBounce = function() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };

  // Pick up location marker
  var draggableLocation = function() {
    google.maps.event.addListener(marker, 'drag', function(event){
      var coordinates = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      geocoder.geocode({'location': coordinates}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            origin_input.value = results[1].formatted_address;
            origin_span.innerHTML = results[1].formatted_address;
          }
        }
      });
     });
  }

  // To delete a bookmark
  var deleteIcon = function() {
    marker.setMap(null);
  };

  // Create an information window by clicking on the marker
  var infoWindow = function(info) {
    var infowindow = new google.maps.InfoWindow({
      content:info,
      maxWidth: 200
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  };

  // Takes the traffic information of roads
  var getTraficInformation = function() {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }

  // Arrange the form in the map
  var organizeInputs = function() {
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(find_me);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(origin_input);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(destination_input);
  }

  // Geocode the location for a literal string
  var toStringOriginLocation = function(location) {
    geocoder.geocode({
       "location": location
    },
    function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         origin_span.innerHTML = results[1].formatted_address;
       }
    });
  }

  var toStringDestinyLocation = function(location) {
    geocoder.geocode({
       "location": location
    },
    function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         destiny_span.innerHTML = results[1].formatted_address;
       }
    });
  }

  // Expand the view to fit the map when calculating the route
  var expandViewportToFitPlace = function(place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  }

  // Translates the placeId to latitudes and longitudes
  var geocodePlaceId = function(placeID_origin, placeID_destiny) {
    geocoder.geocode({'placeId': placeID_origin}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        createIcon(results[0].geometry.location, $scope.infoHtml);
        $scope.origin = results[0].geometry.location;
        toStringOriginLocation($scope.origin);
      } else {
        window.alert('Geocoder falhou devido a: ' + status);
      }
    });
    geocoder.geocode({'placeId': placeID_destiny}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        $scope.destiny = results[0].geometry.location;
        toStringDestinyLocation($scope.destiny);
      } else {
        window.alert('Geocoder falhou devido a: ' + status);
      }
    });
  }

  // Calculates the route between the origin and destination
  var route = function(origin_place_id, destination_place_id, travel_mode) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    $scope.request = {
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: travel_mode
    }
    deleteIcon();
    geocodePlaceId($scope.request.origin.placeId, $scope.request.destination.placeId);
    directionsService.route($scope.request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        origin_input.value = "";
        destination_input.value = "";
      } else {
        window.alert('A rota requerida falhou devido a ' + status);
      }
    });
  }

  // Autocomplete origin field
  var originAutocomplete = function() {
    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
    origin_autocomplete.bindTo('bounds', map);

    origin_autocomplete.addListener('place_changed', function() {
      var place = origin_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("O local não foi encontrado");
        return;
      }
      expandViewportToFitPlace(place);

      origin_place_id = place.place_id;
      route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });
  }

  // Autocomplete destiny field
  var destinyAutocomplete = function() {
    var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
    destination_autocomplete.bindTo('bounds', map);

    destination_autocomplete.addListener('place_changed', function() {
      var place = destination_autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("O local não foi encontrado");
        return;
      }
      expandViewportToFitPlace(place);

      destination_place_id = place.place_id;
      route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });
  }

  // Find the user geolocation
  $scope.geoLocation = function() {
    if(!map) {
      return;
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
      geolocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      map.setCenter(geolocation);
      deleteIcon();
      createIcon(geolocation, $scope.infoHtml);

      geocoder.geocode({
         "location": geolocation
      },
      function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
           if (results[1]){
             origin_input.value = results[1].formatted_address;
             origin_span.innerHTML = results[1].formatted_address;
           }
         }
      });
    }, function(error) {
      alert('A posição atual não foi encontrada: ' + error.message);
    });
  }

  // map initialization function (main function)
  $scope.initialize = function(element) {

    var mapOptions = {
      center: geolocation,
      zoom: 16,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(element, mapOptions);
    directionsDisplay.setMap(map);

    createIcon(geolocation, $scope.infoHtml);

    getTraficInformation();

    organizeInputs();

    $scope.geoLocation();

    originAutocomplete();

    destinyAutocomplete();
  };

});
