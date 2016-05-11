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

.config(function($ionicConfigProvider){
  $ionicConfigProvider.tabs.style('top');
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
          templateUrl: "templates/home.html",
          controller: "loginCtrl"
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

  .state("menu.rank", {
    url: "/rank",
    views: {
      "menuContent": {
        templateUrl: "templates/rank.html"
      }
    }
  })
/* Page relationed with login*/
  .state("menu.login", {
      url:"/login",
      views: {
        "menuContent": {
            templateUrl: "templates/login.html",
            controller: "loginCtrl"
        }
      }
  })

  .state("menu.rides", {
      url:"/rides",
      views: {
        "menuContent": {
          templateUrl: "templates/searchRide.html",
          controller: "rideCtrl"
        }
      }
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

  .state("menu.configuration", {
    url: "/configuration",
    views: {
      "menuContent": {
        templateUrl: "templates/configuration.html"
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
