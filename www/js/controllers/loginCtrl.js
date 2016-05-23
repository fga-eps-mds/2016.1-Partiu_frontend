angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $ionicModal, $state, Profile, $http) {
  $scope.fbLogin = function () {
    var ref = new Firebase("https://partiuapp.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            var data = authData.facebook;
            if(data.cachedUserProfile.gender == 'male') {
                data.cachedUserProfile.gender = 'Masculino';
            }
            else if(data.cachedUserProfile.gender == 'female') {
                data.cachedUserProfile.gender = 'Feminino';
            }
            Profile.setUser(data.displayName, data.email, data.accessToken, data.cachedUserProfile.gender, data.profileImageURL, data.id, data.cachedUserProfile.link);
            $http.post('http://localhost:3000/api/users', Profile.getUser()).success(function(data) {
            
            });
            $state.go('menu.home');
        }
    }, {
        remember: "default",
        scope: "email, public_profile, user_friends, user_about_me, publish_actions"
    });

  };

})
