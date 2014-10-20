fg.directive('fgPropertyFieldOptions', function(fgPropertyFieldOptionsLinkFn) {
  return {
    scope: true,
    controller: 'fgPropertyFieldOptionsController as optionsCtrl',
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/options/options.ng.html',
    link: fgPropertyFieldOptionsLinkFn
  };
}).factory('fgPropertyFieldOptionsLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    $scope.multiple = false;

    $attrs.$observe('fgPropertyFieldOptions', function(value) {
      if(value === 'multiple') {
        $scope.multiple = true;
      }
    });
  };
});