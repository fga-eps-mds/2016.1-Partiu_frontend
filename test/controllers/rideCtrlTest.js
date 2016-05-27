describe('rideCtrl tests', function() {
  describe('instantiation and scope tests', function() {
    var $httpBackend, $rootScope, createController, authHandler, rideStub;
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
    var $httpBackend, $rootScope, createController, userArray, userA, userB, mockResource,
    rideStub, usersJsonMock, ridesJsonMock;;


    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    beforeEach(function() {
      rideStub = {
        "title": "mytitle1",
        "origin": "myniceorigin",
        "destiny": "mynicedestiny",
        "total_seats": "4",
        "departure_time": "11h",
        "user_id": "1"
      }
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'templates/exit.html').respond({ });
      $httpBackend.when('GET', 'templates/about.html').respond({ });
      $httpBackend.when('GET', 'templates/configuration.html').respond({ });
      $httpBackend.when('GET', 'templates/menu.html').respond({ });
      $httpBackend.when('GET', 'templates/home.html').respond({ });
      $httpBackend.when('GET', 'templates/rideForm.html').respond({ });

      usersJsonMock = readJSON('test/fixtures/users_fixture.json');
      ridesJsonMock = readJSON('test/fixtures/rides_fixture.json');
      userA = usersJsonMock.users[0];
      userB = usersJsonMock.users[1];

      userArray = usersJsonMock.users;

      $httpBackend.when('GET', 'http://104.236.252.208/api/users').respond(usersJsonMock.users);
      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1').respond(usersJsonMock.users[1]);
      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1/rides').respond(ridesJsonMock.rides);
      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1/vehicles').respond([{'car_type': 'SEDANN'}]);
      $httpBackend.when('DELETE', 'http://104.236.252.208/api/users/1/rides/1').respond(201, '');
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
      var controller = createController();

      $location.path('/rides');
      expect($location.path()).toBe('/rides');
      $httpBackend.flush();
    }));

    it('should uses its factories', inject(function($controller) {
      var controller = createController();
      $httpBackend.flush();
      expect($rootScope.users.length).toEqual(2);
      expect($rootScope.rides.length).toEqual(2);
      expect($rootScope.vehicles.length).toEqual(1);
    }));

    it('should decrement rides length in case of remove', function() {
      var controller = createController();
      $httpBackend.flush();
      expect($rootScope.rides.length).toEqual(2);
      $rootScope.remove(ridesJsonMock.rides[0]);
      $httpBackend.flush();
      expect($rootScope.rides.length).toEqual(1);
    });
  });
});
