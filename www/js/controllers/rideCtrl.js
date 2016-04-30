angular.module('starter.controllers')
.controller('rideCtrl', function ($scope){
    $scope.rides = [
        {nameDriver: 'Daniel', numberSeats: 3, img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7803325b0b54_main400-300x300.jpg"},
        {nameDriver: 'Eduardo', numberSeats: 4, img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7803734ee134_main400-300x300.jpg"},
        {nameDriver: 'Miguel', numberSeats: 1, img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7804530f1b10_main400-300x300.jpg"},
    	{nameDriver: 'Arnauld', numberSeats: 0, img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7804712858de_main400-300x300.jpg"},
    	{nameDriver: 'Sconetto', numberSeats: 6, img : "http://pink.dornbeast.com/wp-content/uploads/2008/07/7803822f7a0_main400-300x300.jpg"},
    
    ];
});
