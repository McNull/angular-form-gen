describe('fg-edit-canvas-field-properties-directive', function() {

  var $compile, $scope, $templateCache, FgField;

  beforeEach(function() {

    module('fg');

    inject(function(_$compile_, _$rootScope_, _$templateCache_, _FgField_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();
      $templateCache = _$templateCache_;
      FgField = _FgField_;
    });
  });

  function setupElementAndScope(field, template) {
    field = field || new FgField('myType');
//    fields = fields || [field];

//    if (_.indexOf(fields, field) === -1) {
//      fields.push(field);
//    }

    $scope.myField = field;
//    schema = {
//      fields: fields
//    };

    var $fixture = angular.element('<div></div>');
    //$fixture.data('$fgSchemaController', schemaCtrl);

    template = template || '<div fg-edit-canvas-field-properties="myField"></div>';

    return $fixture.append(template);
  }

  it('should compile directive', function() {

    // Arrange

    var $element = setupElementAndScope();

    // Act

    $compile($element)($scope);
    $scope.$digest();
    var result = $element.find('.fg-field-properties');

    // Assert

    expect(result.length).toBe(1);
  });

  it('should set have a property placeholder object on scope', function() {

    // Arrange

    var $element = setupElementAndScope();

    // Act

    $compile($element)($scope);
    $scope.$digest();

    $element = $element.children().children();
    $scope = $element.scope();

    // Assert

    expect($scope.property).toBeDefined();
    expect($scope.property.tabs).toBeDefined();
    expect($scope.property.tabs.items).toBeDefined();
    expect($scope.property.tabs.items.length).toBe(1); // Debug pane

  });

  it('should set include property panes from renderinfo', function() {

    // Arrange

    var $element = setupElementAndScope();
    var renderInfo = {
      propertiesTemplateUrl: 'my-property-panes'
    };

    $templateCache.put('my-property-panes', '<div fg-tabs-pane="tab1">tab1</div><div fg-tabs-pane="tab2">tab2</div>');

    // Act

    $compile($element)($scope);
    $scope.$digest();

    $element = $element.children().children();
    $scope = $element.scope();

    $scope.renderInfo = renderInfo;
    $scope.$digest();

    // Assert

    expect($element.text().indexOf('tab1')).not.toBe(-1);
    expect($element.text().indexOf('tab2')).not.toBe(-1);
    expect($scope.property.tabs.items.length).toBe(3); // + 1 debug tab

  });

  it('should set all property panes to renderAlways = true, expect the debug pane', function() {

    // Arrange

    var $element = setupElementAndScope();
    var renderInfo = {
      propertiesTemplateUrl: 'my-property-panes'
    };

    $templateCache.put('my-property-panes', '<div fg-tabs-pane="tab1">tab1</div><div fg-tabs-pane="tab2">tab2</div>');

    // Act

    $compile($element)($scope);
    $scope.$digest();

    $element = $element.children().children();
    $scope = $element.scope();

    $scope.renderInfo = renderInfo;
    $scope.$digest();

    // Assert

    var tabItems = $scope.property.tabs.items;

    // The order of the tabs is tab1, tab2, debug (the debug pane has a high order value set)

    expect(tabItems[0].renderAlways).toBe(true);
    expect(tabItems[1].renderAlways).toBe(true);
    expect(tabItems[2].renderAlways).toBe(false); // Debug should be false (performance)

  });

  // Moved to common
//  describe('field name validation', function() {
//
//    it('should set the field validation to invalid if the form validation fails', function () {
//
//      // Arrange
//
//      var $element = setupElementAndScope();
//
//      $scope.myField.name = "valid"; // Name is a required value
//
//      $compile($element)($scope);
//
//      $scope.$digest();
//
//      var before = $scope.myField.$$_invalid;
//
//      // Act
//
//      $scope.myField.name = "";
//
//      $scope.$digest();
//
//      var after = $scope.myField.$$_invalid;
//
//      // Assert
//
//      expect(before).toBeFalsy();
//      expect(after).toBeTruthy();
//
//    });
//  });
  //   it('should set the field validation to valid if the form validation succeeds', function() {

  //     // Arrange

  //     var $element = setupElementAndScope();

  //     $scope.myField.name = ""; // Name is a required value

  //     $compile($element)($scope);

  //     $scope.$digest();

  //     var before = $scope.myField.$$_invalid;

  //     // Act

  //     $scope.myField.name = "gedoe";

  //     $scope.$digest();

  //     var after = $scope.myField.$$_invalid;

  //     // Assert

  //     expect(before).toBeTruthy();
  //     expect(after).toBeFalsy();

  //   });

  //   it('should not allow duplicate field names', function() {

  //     // Arrange

  //     var field1 = new FgField('myType1', {
  //       name: 'notUnique'
  //     });
  //     var field2 = new FgField('myType2', {
  //       name: 'notUnique'
  //     });

  //     var $element = setupElementAndScope(field1, [field1, field2]);

  //     $compile($element)($scope);

  //     $scope.$digest();

  //     var before = $scope.myField.$$_invalid;

  //     // Act

  //     $scope.myField.name = "unique";

  //     $scope.$digest();

  //     var after = $scope.myField.$$_invalid;

  //     // Assert

  //     expect(before).toBeTruthy();
  //     expect(after).toBeFalsy();

  //   });
  // });

});