fg.directive('fgPropertyField', function(fgPropertyFieldLinkFn) {

  return {
    restrict: 'AE',
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/property-field/property-field.ng.html',
    transclude: true,
    scope: true,
    link: fgPropertyFieldLinkFn
  };

}).factory('fgPropertyFieldLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {
    
    $attrs.$observe('fgPropertyField', function(value) {
      $scope.fieldName = value;
    });

    $attrs.$observe('fgPropertyFieldLabel', function(value) {
      if(value) {
        $scope.fieldLabel = value;
      }
    });

  };
});