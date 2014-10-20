fg.directive('fgPropertyFieldCommon', function(fgPropertyFieldCommonLinkFn) {
  return {
    restrict: 'AE',
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/property-field/common.ng.html',
    link: fgPropertyFieldCommonLinkFn
  };
}).factory('fgPropertyFieldCommonLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    $scope.fields = {
      fieldname: false,
      displayname: false,
      placeholder: false,
      tooltip: false,
      focus: false
    };

    $scope.$watch($attrs['fgPropertyFieldCommon'], function(value) {
      $scope.fields = angular.extend($scope.fields, value);
    });
  };
});