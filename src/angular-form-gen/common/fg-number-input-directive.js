fg.directive('fgInputNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      
      ctrl.$parsers.push(function(inputValue) {
        // this next if is necessary for when using ng-required on your input. 
        // In such cases, when a letter is typed first, this parser will be called
        // again, and the 2nd time, the value will be undefined
        if (inputValue == undefined) {
          return '';
        }

        var transformedInput = inputValue.replace(/[^0-9]/g, '');

        var value = parseInt(transformedInput);
        value === NaN ? undefined : value;

        if (transformedInput != inputValue) {
          ctrl.$setViewValue(transformedInput);
          ctrl.$render();
        }

        return value;

      });

      ctrl.$parsers.push(function(value) {
        var empty = ctrl.$isEmpty(value);
        if (empty || /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/.test(value)) {
          ctrl.$setValidity('number', true);
          return value === '' ? null : (empty ? value : parseFloat(value));
        } else {
          ctrl.$setValidity('number', false);
          return undefined;
        }
      });

      ctrl.$formatters.push(function(value) {
        return ctrl.$isEmpty(value) ? undefined : value;
      });

      if (attr.min) {
        var minValidator = function(value) {
          var min = parseFloat(attr.min);
          if (!ctrl.$isEmpty(value) && value < min) {
            ctrl.$setValidity('min', false);
            return undefined;
          } else {
            ctrl.$setValidity('min', true);
            return value;
          }
        };

        ctrl.$parsers.push(minValidator);
        ctrl.$formatters.push(minValidator);
      }

      if (attr.max) {
        var maxValidator = function(value) {
          var max = parseFloat(attr.max);
          if (!ctrl.$isEmpty(value) && value > max) {
            ctrl.$setValidity('max', false);
            return undefined;
          } else {
            ctrl.$setValidity('max', true);
            return value;
          }
        };

        ctrl.$parsers.push(maxValidator);
        ctrl.$formatters.push(maxValidator);
      }

      ctrl.$formatters.push(function(value) {

        if (ctrl.$isEmpty(value) || angular.isNumber(value)) {
          ctrl.$setValidity('number', true);
          return value;
        } else {
          ctrl.$setValidity('number', false);
          return undefined;
        }
      });
    }
  };
});
