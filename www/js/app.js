// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource', 'starter.controllers', 'starter.directives', 'starter.services'])

.run(function($ionicPlatform) {
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
  $urlRouterProvider.otherwise("/menu/home");
  $stateProvider

  .state("menu", {
    url:"/menu",
    templateUrl: "templates/menu.html",
    controller: "menuCtrl",
    abstract: true
  })

  .state("menu.home", {
    url:"/home",
    views: {
      "menuContent": {
          templateUrl: "",
          controller: ""
      }
    }
  })

  .state("menu.perfil", {
    url: "/profile",
    views: {
      "menuContent": {
        templateUrl: "templates/profile.html",
        controller: "profileCtrl"
      }
    }
  })

  .state("menu.login", {
      url:"/login",
      views: {
        "menuContent": {
            templateUrl: "templates/login.html",
            controller: "loginCtrl"
        }
      }
  })

  .state("menu.ride", {
      url:"/ride",
      views: {
        "menuContent": {
          templateUrl: "templates/searchRide.html",
          controller: "userCtrl"
        }
      }
  })

  .state("menu.rideInsertion", {
      url: "/rideInsertion",
      views: {
        "menuContent": {
            templateUrl: "templates/rideInsertion.html",
            controller: "userCtrl"
        }
      }
  });
  /*.state("map", {
    url:"/map",
    templateUrl: "templates/map.html",
    controller: "mapCtrl"
  })*/
})
