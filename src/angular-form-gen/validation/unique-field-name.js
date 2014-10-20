fg.directive('fgUniqueFieldName', function () {

  var changeTick = 0;

  function validate(ngModelCtrl, schemaCtrl, field) {
    
    var schema = schemaCtrl.model();
    var valid = true;
    var schemaField;

    if(schema) {

      var fields = schema.fields;

      for (var i = 0; i < fields.length; i++) {
        schemaField = fields[i];
        if (schemaField !== field && field.name === schemaField.name) {
          valid = false;
          break;
        }
      }
    }

    ngModelCtrl.$setValidity('unique', valid);
  }

  return {
    priority: 100,
    require: ['ngModel', '^fgSchema'],
    link: function ($scope, $element, $attrs, ctrls) {

      var ngModelCtrl = ctrls[0];
      var schemaCtrl = ctrls[1];
      
      var field = $scope.field;

      if(!field) {
        throw Error('No field property on scope');
      }

      $scope.$watch(function() { return ngModelCtrl.$modelValue; }, function () {
        
        // Every instance of this directive will increment changeTick
        // whenever the name of the associated field is modified.

        ++changeTick;
      });

      $scope.$watch(function() { return changeTick; }, function() {

        // Every instance of this directive will fire off the validation
        // whenever the changeTick has been modifed.

        validate(ngModelCtrl, schemaCtrl, field);
      });
    }
  };
});
