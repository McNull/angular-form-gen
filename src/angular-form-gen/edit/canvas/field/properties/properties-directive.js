fg.directive('fgEditCanvasFieldProperties', function (fgUtils) {

  // To keep the form validation working, the contents of the tabs needs to be rendered even if the tab is not active.

  function setRenderAlways(tabItems) {
    var i = tabItems.length;

    while (i--) {
      var tab = tabItems[i];

      // Skip the debug tab

      if(tab.title !== 'Debug') {
        tab.renderAlways = true;
      }
    }
  }

  return {
    templateUrl: 'angular-form-gen/edit/canvas/field/properties/properties.ng.html',
    scope: {
      field: '=fgEditCanvasFieldProperties'
    },
    link: {
      pre: function ($scope) {
        $scope.property = {};
      },
      post: function ($scope) {

        $scope.$watch('fieldPropertiesForm.$invalid', function (newValue) {
          $scope.field.$$_invalid = newValue;
        });

        $scope.renderInfo = fgUtils.getRenderInfo($scope.field);


        $scope.$watch('property.tabs.items.length', function(value) {
          if(value) {
            setRenderAlways($scope.property.tabs.items);
          }
        });

      }
    }
  };
});
