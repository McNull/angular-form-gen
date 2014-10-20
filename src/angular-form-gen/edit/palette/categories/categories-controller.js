fg.controller('fgEditPaletteCategoriesController', function($scope, fgConfig) {

  $scope.categories = fgConfig.fields.categories;

  $scope.setCategory = function(name, category) {
    $scope.categoryName = name;
    $scope.category = category;
  };

  if(!$scope.category) {
    //noinspection LoopStatementThatDoesntLoopJS
    for (var name in $scope.categories) {
      //noinspection JSUnfilteredForInLoop
      $scope.setCategory(name, $scope.categories[name]);
      break;
    }
  }
});