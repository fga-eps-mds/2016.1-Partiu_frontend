(function(){
  "use strict";

  angular.module('starter').config(function($stateProvider, $urlRouterProvider){



    $urlRouterProvider.otherwise("/views/viewRide");

    /*
    $routeProvider.when('/viewRide',{
      templateUrl: 'views/viewRide.html'
    });
    */

    $stateProvider


    .state("menu", {
      url:"/menu",
      templateUrl: "views/menu.html",
      abstract: true,
      controller: "initCtrl"
    })

    .state("menu.home", {
      url:"/home",
      views: {
        "menuContent": {
            templateUrl: "views/home-logout.html",
        }
      }
    })

    .state("menu.perfil", {
      url:"/perfil",
      views: {
        "menuContent": {
            templateUrl: "views/perfil.html",
        }
      }
    })
    .state("menu.ride", {
      url:"/ride",
      views: {
        "menuContent": {
            templateUrl: "views/ride.html",
        }
      }
    });

  });

})();
