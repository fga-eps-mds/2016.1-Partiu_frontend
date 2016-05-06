angular.module('starter.services', [])

.factory('Ride', function($resource) {
  return $resource("http://localhost:3000/rides/:id.json");
})

.factory('User', function($resource) {
  return $resource("http://localhost:3000/users/:id.json");
})

.factory('Vehicle', function($resource) {
  return $resource("http://localhost:3000/vehicles/:id.json");
});
