describe('fg-edit-palette-categories-directive', function() {

  var $scope, $compile;

  beforeEach(function() {

    module('fg');

    inject(function(_$rootScope_, _$compile_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

    });

  });

  it('should compile template', function() {

    // Arrange

    var template = '<div fg-edit-palette-categories></div>';
    var $element = angular.element(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($element.find('.fg-edit-palette-categories').length).toBe(1);
  });

  it('should expose the selected category', function() {

    // Arrange

    var template = '<div fg-edit-palette-categories data-category="selectedCategory"></div>';
    var $element = angular.element(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($scope.selectedCategory).toBeDefined();
  });
});