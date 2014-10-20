fg.directive('fgEditValidationMessage', function(fgEditValidationMessageLinkFn) {
  return {
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/validation/validation-message.ng.html',
    link: fgEditValidationMessageLinkFn,
    scope: true
  };
}).factory('fgEditValidationMessageLinkFn', function() {

  var DEFAULT_TOOLTIP = "Enter a error message here that will be shown if this validation fails. If this field is empty a default message will be used.";
  
  return function($scope, $element, $attrs, ctrls) {
    $attrs.$observe('fgEditValidationMessage', function(value) {
      $scope.validationType = value;
    });

    $attrs.$observe('fgEditValidationTooltip', function(value) {
      value = value || DEFAULT_TOOLTIP;
      $scope.tooltip = value;
    });
  };
});