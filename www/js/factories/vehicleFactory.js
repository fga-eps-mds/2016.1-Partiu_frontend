angular.module('starter.services')

.factory('VehicleAPI', function($resource) {
  return $resource('http://104.236.252.208/api/users/1/vehicles/:vehicleID', null, {
    update: {
      method: 'PUT'
    }
  });
})