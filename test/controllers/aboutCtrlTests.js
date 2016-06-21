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

    it('should open a external browser home', inject(function($state) {
      spyOn($state, 'go');
      var controller = createController();
      $rootScope.openInExternalBrowserHome();
      expect($state.go).not.toHaveBeenCalledWith('menu.home');
    }));

    it('should open a external browser home', inject(function($state) {
      spyOn($state, 'go');
      var controller = createController();
      $rootScope.openInExternalBrowserRepo();
      expect($state.go).not.toHaveBeenCalledWith('menu.home');
    }));
    
  });
}) 