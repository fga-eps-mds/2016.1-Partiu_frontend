angular.module('starter.services')

.factory('UserAPI', function($resource) {
  return $resource("http://localhost:3000/api/users/:userId", null, {
    'query': {method:'GET', isArray: true},
    'get': {method:'GET'},
    'save': {method:'POST'},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'}
  });
})
