describe('fg-form-controller', function() {

  var $scope, $controller;

  beforeEach(function() {

    module('fg');

    inject(function(_$rootScope_, _$controller_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
    });

  });

  it('should construct controller', function() {

    var controller = $controller('fgFormController', {
      $scope: $scope
    });

    expect(controller).toBeDefined();

  });

  it('should create model object', function() {

    var controller = $controller('fgFormController', {
      $scope: $scope
    });

    expect(controller.model).toBeDefined();

  });

  describe('updateFormModel', function() {

    it('should construct form model', function() {

      // Arrange

      $scope.data = {};
      var schema = {};
      var state = {};

      var schemaCtrl = { model: function() { return schema }};

      var controller = $controller('fgFormController', {
        $scope: $scope
      });

      // Act

      controller.init('data', schemaCtrl, state);
      $scope.$digest();
      
      // Assert

      expect(controller.model).toBeDefined();
      expect(controller.model.data).toBe($scope.data);
      expect(controller.model.schema).toBe(schema);
      expect(controller.model.state).toBe(state);
    });
    
  });

});