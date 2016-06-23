describe('loginCtrl tests', function() { 
  describe('login simulation', function() {

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
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'templates/exit.html').respond({ });
      $httpBackend.when('GET', 'templates/about.html').respond({ });
      $httpBackend.when('GET', 'templates/configuration.html').respond({ });
      $httpBackend.when('GET', 'templates/menu.html').respond({ });
      $httpBackend.when('GET', 'templates/home.html').respond({ });
      $httpBackend.when('GET', 'templates/rideForm.html').respond({ });
      $httpBackend.when('GET', 'templates/searchRide.html').respond({ });
      $httpBackend.when('GET', 'templates/login.html').respond({ });
      $httpBackend.when('GET', 'templates/rank.html').respond({ });
      $httpBackend.when('GET', 'templates/profile.html').respond({ });
      $httpBackend.when('GET', 'templates/rides/show.html').respond({ });
      $httpBackend.when('GET', 'templates/rides/new.html').respond({ });
      $httpBackend.when('GET', 'templates/rides/index.html').respond({ });
      $httpBackend.when('GET', 'templates/vehicles/edit.html').respond({ });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined and initialized', (function() {
      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
      $httpBackend.flush();
    }));

    it('should login correct user', function () {
      createController();
      $rootScope.fbLogin();
      $httpBackend.flush();
    });
  });
  
});

