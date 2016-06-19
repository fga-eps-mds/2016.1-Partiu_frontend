describe('menuCtrl tests', function() {
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
        return $controller('menuCtrl', {'$scope': $rootScope});
      };
      
    }));

    it('should be defined and initialized', (function() {
      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
    }));



    it('should know if has been canceled Redirect', inject(function($state) {
      spyOn($state, 'go');
      var controller = createController();
      $rootScope.cancelRedirect();
      expect($state.go).toHaveBeenCalledWith('menu.home');
    }));


    it('should close app', inject(function($state) {
      spyOn($state, 'go');
      var controller = createController();
      $rootScope.closeApp();
      expect($state.go).not.toHaveBeenCalledWith('menu.home');
    }));


  });
});
