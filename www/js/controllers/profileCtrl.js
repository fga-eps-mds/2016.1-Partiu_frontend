angular.module('starter.controllers')

.controller('profileCtrl', function($scope, Profile) {
  $scope.user = Profile.getUser();
})
