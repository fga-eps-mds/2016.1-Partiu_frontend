angular.module('starter.services')

.factory('UserAPI', function($resource) {
  return $resource("http://104.236.252.208/api/users/:userID");
})