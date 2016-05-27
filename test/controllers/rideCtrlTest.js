describe('rideCtrl tests', function() {
  describe('instantiation and scope tests', function() {
    var $httpBackend, $rootScope, createController, authHandler;
    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');

      createController = function() {
        return $controller('rideCtrl', {'$scope': $rootScope});
      };
    }));

    it('should be defined and initializes', (function() {
      var controller = createController();
      expect(controller).toBeDefined();
      expect($rootScope).toBeDefined();
      expect($rootScope.remove).toBeDefined();
      expect($rootScope.rides).toBeDefined();
      expect($rootScope.rides).toEqual([]);
      expect($rootScope.message).toEqual('');
    }));
  });

  describe('requests to backend tests', function() {
    var $httpBackend, $rootScope, createController, userArray, userA, userB, mockResource;

    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'templates/exit.html').respond({ });
      $httpBackend.when('GET', 'templates/about.html').respond({ });
      $httpBackend.when('GET', 'templates/configuration.html').respond({ });
      $httpBackend.when('GET', 'templates/menu.html').respond({ });
      $httpBackend.when('GET', 'templates/home.html').respond({ });
      $httpBackend.when('GET', 'templates/rideForm.html').respond({ });
      userA = {
        "id": "2",
        "name": "A Nice User",
        "phone": null,
        "email": "nice@nice.com",
        "gender": "Feminino",
        "facebook_id": "2817381283",
        "link_profile": "http://www.google.com",
        "link_profile": "http://www.google.com/.png",
        "token": "7Mi87v3CHZCovkCg6t2kFVlPuYyZAekzyZCX1uZCEZB7SZCHCCNeEOyjE7ZCod2u0uU9BZBQQ21CZCFMR0uhlg0WNU1eJf9erSUvHZAlqYZATqT74OBnwUggZDZD",
        "driver": {
          "id": "2",
          "user_id": "2",
          "vehicles": [],
          "rides": []
        },
        "passenger": {
          "id": "4",
          "user_id": "2",
          "rides": []
        }
      };
      userB = {
        "id": "1",
        "name": "BEST USER really",
        "phone": null,
        "email": "nicethbest@nice.com",
        "gender": "Masculino",
        "facebook_id": "281hudsahud7381283",
        "link_profile": "http://www.www.google.com",
        "link_profile": "http://dhuasduhawww.google.com/.png",
        "token": "7Mi87v3CHZCovkCg6t2kFVduahsdhulPuYyZAekzyZCX1uZCEZB7SZCHCCNeEOyjE7ZCod2u0uU9BZBQQ21CZCFMR0uhlg0WNU1eJf9erSUvHZAlqYZATqT74OBnwUggZDZD",
        "driver": {
          "id": "1",
          "user_id": "1",
          "vehicles": [],
          "rides": []
        },
        "passenger": {
          "id": "3",
          "user_id": "1",
          "rides": []
        }
      };
      userArray = [userA, userB];

      $httpBackend.when('GET', 'http://104.236.252.208/api/users')
        .respond(userArray);

      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1')
        .respond(
          {
            "id": "2",
            "name": "A Nice User",
            "phone": null,
            "email": "nice@nice.com",
            "gender": "Feminino",
            "facebook_id": "2817381283",
            "link_profile": "http://www.google.com",
            "link_profile": "http://www.google.com/.png",
            "token": "7Mi87v3CHZCovkCg6t2kFVlPuYyZAekzyZCX1uZCEZB7SZCHCCNeEOyjE7ZCod2u0uU9BZBQQ21CZCFMR0uhlg0WNU1eJf9erSUvHZAlqYZATqT74OBnwUggZDZD",
            "driver": {
              "id": "2",
              "user_id": "2",
              "vehicles": [],
              "rides": []
            },
            "passenger": {
              "id": "4",
              "user_id": "2",
              "rides": []
            }
          }
      );

      var newRideObject = {
        "title": "thebestride",
        "origin": "gamao",
        "destiny": "gaminha",
        "total_seats": "4",
        "departure_time": "11h",
        "description": "bestcarona",
        "vehicle": null
      };
      // $httpBackend.expectPOST('http://104.236.252.208/api/users/1/rides', newRideObject).respond(201, '');

      var otherRideObject = {
        "id": "5",
        "title": "thebestride",
        "origin": "gamao",
        "destiny": "gaminha",
        "total_seats": "4",
        "departure_time": "11h",
        "description": "bestcarona",
        "driver":{
          "id":"2",
          "user_id":"2",
          "vehicles":[],
          "rides":[]
        },
        "vehicle": null,
        "passengers_name": [],
        "passengers_photo": []
      };

      // $httpBackend.expectPUT('http://104.236.252.208/api/users/1/rides/5', otherRideObject).respond(201, '');

      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1/rides').respond([
        {
          'title': 'NICERIDE'
        }
      ]);
      $httpBackend.when('GET', 'http://104.236.252.208/api/users/1/vehicles').respond([
        {
          'car_type': 'SEDANN'
        }
      ]);
      $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('rideCtrl', {'$scope': $rootScope});
      };

    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should uses correct routes', inject(function($controller, _$location_) {
      $location = _$location_;
      var controller = createController();

      $location.path('/rides');
      expect($location.path()).toBe('/rides');
      $httpBackend.flush();
    }));

    it('should uses its factories', inject(function($controller) {
      var controller = createController();
      $httpBackend.flush();
      expect($rootScope.users.length).toEqual(2);
    }));

    it('should create new rides', function() {
      var controller = createController();
      $rootScope.ride = {
        "title": "thebestride",
        "origin": "gamao",
        "destiny": "gaminha",
        "total_seats": "4",
        "departure_time": "11h",
        "description": "bestcarona",
        "driver": {
          "id": "2",
          "user_id": "2",
          "vehicles": [],
          "rides": []
        },
        "vehicle": null,
        "passengers_name": [],
        "passengers_photo": []
      };

      $rootScope.vehicle = {
        "car_type": "the sedannn"
      };

      $httpBackend.flush();
      console.log("pos-flush");
      expect($rootScope.rides.length).toEqual(1);
    });
  });
});
