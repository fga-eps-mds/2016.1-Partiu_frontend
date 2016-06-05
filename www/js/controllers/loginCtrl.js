angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $ionicModal, $state, $ionicHistory, Profile, $http) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Function to login with the Facebook and set the user on the services*/
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

            var requestData = {
              "user": {
                "name": data.displayName,
                "email": data.email,
                "facebook_id": data.id,
                "photo_url": data.profileImageURL,
                "token": data.accessToken,
                "gender": data.cachedUserProfile.gender,
                "link_profile": data.cachedUserProfile.link
              }
            };

            $http.post(baseApiUrl + '/api/users', requestData).success(function(response) {
              window.localStorage['authToken'] = response.token;

            $http.get(baseApiUrl + '/api/get_user_id', {params:{"facebook_id": data.id}})
              .then(function(response) {
                Profile.updateBackendId(response.data);
              }, function(error) {
                $http.post(baseApiUrl + '/api/users', requestData).
                  success(function(user) {
                    Profile.updateBackendId(user.id);
                  });
              });
            });

            $state.go('menu.home');
        }
    }, {
        remember: "default",
        scope: "email, public_profile, user_friends, user_about_me, publish_actions"
    });

  };

})
