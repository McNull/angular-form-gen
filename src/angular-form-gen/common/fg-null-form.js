/**
 * Created by null on 16/10/14.
 */
fg.directive('fgNullForm', function () {

  var nullFormCtrl = {
    $addControl: angular.noop,
    $removeControl: angular.noop,
    $setValidity: angular.noop,
    $setDirty: angular.noop,
    $setPristine: angular.noop
  };

  return {
    restrict: 'A',
    require: ['form'],
    link: function link($scope, $element, $attrs, $ctrls) {

      var form = $ctrls[0];

      // Locate the parent form

      var parentForm = $element.parent().inheritedData('$formController');

      if(parentForm) {

        // Unregister this form controller

        parentForm.$removeControl(form);
      }

      // Nullify the form

      angular.extend(form, nullFormCtrl);
    }
  };
});

fg.directive('fgFormRequiredFilter', function() {

  return {
    restrict: 'A',
    require: ['form'],
    link: function($scope, $element, $attrs, $ctrls) {

      var form = $ctrls[0];

      var $setValidity = form.$setValidity;

      form.$setValidity = function (validationToken, isValid, control) {

        if(validationToken === 'required') {
          isValid = true;
        }

        $setValidity.call(form, validationToken, isValid, control);
      };
    }
  };

});