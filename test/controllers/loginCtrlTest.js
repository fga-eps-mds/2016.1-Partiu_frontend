describe('loginCtrl tests', function() { 
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
        return $controller('loginCtrl', {'$scope': $rootScope});
      };
    }));

    it('should be defined and initialized', (function() {

      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
    }));

    it('should not login', function() {

          
    });

    it('should assign male', function() {

          
    });

    it('should assign female', function() {

          
    });


  });
  
});

