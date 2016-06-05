angular.module('starter.controllers')

.controller('profileCtrl', function($scope, $state, $stateParams, $ionicHistory, Profile) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Profile function to get the user from the service*/
  $scope.user = Profile.getUser();

  /*Function to log out with the Facebook on the app*/
  $scope.fbLogout = function() {
    $scope.user = Profile.setUser(null);
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('menu.home');
  }


  /*Function to open in app an link*/
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

  $scope.getAvailabilityScheme = function(url, callback) {
    var scheme;
    var schemeUrl;

    if (url.indexOf('facebook.com/')) {
      if(device.platform === 'iOS') {
        scheme = 'fb://';
      }
      else if(device.platform === 'Android') {
        scheme = 'com.facebook.katana';
      }
      schemeUrl = 'fb://facewebmodal/f?href=' + url;
    }

    appAvailability.check(
        scheme,
        function() {
          callback(schemeUrl);
        },
        function() {
          callback(url);
        }
    );
  }
})
