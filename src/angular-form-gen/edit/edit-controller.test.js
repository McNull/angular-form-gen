//describe('fg-edit-controller', function() {
//
//  var $controller, $scope, fgConfig, schema = { fields: [] }, schemaCtrl = {
//    model: function() { return schema; }
//  };
//
//  beforeEach(function() {
//
//    module('fg');
//
//    inject(function(_$controller_, _$rootScope_, _fgConfig_) {
//
//      $controller = _$controller_;
//
//      fgConfig = _fgConfig_;
//
//      $scope = _$rootScope_.$new();
//      $scope.schemaCtrl = schemaCtrl;
//
//    });
//
//  });
//
//  it('should construct the controller', function() {
//
//    // Arrange
//
//
//    // Act
//
//    var controller = $controller('fgEditController', {
//      $scope: $scope
//    });
//
//    // Assert
//
//    expect(controller).toBeDefined();
//  });
//
//  describe('schema.$$_invalid', function() {
//
//    it('should be invalid when metaForm is not available', function() {
//
//      // Arrange
//
//      var controller = $controller('fgEditController', {
//        $scope: $scope
//      });
//
//      // Act
//
//      $scope.$digest();
//
//      // Assert
//
//      expect(schema.$$_invalid).toBe(false);
//
//    });
//
//    it('should be invalid when metaForm is invalid', function() {
//
//      // Arrange
//
//      var metaForm = {
//        $invalid: true
//      };
//
//      var controller = $controller('fgEditController', {
//        $scope: $scope
//      });
//
//      controller.setMetaForm(metaForm);
//
//      // Act
//
//      $scope.$digest();
//
//      // Assert
//
//      expect(schema.$$_invalid).toBe(true);
//
//    });
//
//    it('should not be invalid when metaForm is not invalid', function() {
//
//      // Arrange
//
//      var metaForm = {
//        $invalid: false
//      };
//
//      var controller = $controller('fgEditController', {
//        $scope: $scope
//      });
//
//      controller.setMetaForm(metaForm);
//
//      // Act
//
//      $scope.$digest();
//
//      // Assert
//
//      expect(schema.$$_invalid).toBe(false);
//
//    });
//
//    it('should be invalid when any of the schema fields is invalid', function() {
//
//      // Arrange
//
//      var metaForm = {
//        $invalid: false
//      };
//
//      var controller = $controller('fgEditController', {
//        $scope: $scope
//      });
//
//      controller.setMetaForm(metaForm);
//
//      var myField = new fg.Field('myType');
//      schema.fields.push(myField);
//      myField.$$_invalid = true;
//
//      // Act
//
//      $scope.$digest();
//
//      // Assert
//
//      expect(schema.$$_invalid).toBe(true);
//
//    });
//
//  });
//
//  describe('preview', function() {
//
//    it('should not set preview if not specified by route parameters', function() {
//
//      // Arrange
//
//      var routeParams = {};
//      var location = {
//        search: function() {
//          return routeParams;
//        }
//      };
//
//      // Act
//
//      $controller('fgEditController', {
//        $scope: $scope,
//        $location: location
//      });
//
//      // Assert
//
//      expect($scope.preview).toBeFalsy();
//
//    });
//
//    it('should set preview if specified by route parameters', function() {
//
//      // Arrange
//
//      var routeParams = {
//        preview: true
//      };
//      var location = {
//        search: function() {
//          return routeParams;
//        }
//      };
//
//      // Act
//
//      $controller('fgEditController', {
//        $scope: $scope,
//        $location: location
//      });
//
//      // Assert
//
//      expect($scope.preview).toBe(true);
//
//    });
//
//    it('should toggle preview scope value', function() {
//
//      // Arrange
//
//      var ctrl = $controller('fgEditController', {
//        $scope: $scope
//      });
//
//      $scope.preview = false;
//
//      // Act
//
//      ctrl.togglePreview();
//
//      var first = $scope.preview;
//
//      ctrl.togglePreview();
//
//      var second = $scope.preview;
//
//      // Assert
//
//      expect(first).toBe(true);
//      expect(second).toBe(false);
//    });
//
//    // it('should toggle preview location search value', function() {
//
//    //   // Arrange
//
//    //   var locationMock = {
//    //     search: function() {
//    //       return {};
//    //     }
//    //   };
//
//    //   var ctrl = $controller('fgEditController', {
//    //     $scope: $scope,
//    //     $location: locationMock
//    //   });
//
//    //   spyOn(locationMock, 'search').andCallThrough();
//    //   $scope.preview = false;
//
//    //   // Act
//
//    //   ctrl.togglePreview();
//    //   ctrl.togglePreview();
//
//    //   // Assert
//
//    //   expect(locationMock.search).toHaveBeenCalled();
//
//    //   var calls = locationMock.search.calls;
//
//    //   expect(calls).toBeDefined();
//    //   expect(calls.length).toBe(2);
//
//    //   if (calls && calls.length === 2) {
//    //     expect(calls[0].args).toEqual(['preview', true]);
//    //     expect(calls[1].args).toEqual(['preview', false]);
//    //   }
//    // });
//
//  });
//
//  // describe('addField', function() {
//
//  //   it('should add field to the end of the fields array', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     var field = new fg.Field('myType');
//
//  //     // Act
//
//  //     controller.addField(field);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields.length).toBe(4);
//  //     expect($scope.schema.fields[3].type).toBe(field.type);
//  //   });
//
//  //   it('should create a copy of the provided field', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [];
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     var field = new fg.Field('myType');
//
//  //     // Act
//
//  //     controller.addField(field);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0]).not.toBe(field);
//  //     expect($scope.schema.fields[0].type).toBe(field.type);
//  //   });
//
//  //   it('should add field at specified index', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     var field = new fg.Field('myType');
//
//  //     // Act
//
//  //     controller.addField(field, 1);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields.length).toBe(4);
//  //     expect($scope.schema.fields[1].type).toBe(field.type);
//  //   });
//
//  // });
//
//  // describe('removeField', function() {
//
//  //   it('should remove field by index', function() {
//
//  //     // Arrange
//
//  //     var index = 1;
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.removeField(index);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields.length).toBe(2);
//  //     expect(_.find($scope.schema.fields, {
//  //       name: 'Zwein'
//  //     })).toBeFalsy();
//  //   });
//  // });
//
//  // describe('swapFields', function() {
//
//  //   it('should swap fields by indices', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.swapFields(0, 1);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Zwein');
//  //     expect($scope.schema.fields[1].type).toBe('Ein');
//  //     expect($scope.schema.fields[2].type).toBe('Drein');
//
//  //   });
//
//  //   it('should NOT swap fields on array edges', function() {
//
//  //     // Arrange
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     function isUnchangedAfterSwap(idx1, idx2) {
//
//  //       $scope.schema.fields = [
//  //         new fg.Field('Ein'),
//  //         new fg.Field('Zwein'),
//  //         new fg.Field('Drein')
//  //       ];
//
//  //       controller.swapFields(idx1, idx2);
//
//  //       return $scope.schema.fields[0] && $scope.schema.fields[0].type === 'Ein' &&
//  //         $scope.schema.fields[1] && $scope.schema.fields[1].type === 'Zwein' &&
//  //         $scope.schema.fields[2] && $scope.schema.fields[2].type === 'Drein';
//  //     }
//
//  //     // Act & Assert
//
//  //     expect(isUnchangedAfterSwap(-1, 0)).toBeTruthy();
//  //     expect(isUnchangedAfterSwap(0, -1)).toBeTruthy();
//  //     expect(isUnchangedAfterSwap(3, 0)).toBeTruthy();
//  //     expect(isUnchangedAfterSwap(0, 3)).toBeTruthy();
//  //     expect(isUnchangedAfterSwap(-1, 3)).toBeTruthy();
//  //     expect(isUnchangedAfterSwap(3, -1)).toBeTruthy();
//  //   });
//  // });
//
//  // describe('moveField', function() {
//
//  //   it('should not move if target index is the same', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.moveField(2, 2);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Ein');
//  //     expect($scope.schema.fields[1].type).toBe('Zwein');
//  //     expect($scope.schema.fields[2].type).toBe('Drein');
//  //   });
//
//  //   it('should move field to new index (1/3)', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.moveField(0, 3);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Zwein');
//  //     expect($scope.schema.fields[1].type).toBe('Drein');
//  //     expect($scope.schema.fields[2].type).toBe('Ein');
//  //   });
//
//  //   it('should move field to new index (2/3)', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.moveField(0, 2);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Zwein');
//  //     expect($scope.schema.fields[1].type).toBe('Ein');
//  //     expect($scope.schema.fields[2].type).toBe('Drein');
//  //   });
//
//  //   it('should move field to new index (3/3)', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.moveField(1, 0);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Zwein');
//  //     expect($scope.schema.fields[1].type).toBe('Ein');
//  //     expect($scope.schema.fields[2].type).toBe('Drein');
//  //   });
//
//  //   it('should not move beyond array bounderies (1/2)', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.moveField(0, 10);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Ein');
//  //     expect($scope.schema.fields[1].type).toBe('Zwein');
//  //     expect($scope.schema.fields[2].type).toBe('Drein');
//  //   });
//
//  //   it('should not move beyond array bounderies (2/2)', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.moveField(-10, 0);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Ein');
//  //     expect($scope.schema.fields[1].type).toBe('Zwein');
//  //     expect($scope.schema.fields[2].type).toBe('Drein');
//  //   });
//
//  //   it('should move to edge boundery of array', function() {
//
//  //     // Arrange
//
//  //     $scope.schema.fields = [
//  //       new fg.Field('Ein'),
//  //       new fg.Field('Zwein'),
//  //       new fg.Field('Drein')
//  //     ];
//
//  //     var controller = $controller('fgEditController', {
//  //       $scope: $scope
//  //     });
//
//  //     // Act
//
//  //     controller.moveField(0, 3);
//
//  //     // Assert
//
//  //     expect($scope.schema.fields[0].type).toBe('Zwein');
//  //     expect($scope.schema.fields[1].type).toBe('Drein');
//  //     expect($scope.schema.fields[2].type).toBe('Ein');
//  //   });
//
//  // });
//
//});