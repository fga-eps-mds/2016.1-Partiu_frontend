angular.module('starter.services')

.factory('VehicleAPI', function($resource) {
  return $resource(AppSettings.baseApiUrl + '/api/users/:userId/vehicles/:vehicleId', null, {
    'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'}
  });
})

