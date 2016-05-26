angular.module('starter.services')

.service('Profile', function() {
  var user = {};

  this.setUser = function(displayName, email, token, gender, photoURL, userId, profileLink) {
    Object.defineProperties(user, {
      "name": {
        value: displayName
      },
      "email": {
        value: email
      },
      "token": {
        value: token
      },
      "gender": {
        value: gender
      },
      "photo": {
        value: photoURL
      },
      "id": {
        value: userId
      },
      "facebook_profile": {
        value: profileLink
      }
    })
  }

  this.updateBackendId = function(newId) {
    user.backendId = newId;
  }

  this.getUser = function() {
    return user;
  }
})
