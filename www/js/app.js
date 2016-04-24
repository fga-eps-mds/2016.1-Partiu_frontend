// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource', 'ngOpenFB', 'starter.controllers', 'starter.directives'])

.run(function($ionicPlatform, ngFB) {
  ngFB.init({appId: 1138381939526771});
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state("menu.home", {
      url:"/home",
      views: {
        "menuContent": {
            templateUrl: "views/home-logout.html",
        }
      }
    })

    .state("login", {
        url:"/login",
        templateUrl: "templates/login.html",
        controller: "loginCtrl"
    })
})
