angular.module('starter.controllers')

.controller('profileCtrl', function($scope, $state, Profile) {
  $scope.user = Profile.getUser();

  $scope.fbLogout = function() {
    $scope.user = Profile.setUser(null);
    console.log($scope.user);
    $state.go("menu.home");
  }
})

.controller('userCtrl', function($scope, UserAPI) {
  UserAPI.query().$promise.then(function(response){
    $scope.users = response;
    console.log($scope.users);
  });
})
