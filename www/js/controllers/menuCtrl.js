angular.module('starter.controllers')

.controller('menuCtrl', function($scope, $ionicModal, $state, $stateParams, Profile) {
  $scope.user = Profile.getUser();

  $scope.isLogged = function() {
    $scope.user = Profile.getUser();
    if($scope.user.token == undefined) {
      return false;
    }
    else
      return true;
  }

  $scope.cancelRedirect = function() {
    $state.go('menu.home');
  }

  $scope.closeApp = function() {
    ionic.Platform.exitApp();
  }

})