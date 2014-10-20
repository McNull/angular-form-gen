describe('fg-directive', function() {

  var $element, $compile, $templateCache, $scope, fgUtils, formCtrlMock, FgField;

  beforeEach(function() {

    formCtrlMock = {
      model: {
        data: {},
        schema: {},
        state: {}
      }
    };

    module('fg');

    inject(function(_$compile_, _$templateCache_, _$rootScope_, _fgUtils_, _FgField_) {

      $compile = _$compile_;
      $templateCache = _$templateCache_;
      $scope = _$rootScope_.$new();
      fgUtils = _fgUtils_;
      FgField = _FgField_;

      // Needed for the require directive flag

      $element = angular.element('<div></div>');
      // $element.data('$formController', formCtrlMock);

    });
  });

  function createFieldTemplate(field, template) {
    field = field || new FgField('fakeField');
    template = template || '<div> {{ field.type }} </div>';
    var templateUrl = fgUtils.formatTemplateUrl(field);
    $templateCache.put(templateUrl, template);

    return field;
  }

  it('should compile directive', function() {

    // Arrange

    $scope.fieldSchema = createFieldTemplate();
    $element.append('<div fg-field="fieldSchema"></div>');

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.find('.fg-field-inner').length).toBe(1);
  });

  describe('renderInfo', function() {

    it('should assign renderInfo to scope', function() {
      
      // Arrange

      $scope.fieldSchema = createFieldTemplate();
      $element.append('<div fg-field="fieldSchema"></div>');

      var fakeRenderInfo = {};
      spyOn(fgUtils, 'getRenderInfo').andCallFake(function() { return fakeRenderInfo; })
      $compile($element)($scope);

      // Act

      
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.renderInfo).toBeDefined();
      expect($scope.renderInfo).toBe(fakeRenderInfo);
      expect(fgUtils.getRenderInfo).toHaveBeenCalledWith($scope.fieldSchema);

    });

  });

  describe('fgFieldController.init', function() {

    var fgFieldLinkFn;

    beforeEach(function() {
      inject(function(_fgFieldLinkFn_) {
        fgFieldLinkFn = _fgFieldLinkFn_;
      });
    });

    it('should call fg field controller init method', function() {
      
      // Arrange

      var fgFormCtrl = {};
      var fgFieldCtrl = {
        init: jasmine.createSpy('init')
      };

      var ctrls = [
        fgFormCtrl, fgFieldCtrl
      ];

      $scope.fieldSchema = createFieldTemplate();

      // Act

      fgFieldLinkFn($scope, $element, null, ctrls);

      // Assert

      expect(fgFieldCtrl.init).toHaveBeenCalled();
    });

  });

  describe('tabIndex', function() {
    it('should default to "auto" tabIndex if none provided', function() {

      // Act

      $scope.fieldSchema = createFieldTemplate();
      $element.append('<div fg-field="fieldSchema"></div>');

      // Act

      var result = $compile($element)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.tabIndex).toBe('auto');

    });

    it('should use provided tabIndex value', function() {

      // Act

      $scope.myAutoIndex = 123;
      $scope.fieldSchema = createFieldTemplate();

      $element.append('<div fg-field="fieldSchema" fg-tab-index="myAutoIndex"></div>');

      // Act

      var result = $compile($element)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.tabIndex).toBe($scope.$parent.myAutoIndex);

    });
  });
  
});