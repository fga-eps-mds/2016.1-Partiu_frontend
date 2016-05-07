angular.module('starter.controllers')

.controller('profileCtrl', function($scope, Profile, User, $state) {
  $scope.user = Profile.getUser();

  User.query().$promise.then(function(response){
    $scope.users = response;
  });

  $scope.fbLogout = function() {
    $scope.user = Profile.setUser(null);
    console.log($scope.user);
    $state.go("menu.home");
  }
})
