angular.module('starter.controllers')

.controller('menuCtrl', function($scope, $ionicModal, $state, Profile) {
  $scope.user = Profile.getUser();

  $scope.isLogged = function() {
    $scope.user = Profile.getUser();
    if($scope.user.token == undefined) {
      return false;
    }
    else
      return true;
  }
})