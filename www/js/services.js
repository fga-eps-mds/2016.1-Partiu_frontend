angular.module('starter.services', [])

.service('Profile', function() {
  var user = {}

  var setUser = function(name, email, token, gender, photoURL, userId, profileLink) {
    user.name = name,
    user.email = email,
    user.token = token,
    user.gender = gender,
    user.photo = photoURL,
    user.id = userId,
    user.facebook_profile = profileLink
    }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }
})

.factory('Ride', function($resource) {
  return $resource("http://localhost:3000/rides/:id.json");
})

.factory('User', function($resource) {
  return $resource("http://localhost:3000/users/:id.json");
})

.factory('Vehicle', function($resource) {
  return $resource("http://localhost:3000/vehicles/:id.json");
});