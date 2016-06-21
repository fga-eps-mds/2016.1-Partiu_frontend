angular.module('starter.controllers')

.controller('aboutCtrl', function ($scope, $state, $ionicHistory, Profile) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Profile function to get the user from the service*/
  $scope.user = Profile.getUser();
  $scope.openInExternalBrowserHome = function()
  {
    // Open in external browser
    window.open('http://104.236.252.208','_system','location=yes');
  };

  $scope.openInExternalBrowserRepo = function()
  {
    // Open in external browser
    window.open('https://github.com/fga-gpp-mds','_system','location=yes');
  };

})
