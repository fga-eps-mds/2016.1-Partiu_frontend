angular.module('starter.services')

.factory('UserAPI', function($resource) {
  return $resource("http://localhost:3000/api/users/:userId");
})
