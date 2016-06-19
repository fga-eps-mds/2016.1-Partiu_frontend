describe('Ride Entity Controllers Tests', function() {
  describe('indexRideCtrl test', function() {
    describe('instantiation tests', function() {
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
          return $controller('indexRideCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
        expect($rootScope.rides).toBeDefined();
        expect($rootScope.rides).toEqual([]);
        expect($rootScope.message).toBeDefined();
        expect($rootScope.message).toEqual('');
      }));
    });

    describe('requests tests', function() {
      var $httpBackend, $rootScope, createController, authHandler, rideStub;
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

        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users').respond(userArray);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/2/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/2/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', AppSettings.baseApiUrl + '/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $httpBackend.when('POST', AppSettings.baseApiUrl + '/api/users/2/rides').respond(201, ridesJsonMock.rides[0]);
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function() {
          return $controller('indexRideCtrl', {'$scope': $rootScope});
        };

      }));

      afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
          createController = function() {
            return $controller('indexRideCtrl', {'$scope': $rootScope});
          };
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

    });
  });
  describe('newRideCtrl test', function() {
    describe('instantiation tests', function() {
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
          return $controller('newRideCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
        expect($rootScope.ride).toBeDefined();
        expect($rootScope.message).toBeDefined();
        expect($rootScope.message).toEqual('');
        expect($rootScope.createRide).toBeDefined();
      }));
    });
    describe('new rides for backend test', function() {
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

        $httpBackend.when('GET', 'http://localhost:3000/api/users').respond(userArray);
        $httpBackend.when('GET', 'http://localhost:3000/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', 'http://localhost:3000/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        createController = function() {
          return $controller('newRideCtrl', {'$scope': $rootScope});
        };

      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should correctly create rides', inject(function(Profile, RideAPI) {
        $httpBackend.when('POST', 'http://localhost:3000/api/users/2/rides').respond(201, ridesJsonMock.rides[0]);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();

        $httpBackend.flush();

        $rootScope.ride = rideStub;
        $rootScope.vehicle = vehicleStub;
        $rootScope.createRide();
        $httpBackend.flush();

        expect($rootScope.message).toEqual('Carona '+rideStub.title+' incluída com sucesso');
      }));

      it('should not create invalid rides', inject(function(Profile, RideAPI) {
        $httpBackend.when('POST', 'http://localhost:3000/api/users/2/rides').respond(403, {"response": "forbidden"});
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        rideStub["title"] = "";
        $httpBackend.flush();
        $rootScope.ride = rideStub;
        $rootScope.vehicle = vehicleStub;
        $rootScope.createRide();
        $httpBackend.flush();
        expect($rootScope.message).toEqual('Não foi possível incluir a carona '+$rootScope.ride.title);
      }));
    });
  });

  describe('showRideCtrl test', function() {
    describe('instantiation tests', function() {
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
          return $controller('showRideCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
        expect($rootScope.loadRide).toBeDefined();
      }));
    });

    describe('backend tests', function() {
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
          "user_id": "1",
          "driver_id": "1"
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

        $httpBackend.when('GET', 'http://localhost:3000/api/users').respond(userArray);
        $httpBackend.when('GET', 'http://localhost:3000/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', 'http://localhost:3000/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        createController = function() {
          return $controller('showRideCtrl', {'$scope': $rootScope});
        };

      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should correctly return ride', inject(function(Profile, $stateParams) {
        $stateParams.id = 1;
        $httpBackend.when('GET', 'http://localhost:3000/api/rides/1?userId=2').respond(201, ridesJsonMock.rides[0]);
        $httpBackend.when('POST', 'http://localhost:3000/api/insert_passenger').respond(201, ridesJsonMock.rides[0]);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $rootScope.loadRide();
        $httpBackend.flush();
      }));

      it('should correctly exit rides', inject(function(Profile, $stateParams) {
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/1/rides/1').respond(201, ridesJsonMock.rides[0]);
        $stateParams.id = 1;
        $httpBackend.when('GET', 'http://localhost:3000/api/rides/1?userId=2').respond(201, ridesJsonMock.rides[0]);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $httpBackend.flush();
        $rootScope.exitRide();
        $httpBackend.flush();
      }));


      it('should correctly enter in rides', inject(function(Profile, $stateParams) {
        $stateParams.id = 1;
        $httpBackend.when('GET', 'http://localhost:3000/api/rides/1?userId=2').respond(201, ridesJsonMock.rides[0]);
        $httpBackend.when('POST', 'http://localhost:3000/api/insert_passenger').respond(201, ridesJsonMock.rides[0]);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $rootScope.loadRide();
        $httpBackend.flush();

        $rootScope.enterRide();
        $httpBackend.flush();
      }));

      it('should return error for non existing ride', inject(function(Profile) {
        $httpBackend.when('GET', 'http://localhost:3000/api/rides?userId=2').respond(404, {"error":"User does not exist."});
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $rootScope.loadRide();
        $httpBackend.flush();
        expect($rootScope.message).toEqual("Não foi possivel encontrar a carona undefined");
      }));
    });
  });

  describe('editRideCtrl test', function() {
    describe('instantiation tests', function() {
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
          return $controller('editRideCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
        expect($rootScope.loadRide).toBeDefined();
        expect($rootScope.updateRide).toBeDefined();
      }));
    });

    describe('backend mock tests', function() {
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

        $httpBackend.when('GET', 'http://localhost:3000/api/users').respond(userArray);
        $httpBackend.when('GET', 'http://localhost:3000/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', 'http://localhost:3000/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        createController = function() {
          return $controller('editRideCtrl', {'$scope': $rootScope});
        };

      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should update existing ride', inject(function(Profile, $stateParams, $state) {
        $httpBackend.when('GET', 'http://localhost:3000/api/rides?userId=2').respond(201, {"rides":ridesJsonMock.rides});
        $httpBackend.when('GET', 'http://localhost:3000/api/rides/1').respond(201, ridesJsonMock.rides[0]);
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/2/rides/1').respond(201, ridesJsonMock.rides[0]);
        spyOn($state, 'go');

        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        $stateParams.id = 1;
        var controller = createController();
        $httpBackend.flush();
        $rootScope.updateRide();
        $httpBackend.flush();
        expect($state.go).toHaveBeenCalledWith('menu.rides', {"id": '1'});
      }));

      it('should not update invalid ride', inject(function(Profile, $stateParams, $state) {
        $httpBackend.when('GET', 'http://localhost:3000/api/rides?userId=2').respond(201, {"rides":ridesJsonMock.rides});
        $httpBackend.when('GET', 'http://localhost:3000/api/rides/1').respond(201, ridesJsonMock.rides[0]);
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/2/rides/1').respond(404, {"error": "invalid names"});
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/2/rides/2').respond(404, {"error": "invalid names"});
        spyOn($state, 'go');

        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        $stateParams.id = 1;
        var controller = createController();
        $httpBackend.flush();
        $rootScope.updateRide();
        $httpBackend.flush();
        expect($state.go).not.toHaveBeenCalledWith('menu.rides', {"id": '1'});
      }));

      it('should not fetch non existing rides', inject(function(Profile, $stateParams, $state) {
        $httpBackend.when('GET', 'http://localhost:3000/api/rides?userId=2').respond(201, {"rides":ridesJsonMock.rides});
        $httpBackend.when('GET', 'http://localhost:3000/api/rides/1').respond(404, {"error": "non existing ride"});
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/2/rides/2').respond(404, {"error": "invalid names"});
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/2/rides').respond(404, {"error": "invalid ride"});
        spyOn($state, 'go');

        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        $stateParams.id = 1;
        var controller = createController();
        $httpBackend.flush();
        $rootScope.updateRide();
        $httpBackend.flush();
        expect($state.go).not.toHaveBeenCalledWith('menu.rides', {"id": '1'});
      }));
    });
  });
});
