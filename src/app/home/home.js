app.controller('HomeCtrl', function($scope, $http) {

  $http.get('app/README.md').then(function(result) {

    var idx = result.data.indexOf('## Description');
    $scope.readme = result.data.substring(idx);

  });

});