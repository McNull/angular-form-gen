fg.directive('fgRequiredCheckboxlist', function() {

  function validate(required, value, options) {

    // Set in field-templates/default/checkboxlist.ng.html

    if(required) {

      // Ensures that at least one option is checked

      var x = options.length;

      while(x--) {
        if(value[options[x].value]) {
          return false;
        }
      }

      return true;
    }

  }

  var validationName = 'requiredCheckboxlist';

  return {
    require: ['ngModel', '^fgField'],
    link: function($scope, $element, $attrs, $ctrls) {

      var ngModel = $ctrls[0], schema = $scope.field.schema;

      $scope.$watchCollection('form.data[field.schema.name]', function(value) {
        ngModel.$setValidity(validationName, validate(schema.validation.required, value, schema.options));
      });

      //ngModel.$parsers.unshift(function(viewValue) {
      //
      //
      //  form.state.$setValidity(validationName, validate(schema.validation.required, form.data[schema.name], schema.options));
      //
      //  return viewValue;
      //
      //});

    }
  };
});
