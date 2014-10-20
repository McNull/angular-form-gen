fg.directive('fgEditPaletteCategories', function () {
  return {
    templateUrl: 'angular-form-gen/edit/palette/categories/categories.ng.html',
    require: '^fgEditPalette',
    scope: {
      category: "=?"
    },
    controller: 'fgEditPaletteCategoriesController'
  };
});