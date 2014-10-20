fg.controller('fgEditPaletteController', function ($scope, fgConfig) {

  $scope.templates = angular.copy(fgConfig.fields.templates);

  var count = 0;

  $scope.templateFilter = function (template) {
    return !$scope.selectedCategory || $scope.selectedCategory[template.type];
  };

});