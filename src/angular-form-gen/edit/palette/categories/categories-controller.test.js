describe('fg-edit-palette-categories-directive', function() {

  var $scope, $controller, fgConfig;

  beforeEach(function() {

    module('fg');

    inject(function(_$rootScope_, _$controller_, _fgConfig_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      fgConfig = _fgConfig_;

    });

  });

  it('should use category list from configuration', function() {

    // Act

    $controller('fgEditPaletteCategoriesController', {
      $scope: $scope,
      fgConfig: fgConfig
    });

    // Assert

    expect($scope.categories).toBe(fgConfig.fields.categories);

  });

  it('should set first category active on init', function() {

    // Arrange

    fgConfig.fields.categories = {
      'Should be active': { active: true },
      'Should not be active': { active: false }
    };

    // Act

    $controller('fgEditPaletteCategoriesController', {
      $scope: $scope,
      fgConfig: fgConfig
    });

    // Assert

    expect($scope.categoryName).toBe('Should be active');
    expect($scope.category).toBe(fgConfig.fields.categories['Should be active']);

  });

  it('should change both category object and name', function() {

    // Arrange

    var categoryName = 'The new category';
    var category = {
      totalyNew: true
    };

    $controller('fgEditPaletteCategoriesController', {
      $scope: $scope,
      fgConfig: fgConfig
    });

    // Act

    $scope.setCategory(categoryName, category);

    // Assert

    expect($scope.categoryName).toBe(categoryName);
    expect($scope.category).toBe(category);

  });
});