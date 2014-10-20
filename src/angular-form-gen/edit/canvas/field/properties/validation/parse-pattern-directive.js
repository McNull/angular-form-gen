fg.directive('fgParsePattern', function() {

  return {
    require: ['ngModel'],
    link: function($scope, $element, $attrs, ctrls) {
      var ngModelCtrl = ctrls[0];

      ngModelCtrl.$parsers.push(validate);
      
      function validate(value) {
        try {
          new RegExp(value);
        } catch(e) {
          ngModelCtrl.$setValidity('pattern', false);
          return undefined;
        }

        ngModelCtrl.$setValidity('pattern', true);
        return value;
      }
    }
  };
});