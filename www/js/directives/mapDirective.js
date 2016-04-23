angular.module('starter.directives')

// - Documentação: https://developers.google.com/maps/documentation/
.directive("appMap", function () {
  return {
    restrict: "E",
    replace: true,
    template: "<div></div>",
    scope: {
      center: "=",        // Ponto central no mapa (latitude: 10, longitude: 10).
      destiny: "=",       // Array de marcadores ([{ lat: 10, lon: 10, name: "destino" }]).
      img: "=",           // Icones para os marcadores
      width: "@",         // Largura do mapa em pixels
      height: "@",        // Altura do mapa em pixels
      zoom: "@",          // level do zoom (1 é sem zoom, e 25 é muito ampliado).
      mapTypeId: "@",     // Tipo de mapa (roadmap, satellite, hybrid, terrain).
      panControl: "@",    // Se deve mostrar um controle de pan no mapa.
      zoomControl: "@",   // Se deve mostrar um controle de zoom no mapa.
      scaleControl: "@"   // Se deve mostrar controle de escala no mapa.
    },

    controller: function($scope) {
      var origin_input = document.getElementById('origin-input');
      var destination_input = document.getElementById('destination-input');
      var origin_place_id = null;
      var destination_place_id = null;
      var travel_mode = google.maps.TravelMode.DRIVING;
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var result;
      var originMarker;
      var InfoHtml =  '<div id="content">'+
        '<h3 class="infoHtml">Partiu!</h3>'+
        '<div id="bodyContent">'+
        '<p>Casa</p>'+
        '</div>' +
        '</div>';

      $scope.gotoCurrentLocation = function () {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var c = position.coords;
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

      //Cria os marcadores de origem e destino no mapa
      $scope.createOriginMarker = function() {
        var marker = $scope.center;
        if (angular.isString(marker)) marker = scope.$eval(scope.center);
        var location = new google.maps.LatLng(marker.lat, marker.lon);
        originMarker = new google.maps.Marker({
          position: location,
          animation: google.maps.Animation.DROP,
          map: $scope.map,
          icon: $scope.img[0].image,
          draggable: false,
        });
        originMarker.addListener('click', toggleBounce);
        $scope.infoWindowOrigin(originMarker);
      };

      //Faz o marcadore de origem pular ao ser clicado
      var toggleBounce = function() {
        if (originMarker.getAnimation() !== null) {
          originMarker.setAnimation(null);
        } else {
          originMarker.setAnimation(google.maps.Animation.BOUNCE);
        }
      };

      // Cria o marcador de destino
      $scope.createDestinyMarker = function() {
        var marker = $scope.destiny;
        if (angular.isString(marker)) marker = scope.$eval(scope.destiny);
        var location = new google.maps.LatLng(marker.lat, marker.lon);
        var DestinyMarker = new google.maps.Marker({
          position: location,
          map: $scope.map,
          // icon: scope.img[1].image,
          draggable: false,
        });
      };

      // Criar um array de marcadores caso for necessario
      $scope.createArrayMarkers = function() {
        currentMarkers = [];
        var markers = scope.destiny;
        if (angular.isString(markers)) markers = scope.$eval(scope.destiny);
        for (var i = 0; i < markers.length; i++) {
          var marker = markers[i];
          var location = new google.maps.LatLng(marker.lat, marker.lon);
          var destinyMarker = new google.maps.Marker({ position: location, map: scope.map});
          currentMarkers.push(destinyMarker);
        }
      };

      //Deleta um marcador
      $scope.deleteIcon = function() {
        marker.setMap(null);
      };

      //Cria uma janela de informação ao clicar no marcador
      $scope.infoWindowOrigin = function(marker) {
        var infowindow = new google.maps.InfoWindow({
          content:InfoHtml,
          maxWidth: 200
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(scope.map, marker);
        });
      };

      /* Pega as informações de trafego das vias */
      $scope.getTraficInformation = function(map) {
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
      }

      /* Organizar o formulario dentro do mapa */
      $scope.organizeInputs = function(map) {
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
      }

      /* Expandir a vista para caber no mapa caso necessario */
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
          result = response;
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Requisição de rota falhou devido a: ' + status);
          }
        });
      }

      /* Autocompleta o formulario de origin e destino */
      $scope.autocomplete_route = function(map) {
        /* ORIGEM AUTOCOMPLETE */
        var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
        origin_autocomplete.bindTo('bounds', map);

        origin_autocomplete.addListener('place_changed', function() {
          var place = origin_autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("A funcionalidade de Autocompletar retornou um lugar que não há geometria");
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
            window.alert("A funcionalidade de Autocompletar retornou um lugar que não há geometria");
            return;
          }
          expandViewportToFitPlace(map, place);

          destination_place_id = place.place_id;
          route(origin_place_id, destination_place_id, travel_mode,
              directionsService, directionsDisplay);
        });
      }


    },
    link: function(scope, element, attrs) {
      var toResize, toCenter;
      var currentMarkers;


      // Ouvir todas a mudanças nas variáveis de escopo e atualizar o controle assim que
      // todas as mudanças tiverem sido observadas.
      var arr = ["width", "height", "origin", "destiny", "mapTypeId", "panControl", "zoomControl", "scaleControl"];
      for (var i = 0, ctrl = arr.length; i < arr.length; i++) {
        scope.$watch(arr[i], function () {
          ctrl--;
          if (ctrl <= 0) {
            updateControl();
          }
        });
      }

      // atualizar zoom e o centro sem recriar o mapa
      scope.$watch("zoom", function () {
        if (scope.map && scope.zoom)
          scope.map.setZoom(scope.zoom * 1);
      });
      scope.$watch("center", function () {
        if (scope.map && scope.center)
          scope.map.setCenter(getLocation(scope.center));
      });

      // Atualizar os contraladores do mapa
      var updateControl = function() {

        // atualizar o tamanho.
        if (scope.width) element.width(scope.width);
        if (scope.height) element.height(scope.height);

        // Pegar as opções do mapa
        var options = {
          center: scope.center, //Mudar para geolocation
          zoom: 16,
          mapTypeId: "roadmap"
        };
        if (scope.center) options.center = getLocation(scope.center);
        if (scope.zoom) options.zoom = scope.zoom * 1;
        if (scope.mapTypeId) options.mapTypeId = scope.mapTypeId;
        if (scope.panControl) options.panControl = scope.panControl;
        if (scope.zoomControl) options.zoomControl = scope.zoomControl;
        if (scope.scaleControl) options.scaleControl = scope.scaleControl;

        // Criar o mapa
        scope.map = new google.maps.Map(element[0], options);

        // Atualizar marcadores
        updateMarkers();

        // Pegar informações de trafego
        scope.getTraficInformation(scope.map);

        // Colocar os inputs dentro do mapa.
        scope.organizeInputs(scope.map);

        // Autocompleta as localizações e calcula a rota
        scope.autocomplete_route(scope.map);

        // Ouvir mudanças na propriedade center e atualizar o scope
        google.mapTypeIds.event.addListener(scope.map, 'center_changed', function () {

          // Se o toCenter tiver rodando, pare ela e rode novamente.
          if (toCenter) clearTimeout(toCenter);
          toCenter = setTimeout(function () {
            if (scope.center) {

              // Checar se o centro foi realmente modificado
              if (scope.map.center.lat() != scope.center.lat ||
                  scope.map.center.lng() != scope.center.lon) {

                // Atualizar o scope e aplicar mudanças
                scope.center = { lat: scope.map.center.lat(), lon: scope.map.center.lng() };
                if (!scope.$$phase) scope.$apply("center");
              }
            }
          }, 500);
        });
      }

      // Atualização dos marcadores do mapa para corresponder a coleção de marcadores do escopo
      var updateMarkers = function() {
        if (scope.map && scope.destiny) {

          // Limpar os marcadores antigos
          if (currentMarkers != null) {
            for (var i = 0; i < currentMarkers.length; i++) {
              currentMarkers[i] = marker.setMap(null);
            }
          }
          scope.createOriginMarker();
          scope.createDestinyMarker();
        }
      }

      // Converter localização atual na localização do Google Maps
      var getLocation = function(location) {
        if (location == null) return new google.maps.LatLng(-15.989091, -48.045011);
        if (angular.isString(location)) location = scope.$eval(location);
        return new google.maps.LatLng(location.lat, location.lon);
      }

      /*//Cria os marcadores de origem e destino no mapa
        var createOriginMarker = function() {
        var marker = scope.center;
        if (angular.isString(marker)) marker = scope.$eval(scope.center);
        var location = new google.maps.LatLng(marker.lat, marker.lon);
        originMarker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        map: scope.map,
        icon: scope.img[0].image,
        draggable: false,
        });
        originMarker.addListener('click', toggleBounce);
        infoWindowOrigin(originMarker);
        };

      //Faz o marcadore de origem pular ao ser clicado
      var toggleBounce = function() {
      if (originMarker.getAnimation() !== null) {
      originMarker.setAnimation(null);
      } else {
      originMarker.setAnimation(google.maps.Animation.BOUNCE);
      }
      };

      // Cria o marcador de destino
      var createDestinyMarker = function() {
      var marker = scope.destiny;
      if (angular.isString(marker)) marker = scope.$eval(scope.destiny);
      var location = new google.maps.LatLng(marker.lat, marker.lon);
      var DestinyMarker = new google.maps.Marker({
      position: location,
      map: scope.map,
      // icon: scope.img[1].image,
      draggable: false,
      });
      };

      // Criar um array de marcadores caso for necessario
      var createArrayMarkers = function() {
      currentMarkers = [];
      var markers = scope.destiny;
      if (angular.isString(markers)) markers = scope.$eval(scope.destiny);
      for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      var location = new google.maps.LatLng(marker.lat, marker.lon);
      var destinyMarker = new google.maps.Marker({ position: location, map: scope.map});
      currentMarkers.push(destinyMarker);
      }
      };

      //Deleta um marcador
      var deleteIcon = function() {
      marker.setMap(null);
      };

      //Cria uma janela de informação ao clicar no marcador
      var infoWindowOrigin = function(marker) {
      var infowindow = new google.maps.InfoWindow({
      content:InfoHtml,
      maxWidth: 200
      });
      google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(scope.map, marker);
      });
      };

      // Pega as informações de trafego das vias
      var getTraficInformation = function(map) {
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }

          // Organizar o formulario dentro do mapa
          var organizeInputs = function(map, origin_input, destination_input) {
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
          }

          // Expandir a vista para caber no mapa caso necessario
          var expandViewportToFitPlace = function(map, place) {
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);
            }
          }

          // Calcula a rota entre a origem e o destino
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
              result = response;
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
              } else {
                window.alert('Requisição de rota falhou devido a: ' + status);
              }
            });
          }

          // Autocompleta o formulario de origin e destino
          var autocomplete_route = function(map, origin_input, destination_input, origin_place_id, destination_place_id,
              travel_mode, directionsService, directionsDisplay) {
            // ORIGEM AUTOCOMPLETE
            var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
            origin_autocomplete.bindTo('bounds', map);

            origin_autocomplete.addListener('place_changed', function() {
              var place = origin_autocomplete.getPlace();
              if (!place.geometry) {
                window.alert("A funcionalidade de Autocompletar retornou um lugar que não há geometria");
                return;
              }
              expandViewportToFitPlace(map, place);

              origin_place_id = place.place_id;
              scope.origin = origin_place_id;
              route(origin_place_id, destination_place_id, travel_mode,
                  directionsService, directionsDisplay);
            });
            // DESTINATION AUTOCOMPLETE
            var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
            destination_autocomplete.bindTo('bounds', map);

            destination_autocomplete.addListener('place_changed', function() {
              var place = destination_autocomplete.getPlace();
              if (!place.geometry) {
                window.alert("A funcionalidade de Autocompletar retornou um lugar que não há geometria");
                return;
              }
              expandViewportToFitPlace(map, place);

              destination_place_id = place.place_id;
              scope.destiny = destination_place_id;
              route(origin_place_id, destination_place_id, travel_mode,
                  directionsService, directionsDisplay);
            });
          }*/
    }
  };
})

/*

  - O nome da diretiva é em camelCase porém a chamada dela na view é usando hifen

  - ddo.scope é diferente do $scope da controller, ela e um dado privado da
  diretiva,

		'@' é uma copia de valor do tipo string passado no parametro da diretiva

		'&' é o valor da expressão ou função passado no parametro da diretiva que será executado
		na controller

		'=' qualquer alteração que a controller faz na propriedade a diretiva fica sabendo
		e vise-versa, quando queremos que tanto a diretiva quanto o controller acessem o mesmo dado,
		comunicação bi-direcional

    <meu-botao-perigo nome="Remover" acao="remover(foto)">
      //Codigo
    </meu-botao-perigo>

	- link é a função que nos dá acesso ao elemento do DOM no qual ela foi adicionada na marcação HTML
	inclusive ao escopo privado da diretiva. É nela que manipulamos DOM quando necessário.

	- controller permite passarmos uma função que permite termos acesso aos injetáveis do Angular,
	como $scope e recursoFoto.

  - $eval -> Executa a expressao da scope atual e retorna o resultado

  - if (!scope.$$phase) scope.$apply("center");

    $$phase é uma flag que indica se o app está no ciclo $digest
    Se tentarmos rodar o $apply com o $digest rodando da erro por isso do if

    O $digest processa todos os observadore ($watchs) do escopo atual e de seus filhos

    O $apply irá forçar um $digest, por isso vai dar erro se ele já tiver rodando.

    $apply é usado para executar uma expressão em angular a partir do lado de fora da estrutura angular.
    (Por exemplo a partir do navegador eventos DOM, setTimeout, XHR ou bibliotecas de terceiros).

  - através do google.maps.DirectionsService, basta nós passarmos um objeto google.maps.DirectionsRequest,
  o qual irá conter o ponto de origem e o ponto de destino, e o meio de transporte.

    Ele irá nos retornar um objeto google.maps.DirectionsResult, o qual contém as informações da rota,
    e o google.maps.DirectionsStatus, que por sua vez define o estado final da nossa requisição, ou seja,
    ele pode indicar sucesso (DirectionsStatus.OK), sem resultados (DirectionsStatus.ZERO_RESULTS),
    erro (DirectionsStatus.INVALID_REQUEST ou DirectionsStatus.REQUEST_DENIED), etc.

  - Já o google.maps.DirectionsRenderer, basicamente, fica responsável por renderizar o resultado fornecido
  pelo google.maps.DirectionsService.

*/
