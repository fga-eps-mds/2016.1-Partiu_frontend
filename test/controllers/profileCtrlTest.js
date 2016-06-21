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

        it('should logout with the facebook correctly', function() {

          
        });

        it('should open a link', function() {

          
        });

        it('should conect with iOS plataform', function() {

          
        });

        it('should conect with Android plataform', function() {

          
        });

  });

});