angular.module('starter.services')

.factory('DaysAPI', function($resource) {
  return $resource("http://104.236.252.208/api/users/1/rides/1/schedules/1/day_of_weeks/:id", null , {
    update: {
      method: 'PUT'
    }
  });
})