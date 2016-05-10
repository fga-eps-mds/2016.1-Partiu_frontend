// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource', 'starter.controllers', 'starter.directives', 'starter.services'])


.controller('ExampleController', ['$scope', function($scope) {
  $scope.numbers = [1,2,3,4,5,6,7,8,9];
  $scope.letters = "abcdefghi";
  $scope.longNumber = 2345432342;
  $scope.numLimit = 3;
  $scope.letterLimit = 3;
  $scope.longNumberLimit = 3;
}])

.config(function($ionicConfigProvider){
  $ionicConfigProvider.tabs.style('top');
})

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
  $urlRouterProvider.otherwise("/menu/ride");
  $stateProvider

  .state("menu", {
    url:"/menu",
    templateUrl: "templates/menu.html",
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
