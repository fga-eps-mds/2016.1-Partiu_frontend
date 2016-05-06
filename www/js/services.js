angular.module('starter.services', [])

.service('Profile', function() {
  var user = {}

  var setUser = function(email, userId, name, token) {
    user.email = email,
    user.userId = userId,
    user.name = name,
    user.token = token
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