describe ('profileCtrl tests', function(){

  describe('instantiation tests and scope', function() {
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
            return $controller('profileCtrl', {'$scope': $rootScope});
          };
        }));

        it('should be defined and initializes', function() {
          var controller = createController();
          expect(controller).toBeDefined();
          expect($rootScope).toBeDefined();
          expect($rootScope.user).toBeDefined();
          //console.log($rootScope.user);
        });

        it('should logout with the facebook correctly', inject(function($state) {
          spyOn($state, 'go');
          var controller = createController();
          $rootScope.fbLogout();
          expect($state.go).toHaveBeenCalledWith('menu.home');
        }));

        it('should open callback link', inject(function($state) {
          spyOn($state, 'go');
          var controller = createController();
          $rootScope.inAppOpenLink();
          expect($state.go).not.toHaveBeenCalledWith('menu.home');
        }));

        it('should have a correct scheme callback', function() {
          createController();
          $rootScope.schemeCallback("localhost:3000");
        });
  });

});
