angular.module('starter.services')

.factory('RideAPI', function($resource) {
  return $resource("http://localhost:3000/api/users/:userId/rides", null , {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'}
  });
})
