angular.module('starter.controllers')

.controller('mapCtrl', function($scope, $ionicHistory, NgMap, $rootScope) {
  var map = this.map;
  
  $scope.getCurrentLocation = function() {
    NgMap.getMap().then(function(map){
      console.log(map);
    });
    console.log(NgMap);
  };

  var posOptions = {timeout: 10000, enableHighAccuracy: false};

  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    var myLatlng = new google.maps.LatLng(latitude, longitude);
    console.info(myLatIng);
    map.directions.origin = myLatIng;
  }, function(err) {
    // error
  });
});