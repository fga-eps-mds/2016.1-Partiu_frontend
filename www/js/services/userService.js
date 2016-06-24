angular.module('starter.services')

.service('Profile', function() {
  var user = {};

  var setUser = function(displayName, email, token, gender, photoURL, userId, profileLink) {
    user = {
      "name": displayName,
      "email": email,
      "token": token,
      "gender": gender,
      "photo": photoURL,
      "id": userId,
      "link_profile": profileLink
    };
  }

  var updateBackendId = function(newId) {
    user.backendId = newId;
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    updateBackendId: updateBackendId,
    getUser: getUser
  }
})
