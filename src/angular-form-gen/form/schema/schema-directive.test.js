describe('fg-schema-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('fg');

    inject(function(_$rootScope_, _$compile_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();
      
    });

  });

  it('should compile directive', function() {

    // Arrange

    var template = '<div fg-schema="schema"></div>';

    var $fixture = angular.element(template);
    //$fixture.data('$fgSchemaController', schemaCtrlMock);

    // Act

    $compile($fixture)($scope);
    $scope.$digest();

    // Assert
    
    expect($fixture.hasClass('ng-scope')).toBe(true);

  });

});