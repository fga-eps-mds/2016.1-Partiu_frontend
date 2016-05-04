angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $ionicModal, $state, Profile) {
  $scope.fbLogin = function () {
    var ref = new Firebase("https://partiuapp.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            var data = authData.facebook;
            Profile.setUser(data.displayName, data.email, data.accessToken, data.cachedUserProfile.gender, data.profileImageURL, data.id, data.cachedUserProfile.link);
        }
    }, {
        remember: "default",
        scope: "email, public_profile, user_friends, user_about_me, publish_actions"
    });
  };
})
