angular.module('starter.services')

.factory('RideAPI', function($resource) {

  var userRides = $resource("http://localhost:3000/api/users/:userId/rides/:rideId", null , {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'}
  })

  var rides = $resource("http://localhost:3000/api/rides/:rideId", null , {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'}
  });

  return {
    userRides: userRides,
    rides: rides
  }
});
