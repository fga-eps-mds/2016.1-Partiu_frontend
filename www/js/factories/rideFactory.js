angular.module('starter.services')

.factory('RideAPI', function($resource) {

  var userRides = $resource(AppSettings.baseApiUrl + "/api/users/:userId/rides/:rideId", null , {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'},
    'update': {method:'PUT'}
  })

  var rides = $resource(AppSettings.baseApiUrl + "/api/rides/:rideId", null , {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'},
    'update': {method:'PUT'}
  });

  return {
    userRides: userRides,
    rides: rides
  }
});
