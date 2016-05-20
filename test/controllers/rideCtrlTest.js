describe('rideCtrl tests', function() {
  describe('configuration', function() {
    it(' - test #1', function($controller) {
      var controller = $controller('rideCtrl', {});
      expect(controller).toBeDefined();
      expect(controller.rides).toBe([]);
      expect(controller.rides).toBeDefined();
    });
  });
});
