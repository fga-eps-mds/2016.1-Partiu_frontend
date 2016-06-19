angular.module('starter.controllers')

.controller('aboutCtrl', function ($scope, $state, $ionicHistory, Profile) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Profile function to get the user from the service*/
  $scope.user = Profile.getUser();

  $scope.inAppOpenLink = function(url) {
    if (!url) {
      return
    }

    $scope.getAvailabilityScheme(url, function(url) {
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
        window.open = cordova.InAppBrowser.open(url, '_system', 'location=yes');
      }
    });
  }

})