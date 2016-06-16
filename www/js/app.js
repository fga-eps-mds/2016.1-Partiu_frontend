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

.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(20);
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
          templateUrl: "templates/rides/index.html",
          controller: "indexRideCtrl"
        }
      }
  })

  .state("menu.newRide", {
      url: "/rides/new",
      views: {
        "menuContent": {
          templateUrl: "templates/rides/new.html",
          controller: "newRideCtrl"
        }
      }
  })

  .state("menu.showRide", {
      url: "/rides/:id/show/",
      views: {
        "menuContent": {
          templateUrl: "templates/rides/show.html",
          controller: "showRideCtrl"
        }
      }
  })

  .state("menu.editRide", {
    url: "/rides/:id/edit/",
    views: {
      "menuContent": {
        templateUrl: "templates/rides/edit.html",
        controller: "editRideCtrl"
      }
    }
  })

  .state("menu.vehicles", {
    url:"/vehicles",
    views: {
      "menuContent": {
        templateUrl: "templates/vehicles/index.html",
        controller: "indexVehicleCtrl"
      }
    }
  })

  .state("menu.newVehicle", {
    url: "/vehicles/new",
    views: {
      "menuContent": {
        templateUrl: "templates/vehicles/new.html",
        controller: "newVehicleCtrl"
      }
    }
  })

  .state("menu.showVehicle", {
      url: "/vehicles/:id/show/",
      views: {
        "menuContent": {
          templateUrl: "templates/vehicles/show.html",
          controller: "showVehicleCtrl"
        }
      }
  })

  .state("menu.editVehicle", {
    url: "/vehicles/:id/edit/",
    views: {
      "menuContent": {
        templateUrl: "templates/vehicles/edit.html",
        controller: "editVehicleCtrl"
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

  .state("menu.exit", {
    url: "/exit",
    views: {
      "menuContent": {
        templateUrl: "templates/exit.html"
      }
    }
  })
})
