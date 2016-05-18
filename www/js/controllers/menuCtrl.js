angular.module('starter.controllers')

.controller('menuCtrl', function($scope, $ionicModal, $state, $stateParams, $ionicHistory, Profile) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Profile function to get the user from the service*/
  $scope.user = Profile.getUser();

  /*Function to validate if the user is logged*/
  $scope.isLogged = function() {
    $scope.user = Profile.getUser();
    if($scope.user.token == undefined) {
      return false;
    }
    else
      return true;
  }

  /*Function to cancel the close app in the exit view*/
  $scope.cancelRedirect = function() {
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('menu.home');
  }

  /*Function to close the app on the system*/
  $scope.closeApp = function() {
    ionic.Platform.exitApp();
  }
})