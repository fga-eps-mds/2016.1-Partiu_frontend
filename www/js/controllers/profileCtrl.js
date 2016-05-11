angular.module('starter.controllers')

.controller('profileCtrl', function($scope, $state, $stateParams, Profile) {
  $scope.user = Profile.getUser();

  $scope.fbLogout = function() {
    $scope.user = Profile.setUser(null);
    console.log($scope.user);
    $state.go("menu.home");

  }
})