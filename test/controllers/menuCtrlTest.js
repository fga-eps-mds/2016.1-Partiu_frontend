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



    it('should be defined if the user is logged',(function() {
      
    }));



    it('should close app',(function() {
      /*var controller = createController();
      var $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');

      expect($rootScope.closeApp(true)).toBe(true);*/

    }));
  
  });
});

    /*
    it('should close app',(function() {
      var controller = createController();

      expect($rootScope.closeApp).toBe(false);
      $rootScope.closeApp;
      spyOn($rootScope, 'closeApp');
      expect($rootScope.closeApp()).toHaveBeenCalled();
    }));

    it("contains spec with an expectation", function() {
      var controller = createController();
      $rootScope.closeApp(true).toBe(true);
    });




$scope.open_login_modal = function() 
{
    var temp = $ionicModal.fromTemplateUrl('templates/login.html',{scope: $scope});

    temp.then(function(modal) { 
        $scope.modal_login = modal;
        $scope.modal_login.show();
    });
};

$scope.close_login_modal = function() 
{
    $scope.modal_login.hide();
};


describe('Modal tests', function() {
  beforeEach(function(){
    $scope.open_login_modal();
  });
  it('should open login modal', function() {
    expect($ionicModal.fromTemplateUrl).toHaveBeenCalled();
    expect($ionicModal.fromTemplateUrl.calls.count()).toBe(1);
  });
  it('should close login modal', function() {
    $scope.close_login_modal();
    spyOn($scope.modal_login, 'hide');
    expect($scope.modal_login.hide()).toHaveBeenCalled();
  });
});
    */
