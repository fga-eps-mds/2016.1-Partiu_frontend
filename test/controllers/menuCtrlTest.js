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



    it('should know if has been canceled Redirect',(function() {
      var controller = createController();

      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
      expect($rootScope.cancelRedirect).toBeDefined();

      spyOn($rootScope,'cancelRedirect');
      $rootScope.cancelRedirect();
      
      expect($rootScope.cancelRedirect).toHaveBeenCalled();


    }));


    it('should close app',(function() {
      var controller = createController();

      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
      expect($rootScope.closeApp).toBeDefined();   

      spyOn($rootScope,'closeApp');
      $rootScope.closeApp();
      expect($rootScope.closeApp).toHaveBeenCalled( );
      expect($rootScope.closeApp).toHaveBeenCalledWith( );

      spyOn(ionic.Platform,'exitApp');
      ionic.Platform.exitApp();
      expect(ionic.Platform.exitApp).toHaveBeenCalled();
      expect(ionic.Platform.exitApp).toHaveBeenCalledWith();
      
    }));


  });
});
