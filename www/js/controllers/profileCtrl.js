angular.module('starter.controllers')

.controller('profileCtrl', function($scope, Profile, User) {
  $scope.user = Profile.getUser();

  User.query().$promise.then(function(response){
    $scope.users = response;
  });
.controller('profileCtrl', function($scope, Profile) {
  $scope.user = Profile.getUser();
})
