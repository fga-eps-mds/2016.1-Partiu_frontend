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

  .state("rides", {
      url:"/rides",
      templateUrl: "templates/searchRide.html",
      controller: "userCtrl"
  })

   .state("welcome", {
      url:"/welcome",
      templateUrl: "templates/home.html",
      controller: "loginCtrl"
  })

    .state("intro", {
      url:"/intro",
      templateUrl: "templates/intro.html",
      controller: "introCtrl"
  })



  .state("rideForm", {
      url: "/ride/new",
      templateUrl: "templates/rideForm.html",
      controller: "rideCtrl"
  });
})
