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

    it('should be defined and initialized', (function() {
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
    rideStub, vehicleStub, usersJsonMock, ridesJsonMock;;


    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    beforeEach(function() {
      vehicleStub = {
        "color": "blue",
        "car_model": "my nice car",
        "driver_id": "1"
      };
      rideStub = {
        "title": "mytitle1",
        "origin": "myniceorigin",
        "destiny": "mynicedestiny",
        "total_seats": "4",
        "departure_time": "11h",
        "user_id": "1"
      };
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'templates/exit.html').respond({ });
      $httpBackend.when('GET', 'templates/about.html').respond({ });
      $httpBackend.when('GET', 'templates/configuration.html').respond({ });
      $httpBackend.when('GET', 'templates/menu.html').respond({ });
      $httpBackend.when('GET', 'templates/home.html').respond({ });
      $httpBackend.when('GET', 'templates/rideForm.html').respond({ });
      $httpBackend.when('GET', 'templates/searchRide.html').respond({ });
      $httpBackend.when('GET', 'templates/login.html').respond({ });
      $httpBackend.when('GET', 'templates/rank.html').respond({ });
      $httpBackend.when('GET', 'templates/profile.html').respond({ });
      $httpBackend.when('GET', 'templates/rides/show.html').respond({ });
      $httpBackend.when('GET', 'templates/rides/new.html').respond({ });
      $httpBackend.when('GET', 'templates/rides/index.html').respond({ });

      usersJsonMock = readJSON('test/fixtures/users_fixture.json');
      ridesJsonMock = readJSON('test/fixtures/rides_fixture.json');
      userA = usersJsonMock.users[0];
      userB = usersJsonMock.users[1];

      userArray = usersJsonMock.users;

      $httpBackend.when('GET', baseApiUrl + '/api/users').respond(userArray);
      $httpBackend.when('GET', baseApiUrl + '/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
      $httpBackend.when('GET', baseApiUrl + '/api/users/2/rides').respond(ridesJsonMock.rides);
      $httpBackend.when('GET', baseApiUrl + '/api/users/2/vehicles').respond([{'car_type': 'SEDANN'}]);
      $httpBackend.when('DELETE', baseApiUrl + '/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
      $httpBackend.when('POST', baseApiUrl + '/api/users/2/rides').respond(201, ridesJsonMock.rides[0]);
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

    it('should uses correct routes', inject(function($controller, _$location_, Profile) {
      Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
      Profile.updateBackendId(userA.id);
      $location = _$location_;
      var controller = createController();

      $location.path('/rides');
      expect($location.path()).toBe('/rides');
      $httpBackend.flush();
    }));

    it('should uses its factories', inject(function($controller, Profile) {
      Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
      Profile.updateBackendId(userA.id);
      var controller = createController();
      $httpBackend.flush();
      expect($rootScope.users.length).toEqual(2);
      expect($rootScope.rides.length).toEqual(2);
      expect($rootScope.vehicles.length).toEqual(1);
    }));

    it('should increment rides length in case of addition', inject(function(Profile) {
      Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
      Profile.updateBackendId(userA.id);
      var controller = createController();
      $httpBackend.flush();
      expect($rootScope.rides.length).toEqual(2);
      $rootScope.ride = rideStub;
      $rootScope.vehicle = vehicleStub;
      $rootScope.submitRide();
      $httpBackend.flush();
      expect($rootScope.message).toEqual('Carona '+rideStub.title+' incluída com sucesso');
    }));

    it('should decrement rides length in case of remove', inject(function(Profile) {
      Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
      Profile.updateBackendId(userA.id);
      var controller = createController();
      $httpBackend.flush();
      expect($rootScope.rides.length).toEqual(2);
      $rootScope.remove(ridesJsonMock.rides[0]);
      $httpBackend.flush();
      expect($rootScope.rides.length).toEqual(1);
    }));
  });
});
