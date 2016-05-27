describe('rideCtrl tests', function() {
  var newCtrl;

  describe('configuration', function() {
    beforeEach(function() {
      module('starter');
      module('starter.controllers');
      module('starter.services');
    });

    it('should be defined', inject(function($controller) {
      var scope = {};
      var controller = $controller('rideCtrl', {
        $scope: scope,
        RegisterRide: null,
        $http: null
      });

      expect(controller).toBeDefined();
      expect(scope).toBeDefined();
      expect(scope.remove).toBeDefined();
      expect(scope.rides).toBeDefined();
    }));
  });
});
