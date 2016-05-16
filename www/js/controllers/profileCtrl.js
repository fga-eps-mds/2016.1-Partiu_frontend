angular.module('starter.controllers')

.controller('profileCtrl', function($scope, $state, $stateParams, $ionicHistory, Profile) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Profile function to get the user from the service*/
  $scope.user = Profile.getUser();

  /*Function to log out with the Facebook on the app*/
  $scope.fbLogout = function() {
    $scope.user = Profile.setUser(null);
    console.log($scope.user);
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('menu.home');
  }

  /*Function to open in app an link*/
  $scope.inAppOpenLink = function(url) {
    window.open(url, '_system', 'location=yes');
  }
})