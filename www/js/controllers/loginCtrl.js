angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $ionicModal, $state) {
  $scope.fbLogin = function () {
    var ref = new Firebase("https://partiuapp.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    }, {
        remember: "default",
        scope: "email, public_profile, user_friends, user_about_me, publish_actions"
    });
    };
})