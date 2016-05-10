angular.module('starter.controllers')

.controller('aboutCtrl', function ($scope, $state, Profile) {
  $scope.user = Profile.getUser();
})