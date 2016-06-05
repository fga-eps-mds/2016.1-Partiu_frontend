angular.module('starter.services') 
.factory('authInterceptor', function($q) {
  return {
    'request': function(config) {
      config.headers.Authorization = window.localStorage['authToken'];
      return config;
    }
  };
});