angular.module('starter.controllers')

.controller('aboutCtrl', function ($scope, $state, $ionicHistory, Profile) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Profile function to get the user from the service*/
  $scope.user = Profile.getUser();

  $scope.testStub = function (value) {
    return value*5;
  }
})