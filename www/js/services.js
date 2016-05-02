angular.module('starter.services', [])

.factory('Ride', function($resource) {
  return $resource("http://localhost:3000/rides/:id.json");
});
