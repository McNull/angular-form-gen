fg.directive('fgEdit', function () {
  return {
    priority: 100,
    require: 'fgSchema',
    restrict: 'AE',
    scope: {
      // // The schema model to edit
      schema: '=?fgSchema'
//      // Boolean indicating wether to show the default form action buttons
//      actionsEnabled: '=?fgActionsEnabled',
//      // Callback function when the user presses save -- any argument named 'schema' is set to the schema model.
//      onSave: '&fgOnSave',
//      // Callback function when the user presses cancel -- any argument named 'schema' is set to the schema model.
//      onCancel: '&fgOnCancel',
//      // Boolean indicating wether the edit is in preview mode or not
//      preview: '=?fgPreview'
    },
    replace: true,
    controller: 'fgEditController as editCtrl',
    templateUrl: 'angular-form-gen/edit/edit.ng.html',
    link: function ($scope, $element, $attrs, schemaCtrl) {

      if ($scope.schema === undefined) {
        $scope.schema = {};
      }

//      if ($scope.actionsEnabled === undefined) {
//        $scope.actionsEnabled = true;
//      }
//
//      if ($scope.preview === undefined) {
//        $scope.preview = false;
//      }

      schemaCtrl.model($scope.schema);
      $scope.schemaCtrl = schemaCtrl;
    }
  }
});