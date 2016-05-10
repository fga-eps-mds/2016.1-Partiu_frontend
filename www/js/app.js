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
  $urlRouterProvider.otherwise("/login");
 /* $urlRouterProvider.otherwise("/menu/intro");*/
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
          templateUrl: "templates/home.html",
          controller: "loginCtrl"
      }
    }
  })

  .state("menu.intro", {
      url:"/intro",
      views: {
      "menuContent": {
          templateUrl: "templates/intro.html",
          controller: "introCtrl"
      }
    }
  })

  .state("menu.profile", {
    url: "/profile",
    views: {
      "menuContent": {
        templateUrl: "templates/profile.html",
        controller: "profileCtrl"
      }
    }
  })

  /*.state("menu.login", {
      url:"/login",
      views: {
        "menuContent": {
            templateUrl: "templates/login.html",
            controller: "loginCtrl"
        }
      }
  })
*/
  .state("login", {
      url:"/login",
      templateUrl: "templates/login.html",
      controller: "loginCtrl"
  })


  .state("rides", {
      url:"/rides",
      templateUrl: "templates/searchRide.html",
      controller: ""
  })

  .state("menu.rideForm", {
      url: "/ride/new",
      views: {
        "menuContent": {
          templateUrl: "templates/rideForm.html",
          controller: "rideCtrl"
        } 
      }
  })

  .state("menu.about", {
    url: "/about",
    views: {
      "menuContent": {
        templateUrl: "templates/about.html",
        controller: "aboutCtrl"
      }
    }
  })
})
