app.controller('FormDataEditCtrl', function ($scope, form, formData, $window, $location, FormData, inform) {

  $scope.form = form;
  $scope.form.$state = {};
  $scope.form.$data = angular.copy(formData);
  $scope.form.$data.formId = form.id;

  $scope.onClose = function () {

    if($scope.form.$state.$dirty && !$window.confirm('Discard unsaved changes?')) {
      return;
    }

    $location.path('/demo/' + form.id);

  };

  $scope.onSave = function() {

    if($scope.form.$state.$valid) {

      FormData.save($scope.form.$data).then(function() {

        inform.add('Form data saved.', { type: 'success' });
        $location.path('/demo/' + form.id);

      });

    }

  };

});