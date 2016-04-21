var app = angular.module("starter");

app.controller("mapCtrl", function ($scope) {

    $scope.origin = {
      place : 'Cruzeiro Novo',
      desc : 'Melhor lugar do mundo para morar',
      lat : -15.802795,
      lon : -47.939391
    };

    $scope.destiny = {
      place : 'UnB Gama',
      desc : 'Campos de engenharia da Unb no gama',
      lat : -15.989572,
      lon : -48.045143
    };

    $scope.img = [
      {image: 'img/cars/sobrenatural.png'},
      {image: 'img/cars/fusca.png'}
    ];

});

// Formatar o número como uma latitude( 40.46... => "40°27'44"N")
app.filter('lat', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? "N" : "S";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
});

// Formatar um numero como uma longitude( -80.02... => "80°1'24"W")
app.filter('lon', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ew = input > 0 ? "E" : "W";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ew;
    }
});
