angular.module('starter.services')

.factory('RideAPI', function($resource) {
  return $resource("http://104.236.252.208/api/users/1/rides/:rideID", null , {
    update: {
      method: 'PUT'
    }
  });
})