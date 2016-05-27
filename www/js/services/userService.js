angular.module('starter.services')

.service('Profile', function() {
  var user = {};

  var setUser = function(displayName, email, token, gender, photoURL, userId, profileLink) {
    user.name = displayName,
    user.email = email,
    user.token = token,
    user.gender = gender,
    user.photo_url = photoURL,
    user.facebook_id = userId,
    user.link_profile = profileLink
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }
})
