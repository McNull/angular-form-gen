describe('fg-form-directive', function() {

  beforeEach(function() {
    module('fg');
  })

  describe('fgFormCompileFn', function() {

    var fgFormCompileFn;

    beforeEach(function() {
      inject(function(_fgFormCompileFn_) {
        fgFormCompileFn = _fgFormCompileFn_;
      });
    });

    it('should append render element', function() {

      // Arrange

      var $element = angular.element('<div></div>');
      var $attrs = {};

      // Act

      fgFormCompileFn($element, $attrs);

      // Assert

      expect($element.children().length).toBe(1);
      expect($element.children().attr('fg-form-fields')).toBeDefined();
    });

    it('should NOT append render element if specified', function() {

      // Arrange

      var $element = angular.element('<div></div>');
      var $attrs = { 
        fgNoRender: 'true'
      };

      // Act

      fgFormCompileFn($element, $attrs);

      // Assert

      expect($element.children().length).toBe(0);
    });
  });

  describe('fgFormLinkFn', function() {

    var fgFormLinkFn, $scope, $element, $attrs;
    
    var ngFormCtrl = {};
    var formCtrl = {};
    var schemaCtrl = {
      _model: null,
      model: function() { return this._model; }
    };

    var ctrls = [ngFormCtrl, formCtrl, schemaCtrl];

    beforeEach(function() {
      inject(function(_fgFormLinkFn_) {
        fgFormLinkFn = _fgFormLinkFn_;
      });

      inject(function(_$rootScope_) {
        $scope = _$rootScope_.$new();
      });

      $attrs = {};
    });

    describe('updateFormModel', function() {

      var $element = {};

      beforeEach(function() {
        $element.scope = function() { return $scope; }
      });

      it('should call init on the form controller before digest', function() {

        // Arrange

        formCtrl.init = jasmine.createSpy('init');

        // Act

        fgFormLinkFn($scope, $element, $attrs, ctrls);

        // Assert

        expect(formCtrl.init).toHaveBeenCalled();
      });

      // Probably not needed anymore

      // it('should NOT call updateFormModel on every digest', function() {

      //   // Arrange

      //   var expectedCallCount = 2; 

      //   formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
      //   fgFormLinkFn($scope, $element, $attrs, ctrls); // + 1
      //   $scope.$digest(); // + 1

      //   // Act

      //   $scope.$digest(); // Should not do anything

      //   // Assert

      //   expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      // });

      // it('should call updateFormModel whenever the schema model has been changed', function() {

      //   // Arrange

      //   var expectedCallCount = 3; 

      //   formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
      //   fgFormLinkFn($scope, $element, $attrs, ctrls); // + 1
      //   $scope.$digest(); // + 1

      //   // Act

      //   schemaCtrl._model = {};
      //   $scope.$digest(); // + 1

      //   // Assert

      //   expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      // });

      // it('should call updateFormModel whenever form property has changed', function() {

      //   // Arrange

      //   var expectedCallCount = 4; 

      //   formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
      //   fgFormLinkFn($scope, $element, $attrs, ctrls); // + 1
      //   $scope.$digest(); // + 1

      //   // Act

      //   $scope.form = {};
      //   $scope.$digest(); // + 2 (called twice because of form update)

      //   // Assert

      //   expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      // });

      // it('should call updateFormModel whenever formData property has changed', function() {

      //   // Arrange

      //   var expectedCallCount = 3; 

      //   formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
      //   fgFormLinkFn($scope, $element, $attrs, ctrls); // + 1
      //   $scope.$digest(); // + 1

      //   // Act

      //   $scope.formData = {};
      //   $scope.$digest(); // + 1

      //   // Assert

      //   expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      // });

    });
  });
});