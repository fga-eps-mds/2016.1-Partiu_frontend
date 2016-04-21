var app = angular.module('starter')

// - Documentação: https://developers.google.com/maps/documentation/
app.directive("appMap", function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        scope: {
            center: "=",        // Ponto central no mapa (latitude: 10, longitude: 10).
            origin: "=",        // Marcador da origem (lat: 10, lon: 10, name: "origem").
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
        link: function(scope, element, attrs) {
            var toResize, toCenter;
            var map;
            var currentMarkers;
            var originMarker;
            var InfoHtml =  '<div id="content">'+
                              '<h3 class="infoHtml">Partiu!</h3>'+
                              '<div id="bodyContent">'+
                                '<p>Casa</p>'+
                              '</div>' +
                            '</div>';


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
                if (map && scope.zoom)
                    map.setZoom(scope.zoom * 1);
            });
            scope.$watch("center", function () {
                if (map && scope.center)
                    map.setCenter(getLocation(scope.center));
            });

            // Atualizar os contraladores do mapa
            var updateControl = function() {

                // atualizar o tamanho.
                if (scope.width) element.width(scope.width);
                if (scope.height) element.height(scope.height);

                // Pegar as opções do mapa
                var options = {
                    center: new google.maps.LatLng(-15.989091, -48.045011),
                    zoom: 9,
                    mapTypeId: "roadmap"
                };
                if (scope.center) options.center = getLocation(scope.center);
                if (scope.zoom) options.zoom = scope.zoom * 1;
                if (scope.mapTypeId) options.mapTypeId = scope.mapTypeId;
                if (scope.panControl) options.panControl = scope.panControl;
                if (scope.zoomControl) options.zoomControl = scope.zoomControl;
                if (scope.scaleControl) options.scaleControl = scope.scaleControl;

                // Criar o mapa
                map = new google.maps.Map(element[0], options);

                // Atualizar marcadores
                updateMarkers();

                // Pegar informações de trafego
                getTraficInformation(map);

                // Ouvir mudanças na propriedade center e atualizar o scope
                google.mapTypeIds.event.addListener(map, 'center_changed', function () {

                    // Se o toCenter tiver rodando, pare ela e rode novamente.
                    if (toCenter) clearTimeout(toCenter);
                    toCenter = setTimeout(function () {
                        if (scope.center) {

                            // Checar se o centro foi realmente modificado
                            if (map.center.lat() != scope.center.lat ||
                                map.center.lng() != scope.center.lon) {

                                // Atualizar o scope e aplicar mudanças
                                scope.center = { lat: map.center.lat(), lon: map.center.lng() };
                                if (!scope.$$phase) scope.$apply("center");
                            }
                        }
                    }, 500);
                });
            }

            // Atualização dos marcadores do mapa para corresponder a coleção de marcadores do escopo
            var updateMarkers = function() {
                if (map && scope.destiny) {

                    // Limpar os marcadores antigos
                    if (currentMarkers != null) {
                        for (var i = 0; i < currentMarkers.length; i++) {
                            currentMarkers[i] = marker.setMap(null);
                        }
                    }

                    createOriginMarker();
                    createDestinyMarker();
                }
            }

            // Converter localização atual na localização do Google Maps
            var getLocation = function(location) {
                if (location == null) return new google.maps.LatLng(-15.989091, -48.045011);
                if (angular.isString(location)) location = scope.$eval(location);
                return new google.maps.LatLng(location.lat, location.lon);
            }

            //Cria os marcadores de origem e destino no mapa
            var createOriginMarker = function() {
                var marker = scope.origin;
                if (angular.isString(marker)) marker = scope.$eval(scope.origin);
                var location = new google.maps.LatLng(marker.lat, marker.lon);
                originMarker = new google.maps.Marker({
                  position: location,
                  animation: google.maps.Animation.DROP,
                  map: map,
                  icon: scope.img[0].image,
                  title: marker.name,
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
                map: map,
                // icon: $scope.imgDestiny,
                title: marker.name,
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
                  var destinyMarker = new google.maps.Marker({ position: location, map: map, title: marker.name });
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
                infowindow.open(map, marker);
              });
            };

            /* Pega as informações de trafego das vias */
            var getTraficInformation = function(map) {
              var trafficLayer = new google.maps.TrafficLayer();
              trafficLayer.setMap(map);
            }
        }
    };
});

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

	- link é a função nos dá acesso ao elemento do DOM no qual ela foi adicionada na marcação HTML
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
    (Por exemplo a partir do navegador eventos DOM, setTimeout, XHR ou bibliotecas de terceiros)

*/
