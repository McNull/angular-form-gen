describe('fg-bind-expression', function() {

  var $compile, $scope;
  var template = '<div fg-bind-expression="myExpression"></div>';

  beforeEach(function() {

    module('fg');

    inject(function (_$compile_, _$rootScope_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

    });

  });

  it('should not interpolate with undefined result from expression', function() {

    // Arrange

    var $element = $compile(template)($scope);

    // Act

    $scope.$digest(); // without setting $scope.myExpression
                      // will fail if not checked

  });

  it('should add the ng-binding class to the element', function() {

    // Arrange

    var $element = $compile(template)($scope);

    $scope.myExpression = '{{ 1 }}';

    // Act

    $scope.$digest();
    var result = $element.hasClass('ng-binding');


    // Assert

    expect(result).toBe(true);

  });

  it('should add interpolation method to the element data store', function() {

    // Arrange

    var $element = $compile(template)($scope);

    // Act

    $scope.myExpression = '{{ 1 }}';

    $scope.$digest();

    var result = $element.data('$binding');

    // Assert

    expect(result).toBeDefined();
    expect(angular.isFunction(result)).toBe(true);

  });

  it('should bind expression result to inner text of element', function() {

    // Arrange

    $scope.myExpression = '{{ 1 + 2 + 3 }}';
    var $element = $compile(template)($scope);

    // Act

    $scope.$digest();

    var result = $element.text();

    // Assert

    expect(result).toBe('6');
  });

  it('should update bind expression result after change', function() {

    // Arrange

    $scope.myExpression = '{{ 1 + 2 + 3 }}';
    var $element = $compile(template)($scope);

    // Act

    $scope.$digest();

    $scope.myExpression = '{{ "kewl" }}';

    $scope.$digest();

    var result = $element.text();

    // Assert

    expect(result).toBe('kewl');
  });
});
