angular.module('starter.controllers')

.controller('menuCtrl', function($scope, $ionicModal, $state, $stateParams, $ionicHistory, Profile) {
  /*Dealings of the Ionic to clear navigation history*/
  $ionicHistory.clearHistory();

  /*Profile function to get the user from the service*/
  $scope.user = Profile.getUser();

  /*Function to validate if the user is logged*/

  $scope.isLogged = function() {

    //code that allows you to work without logging

    /*console.log($scope.user);
  Profile.setUser("Daniel Moura", "dms.17@hotmail.com", "data.accessToken", 
  "Masculino", "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/12931082_1180661875279220_1836239715232496227_n.jpg?oh=cc743a74a1312d2d6f8b145e1447be30&oe=57CBCE8E",
   "1194782183867189",
   "https://www.facebook.com/app_scoped_user_id/1194782183867189/");
  Profile.updateBackendId(1);*/

    $scope.user = Profile.getUser();
    if($scope.user.token == undefined) {
      return false;
    }
    else
      return true;
  }

  /*Function to cancel the close app in the exit view*/
  $scope.cancelRedirect = function() {
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('menu.home');
  }

  /*Function to close the app on the system*/
  $scope.closeApp = function() {
    ionic.Platform.exitApp();
  }

})