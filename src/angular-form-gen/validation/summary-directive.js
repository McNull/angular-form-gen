fg.directive('fgValidationSummary', function(fgValidationSummaryLinkFn) {

  return {
    require: ['^?fgField', '^?form'],
    templateUrl: 'angular-form-gen/validation/summary.ng.html',
    scope: {
      fieldName: '@?fgValidationSummary',
      validationMessages: '=?fgValidationMessages'
    },
    link: fgValidationSummaryLinkFn
  };
}).factory('fgValidationSummaryLinkFn', function(fgConfig) {

  return function($scope, $element, $attrs, ctrls) {

    var fgFieldCtrl = ctrls[0];
    var ngFormController = ctrls[1];

    if (fgFieldCtrl) {
      // Grab the whole field state from the field controller
      $scope.field = fgFieldCtrl.field();
      $scope.form = fgFieldCtrl.form();

    } else if (ngFormController) {
      
      $scope.form = {
        state: ngFormController
      };

      $scope.$watch('fieldName', function(value) {
        $scope.field = {
          name: value,
          state: ngFormController[value]
        };
      });
    }

    // Whenever the form designer edits a custom message but decides to delete it later a "" is leftover.
    // I don't feel like setting all kinds of watchers so we'll fix that here

    if($scope.validationMessages) {
      angular.forEach($scope.validationMessages, function(value, key) {
        if(!value) {
          delete $scope.validationMessages[key];
        }
      });
    }

    $scope.messages = angular.extend({}, fgConfig.validation.messages, $scope.validationMessages);
  };

});