describe('mapCtrl tests', function() {
  describe('instantiation and scope tests', function() {
    var $rootScope, createController;
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
    }));

    it('should be defined and initialized', (function() {
      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
    }));

    it('should tell if has a Error', (function() {

    }));

    it('should get the current location', inject(function($state) {
      spyOn($state, 'go');
      var controller = createController();
      $rootScope.getCurrentLocation();
      expect($state.go).not.toHaveBeenCalledWith('menu.home');
    }));

    it('should disable tap', inject(function() {

    }));

    it('should calculate distance', inject(function() {
    
    }));

    

  });
});
