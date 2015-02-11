fg.directive('fgEditCanvasField', function ($timeout) {

  return {
    templateUrl: 'angular-form-gen/edit/canvas/field/field.ng.html',
    link: function ($scope) {

      // Prevent the property tabs from closing if the field schema is invalid

      $scope.toggleProperties = function (field) {
        if (field.$_displayProperties) {
          field.$_displayProperties = field.$_invalid;
        } else {
          field.$_displayProperties = true;
        }
      }

      $scope.$watch('field.$_displayProperties', function (value) {

        if (value) {
          $scope.expanded = true;
        } else {
          $timeout(function () {
            $scope.expanded = false;
          }, 550);

        }


      });
    }
  };

});