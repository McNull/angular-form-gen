describe('fg-unique-field-name', function() {

  var $compile, $scope, FgField;

  var template =
    '<div fg-schema="schema">' +
      '<form name="myForm" novalidate>' +
        '<input type="text" name="fieldName" ng-model="field.name" fg-unique-field-name>' +
        '<input type="text" name="fieldName2" ng-model="field2.name" fg-unique-field-name>' +
      '</form>' +
    '</div>';


  beforeEach(function() {
    module('fg')

    inject(function(_$compile_, _$rootScope_, _FgField_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();
      FgField = _FgField_;

      $scope.schema = {
        fields: [
          new FgField('myType', {
            name: 'name1'
          }),
          new FgField('myType', {
            name: 'name2'
          })
        ]
      };

      $scope.field = $scope.schema.fields[0];
      $scope.field2 = $scope.schema.fields[1];
    });

  });


  function isFieldError(form, fieldName, errorType) {
    return form.$invalid && form.$error[errorType] !== undefined &&
      form[fieldName].$invalid && form[fieldName].$error[errorType] !== undefined;
  }

  it('should set field error', function() {

    // Arrange

    $scope.schema.fields[0].name = 'notunique';
    $scope.schema.fields[1].name = 'notunique';

    var element = $(template);

    // Act

    $compile(element)($scope);
    $scope.$digest();

    // Assert

    expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(true);
  });

  it('should NOT set field error when unique field names', function() {

    // Arrange

    $scope.schema.fields[0].name = 'unique1';
    $scope.schema.fields[1].name = 'unique2';

    var element = $(template);

    // Act

    $compile(element)($scope);
    $scope.$digest();

    // Assert

    expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(false);
  });

  it('should set field error after change', function() {

    // Arrange

    $scope.schema.fields[0].name = 'no_conflict';
    $scope.schema.fields[1].name = 'yet';

    var element = $(template);
    $compile(element)($scope);
    $scope.$digest();

    // Act

    $scope.schema.fields[0].name = 'yet';
    $scope.$digest();

    // Assert

    expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(true);
  });

  it('should set both conflicting fields to error after change', function() {

    // Arrange

    $scope.schema.fields[0].name = 'no_conflict';
    $scope.schema.fields[1].name = 'yet';

    var element = $(template);
    $compile(element)($scope);
    $scope.$digest();

    // Act

    $scope.schema.fields[0].name = 'yet';
    $scope.$digest();

    // Assert

    expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(true);
    expect(isFieldError($scope.myForm, 'fieldName2', 'unique')).toBe(true);
  });

  it('should set both conflicting fields to valid after change', function() {

    // Arrange

    $scope.schema.fields[0].name = 'conflict';
    $scope.schema.fields[1].name = 'conflict';

    var element = $(template);
    $compile(element)($scope);
    $scope.$digest();
    
    // Act

    $scope.schema.fields[0].name = 'no_conflict';
    $scope.$digest();

    // Assert

    expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(false);
    expect(isFieldError($scope.myForm, 'fieldName2', 'unique')).toBe(false);
  });
});