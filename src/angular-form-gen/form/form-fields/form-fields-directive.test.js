describe('fg-form-fields-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('fg');

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
    });
  });

  it('should render the directive', function() {

    // Arrange

    var form = {
      schema: {}
    };
    
    $scope.form = form;

    var $element = angular.element('<div><div fg-form-fields></div></div>');
    $element.data('$fgFormController', {});

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.find('.fg-form-fields').length).toBe(1);
  });

});