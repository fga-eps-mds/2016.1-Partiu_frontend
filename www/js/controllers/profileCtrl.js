angular.module('starter.controllers')

.controller('profileCtrl', function($scope, User) {
  User.query().$promise.then(function(response){
    $scope.users = response;
  });
})
