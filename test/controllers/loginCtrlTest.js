describe('loginCtrl tests', function() {
  describe('login simulation', function() {

    var $httpBackend, $rootScope, createController, userStub;
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

      userStub = {
        "facebook": {
          "cachedUserProfile": {
            "gender": "male",
            "link": "facebook.com/partiu"
          },
          "displayName": "nicename",
          "email": "reallyniceemail@gmail.com",
          "accessToken": "BESTTOKEN123",
          "profile": {
            "ImageURL": "NICEIMAGE.png"
          },
          "id": "1"
        }
      };

      $httpBackend.when('POST', 'http://localhost:3000/api/users').respond(200, userStub);
      $httpBackend.when('GET', 'http://localhost:3000/api/get_user_id?facebook_id=1').respond(200, {"id": 1});
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

    it('should login correct user', inject(function (Profile) {
      createController();
      $rootScope.fbLogin();
      $httpBackend.flush();
      expect(Profile.getUser()).not.toBeNull();
    }));

    it('should have a correct callback', function() {
      createController();

      $rootScope.loginCallback(null, userStub);
      $httpBackend.flush();
    });

    it('should do nothing if callback fails', function() {
      createController();

      $rootScope.loginCallback({"error": "forbidden"}, userStub);
      $httpBackend.flush();

    });
  });
});

