app.controller('FormEditCtrl', function ($scope, $location, inform, $window, formMetaInfo, form, Form) {

  $scope.form = form;

  // Precreate the (form) $state object here so we can access it later.

  $scope.form.$state = {};

  // Make the form schema for editing application specific form information available on the scope.

  $scope.formMetaInfo = formMetaInfo;

  // Execute when the `close` button is smashed.

  $scope.onClose = function () {

    // Prompt the user if we've got some unsaved modifications.

    if ($scope.form.$state && $scope.form.$state.$dirty && !$window.confirm('Discard unsaved changes?')) {
      return;
    }

    $location.path('/demo');
  };

  $scope.canSave = function () {
    return $scope.form.$state.$dirty && $scope.form.$state.$valid;
  };

  $scope.onSave = function () {

    if ($scope.canSave()) {
      Form.save($scope.form).then(function() {
        inform.add('Form saved', { type: 'success' });
        $location.path('/demo');
      });
    }
  };


});