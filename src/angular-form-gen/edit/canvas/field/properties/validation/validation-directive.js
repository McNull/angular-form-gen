fg.directive('fgPropertyFieldValidation', function(fgPropertyFieldValidationLinkFn) {
  return {
    restrict: 'A',
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/validation/validation.ng.html',
    link: fgPropertyFieldValidationLinkFn
  };
}).factory('fgPropertyFieldValidationLinkFn', function(fgConfig) {

  var patternOptions = [];
  var patternConfig = fgConfig.validation.patterns;

  angular.forEach(patternConfig, function(value, text) {
    patternOptions.push({ value: value, text: text });
  });

  return function($scope, $element, $attrs, ctrls) {

    $scope.patternOptions = patternOptions;

    $scope.field.validation = $scope.field.validation || {};
    $scope.field.validation.messages = $scope.field.validation.messages || {};

    $scope.fields = {
      required: false,
      minlength: false,
      maxlength: false,
      pattern: false
    };

    $scope.$watch($attrs['fgPropertyFieldValidation'], function(value) {
      $scope.fields = angular.extend($scope.fields, value);
    });
  };
});