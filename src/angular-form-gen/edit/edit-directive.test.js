describe('fg-edit-directive', function () {

  var $compile, $scope;

  beforeEach(function () {

    //fg.mocks.controller('fgSchemaController');

    module('fg');

    inject(function (_$compile_, $rootScope) {
      $compile = _$compile_;
      $scope = $rootScope.$new();
    });

  });

  it('should compile the template', function () {

    // Arrange

    var template = '<div fg-edit fg-schema="mySchema"></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.hasClass('fg-edit')).toBe(true);
  });


  it('should expose schema controller', function() {

    // Arrange

    var template = '<div fg-edit fg-schema="mySchema"></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    $scope = $scope.$$childHead;

    // Assert

    expect($scope.schemaCtrl).toBeDefined();

  });
  return;

  it('should create schema object if none provided', function() {

    // Arrange

    var template = '<div fg-edit fg-schema="myNoneExistingSchema"></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($scope.myNoneExistingSchema).toBeDefined();
    
  });

  it('should set the schema model on the controller', function() {

    // Arrange

    $scope.mySchema = {};

    var template = '<div fg-edit fg-schema="mySchema"></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();
    $scope = $scope.$$childHead;

    // Assert

    expect($scope.schemaCtrl.model()).toBe($scope.mySchema);
  });
 
  describe('$scope.actionsEnabled', function () {

    it('should default to true if no value is provided', function () {

      // Arrange

      var template = '<div fg-edit fg-schema="mySchema"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.actionsEnabled).toBe(true);

    });

    it('should use the provided actionsEnabled value', function () {

      // Arrange

      $scope.myActionsEnabled = false;

      var template = '<div fg-edit fg-schema="mySchema" data-actions-enabled="myActionsEnabled"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.actionsEnabled).toBe($scope.myActionsEnabled);
    });

  });

  describe('$scope.preview', function () {

    it('should default to false if no value is provided', function () {

      // Arrange

      var template = '<div fg-edit fg-schema="mySchema"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.preview).toBe(false);

    });

    it('should use the provided preview value', function () {

      // Arrange

      $scope.myPreview = true;

      var template = '<div fg-edit fg-schema="mySchema" data-preview="myPreview"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.preview).toBe($scope.myPreview);
    });

  });

});