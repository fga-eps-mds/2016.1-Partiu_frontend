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
        });

        it('should logout with the facebook correctly', inject(function($state) {
            spyOn($state, 'go');
            var controller = createController();
            $rootScope.fbLogout();
            expect($state.go).toHaveBeenCalledWith('menu.home');
        }));

        it('should open a link', inject(function($state) {
            spyOn($state, 'go');
            var controller = createController();
            $rootScope.inAppOpenLink();
            expect($state.go).not.toHaveBeenCalledWith('menu.home');
        }));

        /*it('should, at device ready, open in app a link', inject(function ($ionicPlatform) {
          $ionicPlatform.ready(); 
          createController();
          $rootScope.inAppOpenLink("127.0.0.1");
        }));

        it('should, at device ready, get availability', inject(function ($ionicPlatform) {
          $ionicPlatform.ready(); 
          createController();
          $rootScope.getAvailabilityScheme("facebook.com/", true);
        }));*/
  });

});