fg.directive('fgFormFields', function() {

  return {
    require: ['^?fgForm'],
    restrict: 'AE',
    templateUrl: 'angular-form-gen/form/form-fields/form-fields.ng.html',
    scope: {},
    link: function($scope, $element, $attrs, ctrls) {

      var fgForm = ctrls[0];

      $scope.$watch(function() {
        return fgForm.model;
      }, function(value) {
        $scope.form = value;
      });
    }
  };

});