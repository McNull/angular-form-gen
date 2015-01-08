fg.directive('fgCheckboxlist', function() {

  function validateRequired(validation, value, options) {

    var required = validation ? validation.required : false;

    // Set in field-templates/default/checkboxlist.ng.html

    if(required) {

      // Ensures that at least one option is checked

      var x = options.length;

      while(x--) {
        if(value[options[x].value]) {
          return true;
        }
      }

      return false;
    }

    return true;

  }

  function selectionCount(value) {
    var c = 0;

    for(var k in value) {
      if(value[k]) {
        c += 1;
      }
    }

    return c;
  }

  return {
    require: ['^fgField'],
    link: function($scope, $element, $attrs, $ctrls) {

      var field = $ctrls[0].field();

      var formData = $scope.form.data, schema = field.schema;

      $scope.$watchCollection(function() {
        return formData[schema.name];
      }, function(value, oldValue) {

        // Ensure that the field is marked as dirty on changes
        if(!field.state.$dirty && value !== oldValue) {
          field.state.$setViewValue(value);
        }

        if(schema.validation) {
          var required = validateRequired(schema.validation, value, schema.options);
          field.state.$setValidity('required', required);

          var minc = schema.validation.minoptions;
          var maxc = schema.validation.maxoptions;

          var min = true, max = true;

          if(minc || maxc) {
            var c = selectionCount(value);

            if(minc) {
              min = c >= schema.validation.minoptions;
            }

            if(maxc) {
              max = c <= schema.validation.maxoptions;
            }
          }

          field.state.$setValidity('minoptions', min);
          field.state.$setValidity('maxoptions', max);
        }
      });
    }
  };
});
