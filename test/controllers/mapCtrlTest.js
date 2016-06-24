describe('mapCtrl tests', function() {
  describe('instantiation and scope tests', function() {
    var $rootScope, createController, rideStub, positionStub;
    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      createController = function() {
        return $controller('mapCtrl', {'$scope': $rootScope});
      };
      rideStub = {
          "title": "mytitle1",
          "origin": "UnB Gama - Setor Leste, Brasília - DF, Brasil",
          "destination": "Jardim do Inga, Luziânia - GO, Brasil",
          "total_seats": "4",
          "departure_time": "11h",
          "user_id": "1",
          "route_distance": "10 km"
      };

      positionStub = {
        "coords": {
          "latitude": 200,
          "longitude": 300
        },
        "latitude": 200
      };

    }));

    it('should be defined and initialized', (function() {
      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
    }));

    it('should get the current location', inject(function($state) {
      spyOn($state, 'go');
      var controller = createController();
      $rootScope.getCurrentLocation();
      expect($state.go).not.toHaveBeenCalledWith('menu.home');
    }));

    it('should calculate distance', function() {
      var positionStub = {
        "coords": {
          "latitude": 100,
          "longitude": 200
        }
      };
      var controller = createController();
      $rootScope.ride = rideStub;
      $rootScope.origin = 1;
      $rootScope.destination = 1;
      $rootScope.calculateDistance();
      expect($rootScope.ride.route_distance).toBeDefined();
    });

    it('should disable tap', function() {
      var myfunc = function() {
        return true;
      }

      createController();
      $rootScope.disableTap({"target": {"select": myfunc } });
      $rootScope.onSuccess(positionStub);
    });

    it('should render errors on onError', function() {
      createController();
      $rootScope.onError("an error.");
    });

  });
});
