app.controller('FormDataListCtrl', function($scope, form, dataEntries, $location, FormData, inform, $window) {

  $scope.form = form;

  $scope.dataEntries = dataEntries;

  $scope.addData = function() {
    $location.path('/demo/' + form.id + '/data/0/edit');
  };

  $scope.editData = function(dataEntry) {
    $location.path('/demo/' + form.id + '/data/' + dataEntry.id + '/edit/' );
  };

  $scope.removeData = function(dataEntry) {

    if ($window.confirm('Are you sure you want to delete the form data?')) {

      FormData.remove(dataEntry).then(function() {
        inform.add('Form data has been deleted', { type: 'success' });

        FormData.query(form).then(function(result) {
          $scope.dataEntries = result;
        });
      });

    }

  };

});
