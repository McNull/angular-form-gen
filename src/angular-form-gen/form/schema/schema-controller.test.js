describe('fg-schema-controller', function() {

  var $controller, $scope, FgField;

  beforeEach(function() {

    module('fg');

    inject(function(_$controller_, _$rootScope_, _FgField_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      FgField = _FgField_;

    });
  });

  it('should construct controller', function() {

    // Arrange

    // Act

    var controller = $controller('fgSchemaController', {
      $scope: $scope
    });

    // Assert

    expect(controller).toBeDefined();

  });

  it('should set the model on controller', function() {

    // Arrange

    var model = {};

    var controller = $controller('fgSchemaController', {
      $scope: $scope
    });

    // Act

    controller.model(model);

    // Assert

    expect(controller.model()).toBe(model);
  });

  /////////////////////////////////////////////////////////////

  describe('addField', function() {

    it('should create the field array if it doesnt exist', function() {

      // Arrange

      var schema = {};

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      var field = new FgField('myType');

      // Act

      controller.addField(field);

      // Assert

      expect(schema.fields).toBeDefined();
      expect(angular.isArray(schema.fields)).toBe(true);

    });

    it('should add field to the end of the fields array', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      var field = new FgField('myType');

      // Act

      controller.addField(field);

      // Assert

      expect(schema.fields.length).toBe(4);
      expect(schema.fields[3].type).toBe(field.type);
    });

    it('should create a copy of the provided field', function() {

      // Arrange

      var schema = {
        fields: []
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      var field = new FgField('myType');

      // Act

      controller.addField(field);

      // Assert

      expect(schema.fields[0]).not.toBe(field);
      expect(schema.fields[0].type).toBe(field.type);
    });

    it('should add field at specified index', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      var field = new FgField('myType');

      // Act

      controller.addField(field, 1);

      // Assert

      expect(schema.fields.length).toBe(4);
      expect(schema.fields[1].type).toBe(field.type);
    });

  });



  describe('removeField', function() {

    it('should remove field by index', function() {

      // Arrange

      var index = 1;

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.removeField(index);

      // Assert

      expect(schema.fields.length).toBe(2);
      expect(_.find(schema.fields, {
        name: 'Zwein'
      })).toBeFalsy();
    });
  });

  describe('swapFields', function() {

    it('should swap fields by indices', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.swapFields(0, 1);

      // Assert

      expect(schema.fields[0].type).toBe('Zwein');
      expect(schema.fields[1].type).toBe('Ein');
      expect(schema.fields[2].type).toBe('Drein');

    });

    it('should NOT swap fields on array edges', function() {

      // Arrange

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      function isUnchangedAfterSwap(idx1, idx2) {

        var schema = {
          fields: [
            new FgField('Ein'),
            new FgField('Zwein'),
            new FgField('Drein')
          ]
        };

        controller.model(schema);
        controller.swapFields(idx1, idx2);

        return schema.fields[0] && schema.fields[0].type === 'Ein' &&
          schema.fields[1] && schema.fields[1].type === 'Zwein' &&
          schema.fields[2] && schema.fields[2].type === 'Drein';
      }

      // Act & Assert

      expect(isUnchangedAfterSwap(-1, 0)).toBeTruthy();
      expect(isUnchangedAfterSwap(0, -1)).toBeTruthy();
      expect(isUnchangedAfterSwap(3, 0)).toBeTruthy();
      expect(isUnchangedAfterSwap(0, 3)).toBeTruthy();
      expect(isUnchangedAfterSwap(-1, 3)).toBeTruthy();
      expect(isUnchangedAfterSwap(3, -1)).toBeTruthy();
    });
  });

  describe('moveField', function() {

    it('should not move if target index is the same', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.moveField(2, 2);

      // Assert

      expect(schema.fields[0].type).toBe('Ein');
      expect(schema.fields[1].type).toBe('Zwein');
      expect(schema.fields[2].type).toBe('Drein');
    });

    it('should move field to new index (1/3)', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.moveField(0, 3);

      // Assert

      expect(schema.fields[0].type).toBe('Zwein');
      expect(schema.fields[1].type).toBe('Drein');
      expect(schema.fields[2].type).toBe('Ein');
    });

    it('should move field to new index (2/3)', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.moveField(0, 2);

      // Assert

      expect(schema.fields[0].type).toBe('Zwein');
      expect(schema.fields[1].type).toBe('Ein');
      expect(schema.fields[2].type).toBe('Drein');
    });

    it('should move field to new index (3/3)', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.moveField(1, 0);

      // Assert

      expect(schema.fields[0].type).toBe('Zwein');
      expect(schema.fields[1].type).toBe('Ein');
      expect(schema.fields[2].type).toBe('Drein');
    });

    it('should not move beyond array bounderies (1/2)', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.moveField(0, 10);

      // Assert

      expect(schema.fields[0].type).toBe('Ein');
      expect(schema.fields[1].type).toBe('Zwein');
      expect(schema.fields[2].type).toBe('Drein');
    });

    it('should not move beyond array bounderies (2/2)', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.moveField(-10, 0);

      // Assert

      expect(schema.fields[0].type).toBe('Ein');
      expect(schema.fields[1].type).toBe('Zwein');
      expect(schema.fields[2].type).toBe('Drein');
    });

    it('should move to edge boundery of array', function() {

      // Arrange

      var schema = {
        fields: [
          new FgField('Ein'),
          new FgField('Zwein'),
          new FgField('Drein')
        ]
      };

      var controller = $controller('fgSchemaController', {
        $scope: $scope
      });

      controller.model(schema);

      // Act

      controller.moveField(0, 3);

      // Assert

      expect(schema.fields[0].type).toBe('Zwein');
      expect(schema.fields[1].type).toBe('Drein');
      expect(schema.fields[2].type).toBe('Ein');
    });

  });

});