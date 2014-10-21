app.directive('formBreadcrumb', function ($route) {

  return {
    templateUrl: 'app/demo/form-breadcrumb.html',
    link: function ($scope) {

      var nodes = [];

      nodes.push({
        path: '/', name: 'Home'
      });

      nodes.push({
        path: '/demo', name: 'Demonstration'
      });

      var cl = $route.current.locals;

      if (cl.form) {
        nodes.push({
          path: '/demo/' + cl.form.id, name: cl.form.name
        });

        if(cl.formData) {
          nodes.push({
            path: '/demo/' + cl.form.id + '/data/' + (cl.formData.id || 0) + '/edit', name: 'Data Edit'
          });
        } else if ($route.current.label == 'Edit') {
          nodes.push({
            path: '/demo/' + cl.form.id + '/edit/', name: 'Form Edit'
          });
        }
      }


      $scope.nodes = nodes;
    }
  };

});