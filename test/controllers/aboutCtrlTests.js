describe('aboutCtrl tests', function(){

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
        return $controller('aboutCtrl', {'$scope': $rootScope});
      };
    }));

    it('should be defined and initializes', (function() {
      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
      expect($rootScope.user).toBeDefined();
      console.log($rootScope.user);
    }));

    it('should open a link', inject(function($state) {
      spyOn($state, 'go');
      var controller = createController();
      $rootScope.inAppOpenLink();
      expect($state.go).not.toHaveBeenCalledWith('menu.home');
      /*
      spyOn($rootScope ,'getAvailabilityScheme');
      $rootScope.getAvailabilityScheme();
      expect($rootScope.getAvailabilityScheme).toHaveBeenCalledWith();
      */
    }));

  });
}) 