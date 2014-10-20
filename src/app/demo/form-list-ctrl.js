app.controller('FormListCtrl', function ($scope, Form, forms, $location, $window, inform) {

  $scope.forms = forms;

  $scope.newForm = function () {
    $location.path('/demo/0/edit');
  };

  $scope.editForm = function (form) {
    $location.path('/demo/' + form.id + '/edit') ;
  };

  $scope.removeForm = function (form) {
    if ($window.confirm('Are you sure you want to delete the form?')) {

      Form.remove(form).then(function() {
        inform.add('Form has been deleted', { type: 'success' });

        Form.query().then(function(result) {
          $scope.forms = result;
        });
      });

    }
  };

  $scope.displayDataEntries = function (form) {
    $location.path('/demo/' + form.id);
  };

});

