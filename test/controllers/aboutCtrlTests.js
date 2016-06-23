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

    it('should correctly open home link in a window', function () {
      createController();
      spyOn(window, 'open').and.callFake (function () {
        return true;
      });
      $rootScope.openInExternalBrowserHome();
      expect(window.open).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith('http://104.236.252.208','_system','location=yes');
    });

    it('should correctly open repository link in a window', function () {
      createController();
      spyOn(window, 'open').and.callFake (function () {
        return true;
      });
      $rootScope.openInExternalBrowserRepo();
      expect(window.open).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith('https://github.com/fga-gpp-mds','_system','location=yes');
    });

  });
}) 