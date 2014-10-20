fg.directive('fgField', function(fgFieldLinkFn) {

  return {
    require: ['^?fgForm', 'fgField'],
    replace: true,
    templateUrl: 'angular-form-gen/form/field/field.ng.html',
    scope: {
      fieldSchema: '=fgField', // The schema definition of the field
      tabIndex: '=?fgTabIndex', // Optional tab index -- used in overlay mode to disable focus
      editMode: '=?fgEditMode', // Indicates edit mode, which will sync the fieldSchema.value
      // to the form data for WYSIWYG pleasures.
      noValidationSummary: '=fgNoValidationSummary' // If true hides the validation summary
    },
    controller: 'fgFieldController',
    link: fgFieldLinkFn
  };

}).factory('fgFieldLinkFn', function(fgUtils) {
  return function($scope, $element, $attrs, ctrls) {

    var fgFormCtrl = ctrls[0];
    var fgFieldCtrl = ctrls[1];

    if ($scope.tabIndex === undefined) {
      $scope.tabIndex = 'auto';
    }

    $scope.renderInfo = fgUtils.getRenderInfo($scope.fieldSchema);

    fgFieldCtrl.init(fgFormCtrl, $scope.fieldSchema, $scope.editMode);
  };
});