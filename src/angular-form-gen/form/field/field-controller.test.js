describe('fg-field-controller', function() {

  var fgUtils, $scope, $controller;

  beforeEach(function() {

    module('fg');

    inject(function(_fgUtils_, _$rootScope_, _$controller_) {

      fgUtils = _fgUtils_;
      $scope = _$rootScope_.$new();
      $controller = _$controller_;

    });
  });

  it('should construct controller', function() {

    var result = $controller('fgFieldController', {
      $scope: $scope,
      fgUtils: fgUtils
    });

    expect(result).toBeDefined();

  });

  describe('initForm', function() {

    it('should use form from form controller', function() {

      // Arrange

      var formController = {
        model: {}
      };

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      // Act

      var result = controller.initForm(formController);

      // Assert

      expect(result).toBeDefined();
      expect(result).toBe(formController.model);

    });

    it('should create a new object if there\'s no form controller available', function() {

      // Arrange

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      // Act

      var result = controller.initForm(undefined);

      // Assert

      expect(result).toBeDefined();
      expect(result).toEqual({});

    });

  });

  describe('initField', function() {

    it('should use provided field schema', function() {

      // Arrange

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      var fieldSchema = {};

      // Act

      var result = controller.initField(fieldSchema);

      // Assert

      expect(result).toBeDefined();
      expect(result.schema).toBe(fieldSchema);

    });

    it('should create a unique id for the field', function() {

      // Arrange

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      spyOn(fgUtils, 'getUnique').andCallFake(function() {
        return 666;
      });

      // Act

      var field = controller.initField();
      var result = field.$_id;

      // Assert

      expect(fgUtils.getUnique).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result).toBe('id666');

    });

    it('should call registerState on self when the field schema name changes', function() {

      // Arrange

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      spyOn(controller, 'registerState');

      var initialName = 'initialName';
      var modifiedName = 'modifiedName';

      var fieldSchema = {
        name: initialName
      };

      // Act

      $scope.field = controller.initField(fieldSchema);
      $scope.$digest(); // Set initial name

      fieldSchema.name = modifiedName;
      $scope.$digest(); // Set modified name

      // Assert

      expect(controller.registerState.calls.length).toBe(2);
      expect(controller.registerState.calls[0].args[0]).toBe(initialName);
      expect(controller.registerState.calls[1].args[0]).toBe(modifiedName);
    });

  });

  describe('initDefaultData', function() {

    it('should use data from form controller model', function() {

      // Arrange

      var formCtrl = {
        model: {
          data: {}
        }
      };

      var fieldSchema = {
        name: 'fakeField'
      };

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      controller.initForm(formCtrl);

      // Act

      var result = controller.initDefaultData(fieldSchema);

      // Assert

      expect(result).toBeDefined();
      expect(result).toBe(formCtrl.model.data);

    });

    it('should assign initial field schema value if form data does not have a value', function() {

      // Arrange

      var formCtrl = {
        model: {
          data: {}
        }
      };

      var fieldSchema = {
        name: 'fakeField',
        value: 'inital value'
      };

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      controller.initForm(formCtrl);

      // Act

      var result = controller.initDefaultData(fieldSchema);

      // Assert

      expect(result['fakeField']).toBe(fieldSchema.value);

    });

    it('should NOT assign initial field schema value if form data already has a value', function() {

      // Arrange

      var formDataValue = 'already has value';

      var formCtrl = {
        model: {
          data: {
            fakeField: formDataValue
          }
        }
      };

      var fieldSchema = {
        name: 'fakeField',
        value: 'inital value'
      };

      var controller = $controller('fgFieldController', {
        $scope: $scope,
        fgUtils: fgUtils
      });

      controller.initForm(formCtrl);

      // Act

      var result = controller.initDefaultData(fieldSchema);

      // Assert

      expect(result['fakeField']).toBe(formDataValue);

    });

    describe('editMode', function() {

      it('should assign field schema value to form data in edit mode', function() {

        // Arrange

        var formCtrl = {
          model: {
            data: {}
          }
        };

        var firstValue = 'my first value';
        var secondValue = 'second value';

        var fieldSchema = {
          name: 'fakeField',
          value: firstValue
        };

        var controller = $controller('fgFieldController', {
          $scope: $scope,
          fgUtils: fgUtils
        });

        $scope.form = controller.initForm(formCtrl);
        $scope.field = controller.initField(fieldSchema);

        controller.initDefaultData(fieldSchema, true /* = editMode */);
        $scope.$digest();

        // Act

        $scope.field.schema.value = secondValue;
        $scope.$digest();

        // Assert

        expect($scope.form.data['fakeField']).toBeDefined();
        expect($scope.form.data['fakeField']).toBe(secondValue);

      });


      it('should transfer form data when field schema name has changed', function() {

        // Arrange

        var fieldValue = 'my precious value should still be available';
        var origFieldName = 'origName';
        var newFieldName = 'newName';

        var formCtrl = {
          model: {
            data: {}
          }
        };

        var fieldSchema = {
          name: origFieldName,

          /* since we're in edit mode; this schema value will be assigned on
           * the first $digest */

          value: fieldValue
        };

        var controller = $controller('fgFieldController', {
          $scope: $scope,
          fgUtils: fgUtils
        });

        $scope.form = controller.initForm(formCtrl);
        $scope.field = controller.initField(fieldSchema);

        controller.initDefaultData(fieldSchema, true /* = editMode */);
        $scope.$digest();

        // Act

        $scope.field.schema.name = newFieldName;
        $scope.$digest();

        // Assert

        expect($scope.form.data[origFieldName]).not.toBeDefined();
        expect($scope.form.data[newFieldName]).toBeDefined();
        expect($scope.form.data[newFieldName]).toBe(fieldValue);

      });

    }); // editMode

  }); // initDefaultData

  describe('setFieldState', function() {

    it('should set the field state', function() {

      // Arrange

      var state = {};

      var fieldSchema = {
        name: 'fakeField'
      };

      var controller = $controller('fgFieldController', { $scope: $scope, fgUtils: fgUtils });
      controller.registerState = angular.noop; // Mock out

      $scope.field = controller.initField(fieldSchema);

      // Act

      controller.setFieldState(state);

      // Assert

      expect($scope.field.state).toBe(state);
    });

    it('should register provided state with form controller', function() {

      // Arrange

      var state = {};

      var fieldSchema = {
        name: 'fakeField'
      };

      var controller = $controller('fgFieldController', { $scope: $scope, fgUtils: fgUtils });
      spyOn(controller, 'registerState');

      $scope.field = controller.initField(fieldSchema);

      // Act

      controller.setFieldState(state);

      // Assert

      expect(controller.registerState).toHaveBeenCalledWith(fieldSchema.name);
    
    });

  }); // setFieldState

  describe('registerState', function() {

    var StateMock = function() {
      var self = this;

      this.$addControl = function(state) {
        self[state.$name] = state;
      }

      this.$removeControl = function(state) {
        delete self[state.$name];
      }
    };

    it('should set the field name', function() {

      // Arrange

      var controller = $controller('fgFieldController', { $scope: $scope, fgUtils: fgUtils });
      
      var fieldSchema = {
        name: 'origName'
      };

      $scope.form = controller.initForm();
      $scope.field = controller.initField(fieldSchema);

      // Act

      controller.registerState('newName');

      // Assert

      expect($scope.field.name).toBe('newName');

    });

    it('should register the field state with the form controller', function() {

      // Arrange

      var controller = $controller('fgFieldController', { $scope: $scope, fgUtils: fgUtils });
      
      var fieldSchema = {
        name: 'origName'
      };

      var formCtrl = {
        model: {
          state: new StateMock()
        }
      };

      $scope.form = controller.initForm(formCtrl);
      $scope.field = controller.initField(fieldSchema);
      $scope.field.state = {};

      // Act

      controller.registerState('newName');

      // Assert

      expect($scope.form.state['newName']).toBeDefined();
      expect($scope.form.state['newName'].$name).toBe('newName');
      expect($scope.form.state['newName']).toBe($scope.field.state);

    });

  }); // registerState
});