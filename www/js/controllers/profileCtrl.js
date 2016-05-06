angular.module('starter.controllers')

/*.controller('profileCtrl', function ($scope, ngFB) {
    console.log('Profile carregado');
    ngFB.api({
        path: '/me',
        params: {fields: 'id,email,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
})*/

.controller('userCtrl', function($scope, User) {
  User.query().$promise.then(function(response){
    $scope.users = response;
  });
})
