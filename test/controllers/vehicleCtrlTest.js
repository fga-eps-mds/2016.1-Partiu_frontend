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
        ridesJsonMock = readJSON('test/fixtures/vehicles_fixture.json');
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
  });

});