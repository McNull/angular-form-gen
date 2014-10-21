fg.controller('fgFormController', function($scope, $parse) {

  this.model = {};
  var self = this;

  this.init = function(dataExpression, schema, state, editMode) {
    // Called by the directive
    
    self.editMode = editMode;

    var dataGetter = $parse(dataExpression);
    var dataSetter = dataGetter.assign;

    $scope.$watch(dataGetter, function(value) {
      if(value === undefined) {
        value = {};

        if(dataSetter) {
          dataSetter($scope, value);
        }
      }

      self.model.data = value;
    });

    $scope.$watch(function() {
      return schema.model();
    }, function(value) {
      if(value === undefined) {
        schema.model({});
      } else {
        self.model.schema = value;
      }
    });

    self.model.state = state;

    
    return self.model;
  };

//  this.clearFocusOnFields = function() {
//    angular.forEach(self.model.schema.fields, function(field) {
//      field.focus = false;
//    });
//  };

});
