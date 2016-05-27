angular.module('starter.services')

.factory('ScheduleAPI', function($resource) {
  return $resource("http://104.236.252.208/api/users/1/rides/1/schedules/:id", null , {
    update: {
      method: 'PUT'
    }
  });
})