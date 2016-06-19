describe('Vehicle Entity Controllers Tests', function() {
  describe('indexVehicleCtrl tests', function() {
    describe('instantiation and scope tests', function() {
      var $httpBackend, $rootScope, createController;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        createController = function() {
          return $controller('indexVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
        expect($rootScope.vehicles).toBeDefined();
        expect($rootScope.vehicles).toEqual([]);
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

      beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend')
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
        vehiclesJsonMock = readJSON('test/fixtures/vehicles_fixture.json');
        userA = usersJsonMock.users[0];
        userArray = usersJsonMock.users;


        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users').respond(userArray);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', AppSettings.baseApiUrl + '/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $httpBackend.when('POST', AppSettings.baseApiUrl + '/api/users/1/rides').respond(201, ridesJsonMock.rides[0]);
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function() {
          return $controller('indexVehicleCtrl', {'$scope': $rootScope});
        };

      }));
      afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
      });

      it('should correctly fetches requests', inject(function(Profile) {
        var controller = createController();
        $httpBackend.when('GET', 'http://localhost:3000/api/users/vehicles').respond(200,ridesJsonMock.vehicles);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond(200,ridesJsonMock.vehicles);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);

        $httpBackend.flush();
      }));
    });
  });

  describe('newVehicleCtrl tests', function() {

    describe('instantiation and scope tests', function() {
      var $httpBackend, $rootScope, createController;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        createController = function() {
          return $controller('newVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
      }));
    });

    describe('backend mocks tests', function() {
      var $httpBackend, $rootScope, createController, authHandler, rideStub;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend')
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
        $httpBackend.when('GET', 'templates/vehicles/show.html').respond({ });
        $httpBackend.when('GET', 'templates/rides/index.html').respond({ });

        usersJsonMock = readJSON('test/fixtures/users_fixture.json');
        ridesJsonMock = readJSON('test/fixtures/rides_fixture.json');
        vehiclesJsonMock = readJSON('test/fixtures/vehicles_fixture.json');
        userA = usersJsonMock.users[0];
        userArray = usersJsonMock.users;


        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users').respond(userArray);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', AppSettings.baseApiUrl + '/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $httpBackend.when('POST', AppSettings.baseApiUrl + '/api/users/1/rides').respond(201, ridesJsonMock.rides[0]);
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function() {
          return $controller('newVehicleCtrl', {'$scope': $rootScope});
        };

      }));
      afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
      });

      it('should create valid vehicles', inject(function(Profile) {
        var controller = createController();
        $httpBackend.when('GET', 'http://localhost:3000/api/users/vehicles').respond(200,ridesJsonMock.vehicles);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond(200,ridesJsonMock.vehicles);
        $httpBackend.when('POST', 'http://localhost:3000/api/users/2/vehicles').respond(200,ridesJsonMock.vehicles);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var vehicleStub = {
          "car_model": "astra"
        };
        $rootScope.vehicle = vehicleStub;

        $httpBackend.flush();
        $rootScope.createVehicle();
        $httpBackend.flush();
      }));

      it('should not create invalid vehicles', inject(function(Profile) {
        var controller = createController();
        $httpBackend.when('GET', 'http://localhost:3000/api/users/vehicles').respond(200,ridesJsonMock.vehicles);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond(200,ridesJsonMock.vehicles);
        $httpBackend.when('POST', 'http://localhost:3000/api/users/2/vehicles').respond(404,{"error": "invalid values"});
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var vehicleStub = {
          "car_model": "astra"
        };
        $rootScope.vehicle = vehicleStub;

        $httpBackend.flush();
        $rootScope.createVehicle();
        $httpBackend.flush();
      }));
    });
  });

  describe('showVehicleCtrl tests', function() {

    describe('instantiation and scope tests', function() {
      var $httpBackend, $rootScope, createController;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        createController = function() {
          return $controller('showVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
      }));

    });

    describe('backend mocks tests', function() {
      var $httpBackend, $rootScope, createController, authHandler, rideStub;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend')
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
        $httpBackend.when('GET', 'templates/vehicles/show.html').respond({ });
        $httpBackend.when('GET', 'templates/rides/index.html').respond({ });

        usersJsonMock = readJSON('test/fixtures/users_fixture.json');
        ridesJsonMock = readJSON('test/fixtures/rides_fixture.json');
        vehiclesJsonMock = readJSON('test/fixtures/vehicles_fixture.json');
        userA = usersJsonMock.users[0];
        userArray = usersJsonMock.users;


        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users').respond(userArray);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', AppSettings.baseApiUrl + '/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $httpBackend.when('POST', AppSettings.baseApiUrl + '/api/users/1/rides').respond(201, ridesJsonMock.rides[0]);
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function() {
          return $controller('showVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should fetch the correct vehicle', inject(function(Profile, $stateParams) {
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/2/vehicles').respond(200, vehiclesJsonMock.vehicles[0]);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $stateParams.id = 1;
        $httpBackend.flush();
        expect($rootScope.vehicle.id).toEqual(vehiclesJsonMock.vehicles[0].id);
      }));

      it('should not fetch invalid vehicles', inject(function(Profile, $stateParams) {
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/2/vehicles').respond(404, {"error": "vehicle does not exist."});
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $stateParams.id = 5;
        $httpBackend.flush();
        expect($rootScope.vehicle).not.toBeDefined();
      }));
    });
  });

  describe('editVehicleCtrl tests', function() {
    describe('instantiation and scope tests', function() {
      var $httpBackend, $rootScope, createController;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        createController = function() {
          return $controller('editVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
      }));
    });

    describe('backend mocks tests', function() {
      var $httpBackend, $rootScope, createController, authHandler, rideStub;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend')
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
        $httpBackend.when('GET', 'templates/vehicles/show.html').respond({ });
        $httpBackend.when('GET', 'templates/rides/index.html').respond({ });

        usersJsonMock = readJSON('test/fixtures/users_fixture.json');
        ridesJsonMock = readJSON('test/fixtures/rides_fixture.json');
        vehiclesJsonMock = readJSON('test/fixtures/vehicles_fixture.json');
        userA = usersJsonMock.users[0];
        userArray = usersJsonMock.users;


        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users').respond(userArray);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', AppSettings.baseApiUrl + '/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $httpBackend.when('POST', AppSettings.baseApiUrl + '/api/users/1/rides').respond(201, ridesJsonMock.rides[0]);
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function() {
          return $controller('editVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should edit vehicle with valid data', inject(function(Profile, $stateParams, $state) {
        spyOn($state, 'go');
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond(200, vehiclesJsonMock.vehicles[0]);
        var modifiedVehicle = vehiclesJsonMock.vehicles[0];
        modifiedVehicle["color"] = "NEW BLUE";
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/2/vehicles/1').respond(200, modifiedVehicle);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $httpBackend.flush();
        $rootScope.updateVehicle();
        $httpBackend.flush();
        expect($state.go).toHaveBeenCalledWith('menu.showVehicle', {"id": 1});
      }));

      it('should not edit vehicle with invalid data', inject(function(Profile, $stateParams, $state) {
        spyOn($state, 'go');
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/vehicles').respond(200, vehiclesJsonMock.vehicles[0]);
        var modifiedVehicle = vehiclesJsonMock.vehicles[0];
        modifiedVehicle["color"] = "NEW BLUE";
        $httpBackend.when('PUT', 'http://localhost:3000/api/users/2/vehicles/1').respond(403, vehiclesJsonMock.vehicles[0]);
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $httpBackend.flush();
        $rootScope.updateVehicle();
        $httpBackend.flush();
        expect($state.go).not.toHaveBeenCalledWith('menu.showVehicle', {"id": 1});
      }));
    });
  });

  describe('deleteVehicleCtrl tests', function() {

    describe('instantiation and scope tests', function() {
      var $httpBackend, $rootScope, createController;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        createController = function() {
          return $controller('deleteVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      it('should be defined and initialized', (function() {
        var controller = createController();
        expect(controller).toBeDefined();
        expect($rootScope).toBeDefined();
      }));

    });

    describe('backend mocks tests', function() {
      var $httpBackend, $rootScope, createController, authHandler, rideStub;
      beforeEach(function() {
        module('starter');
        module('starter.controllers');
        module('starter.services');
      });

      beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend')
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
        $httpBackend.when('GET', 'templates/vehicles/show.html').respond({ });
        $httpBackend.when('GET', 'templates/rides/index.html').respond({ });

        usersJsonMock = readJSON('test/fixtures/users_fixture.json');
        ridesJsonMock = readJSON('test/fixtures/rides_fixture.json');
        vehiclesJsonMock = readJSON('test/fixtures/vehicles_fixture.json');
        userA = usersJsonMock.users[0];
        userArray = usersJsonMock.users;


        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users').respond(userArray);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users?id='+userA.id.toString()).respond(usersJsonMock.users[1]);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/rides').respond(ridesJsonMock.rides);
        $httpBackend.when('GET', AppSettings.baseApiUrl + '/api/users/1/vehicles').respond([{'car_type': 'SEDANN'}]);
        $httpBackend.when('DELETE', AppSettings.baseApiUrl + '/api/users/'+userB.id+'/rides/'+ridesJsonMock.rides[0].id).respond(201, '');
        $httpBackend.when('POST', AppSettings.baseApiUrl + '/api/users/1/rides').respond(201, ridesJsonMock.rides[0]);
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function() {
          return $controller('deleteVehicleCtrl', {'$scope': $rootScope});
        };
      }));

      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should successfully destroy the vehicle', inject(function(Profile, $stateParams) {
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/rides').respond(200, vehiclesJsonMock.vehicles);
        $httpBackend.when('DELETE', 'http://localhost:3000/api/users/2/vehicles/1').respond(200, {'response':'sucessfully deleted!'});
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $httpBackend.flush();
        $rootScope.vehicle = vehiclesJsonMock.vehicles[0];
        $rootScope.deleteVehicle();
        $httpBackend.flush();
      }));

      it('should not destroy invalid vehicle', inject(function(Profile, $stateParams) {
        console.log("MOCKADO:", ridesJsonMock.rides);
        $httpBackend.when('GET', 'http://localhost:3000/api/users/2/rides').respond(200, ridesJsonMock.rides);
        $httpBackend.when('DELETE', 'http://localhost:3000/api/users/2/vehicles/1').respond(404, {'error':'vehicle does not exist'});
        Profile.setUser("user123", "user123@gmail.com", "dhauhduhad", "mascl", "photourlboa.png", 1, "dhuauhds.google.com");
        Profile.updateBackendId(userA.id);
        var controller = createController();
        $rootScope.rides = ridesJsonMock.rides;
        $httpBackend.flush();
        $rootScope.vehicle = vehiclesJsonMock.vehicles[0];
        $rootScope.deleteVehicle();
        $httpBackend.flush();
      }));
    });
  });
});
