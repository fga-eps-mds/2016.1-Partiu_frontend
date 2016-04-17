var app = angular.module('starter');

app.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  var myLatlng = new google.maps.LatLng(-15.989091, -48.045011);
  var divElement = document.getElementById("map");
  var marker;

  var icon = function(map, position) {
    marker = new google.maps.Marker({
      position: position,
      animation: google.maps.Animation.BOUNCE,
      // icon:'ionic.png'
      title: 'UnB',
      draggable: true,
    });
    marker.setMap(map);
  };

  var infoWindow = function(map) {
    var infowindow = new google.maps.InfoWindow({
      content:"Partiu!"
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  };

  var detectDevice = function() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map");

    if (useragent.indexOf('iPhone') != -1 ||
        useragent.indexOf('Android') != -1 ) {
      mapdiv.style.width = '100%';
      mapdiv.style.height = '100%';
    } else {
      mapdiv.style.width = '600px';
      mapdiv.style.height = '800px';
    }
  }


  var initialize = function() {

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(divElement, mapOptions);

    icon(map, myLatlng);

    infoWindow(map);

    $scope.map = map;
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Procurando posição atual...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
      console.log(myLatlng);
      myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      console.log(myLatlng);
      icon(map, myLatlng);
    }, function(error) {
      alert('A posição atual não foi encontrada: ' + error.message);
    });
  };

});
