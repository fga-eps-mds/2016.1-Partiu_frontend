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