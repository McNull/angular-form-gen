describe('fg-edit-canvas-directive', function() {

  var editCtrlMock = {}, schema = {}, schemaCtrlMock = {
    model: function() { return schema; }
  }, $compile, $scope;

  beforeEach(function() {
    
    module('fg');

    inject(function (_$compile_, _$rootScope_) {

      $compile = _$compile_;

      $scope = _$rootScope_.$new();
      
      // This is not an isolated scope -- the directive requires
      // the scope controller to be set, which sets the schema property
      // on the scope.
      
      $scope.schema = schema;

      // Needed for the require directive flag
      
      $element = angular.element('<div ng-form></div>');
      $element.data('$fgEditController', editCtrlMock);
      $element.data('$fgSchemaController', schemaCtrlMock);
      
    });

  });

  it('should compile directive', function() {

    // Arrange

    var template = '<div fg-edit-canvas></div>';

    $element.append(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();
    var result = $element.find('.fg-edit-canvas');

    // Assert

    expect(result.length).toBe(1);
  });

  it('should persist edit controller to scope', function() {

    // Arrange

    var template = '<div fg-edit-canvas></div>';

    $element.append(template);
    $compile($element)($scope);
    $scope.$digest();
    
    // Act

    var $canvasScope = $element.find('.fg-edit-canvas').scope();

    // Assert

    expect($canvasScope).toBeDefined();
    expect($canvasScope.editCtrl).toBeDefined();
    expect($canvasScope.editCtrl).toBe(editCtrlMock);

  });

  it('should have schema on scope', function() {

    // Arrange

    var template = '<div fg-edit-canvas></div>';

    $element.append(template);
    $compile($element)($scope);
    $scope.$digest();
    
    // Act

    var $canvasScope = $element.find('.fg-edit-canvas').scope();

    // Assert

    expect($canvasScope).toBeDefined();
    expect($canvasScope.schema).toBeDefined();
  });

});
