fg.directive('fgEditPalette',function () {
  return {
    require: ['^fgSchema'],
    templateUrl: 'angular-form-gen/edit/palette/palette.ng.html',
    controller: 'fgEditPaletteController',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.schemaCtrl = ctrls[0];
    }
  };
});