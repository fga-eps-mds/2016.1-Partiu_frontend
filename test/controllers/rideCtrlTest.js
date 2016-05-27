describe('rideCtrl tests', function() {
  describe('instantiation and scope tests', function() {
    var $httpBackend, $rootScope, createController, authHandler;
    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');

      createController = function() {
        return $controller('rideCtrl', {'$scope': $rootScope});
      };
    }));

    it('should be defined and initializes', (function() {
      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
      expect($rootScope.remove).toBeDefined();
      expect($rootScope.rides).toBeDefined();
      expect($rootScope.rides).toEqual([]);
      expect($rootScope.message).toEqual('');
    }));
  });

  describe('requests to backend tests', function() {
    var $httpBackend, $rootScope, createController, authHandler;

    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'templates/exit.html').respond({ });
      $httpBackend.when('GET', 'templates/about.html').respond({ });
      $httpBackend.when('GET', 'templates/configuration.html').respond({ });
      $httpBackend.when('GET', 'templates/menu.html').respond({ });
      $httpBackend.when('GET', 'templates/home.html').respond({ });
      $httpBackend.when('GET', 'templates/rideForm.html').respond({ });
      $httpBackend.when('GET', 'http://104.236.252.208/api/users')
        .respond([
            {
              "username": "teste1234",
              "email": "nice@nice.com"
            },
            {
              "username": "marukzubrker",
              "email": "FACEBOOKISNICE@gmail.com"
            }
        ]);
      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1')
        .respond([
            {
              "username": "teste1234",
              "email": "nice@nice.com"
            },
            {
              "username": "marukzubrker",
              "email": "FACEBOOKISNICE@gmail.com"
            }
        ]);

      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1/rides').respond([
        {
          'title': 'NICERIDE'
        }
      ]);
      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1/vehicles').respond([
        {
          'car_type': 'SEDANN'
        }
      ]);
      $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('rideCtrl', {'$scope': $rootScope});
      };

    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should uses correct routes', inject(function($controller, _$location_) {
      $location = _$location_;
      var scope = {};
      var controller = $controller('rideCtrl', {
        $scope: scope,
        RegisterRide: null,
        $http: null
      });

      $location.path('/rides');
      expect($location.path()).toBe('/rides');
      $httpBackend.flush();
    }));

    it('should uses its factories', inject(function($controller) {
      $httpBackend.flush();
    }));
  });
});
