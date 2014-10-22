fg.directive('fgSchema', function(fgSchemaLinkFn) {

  return {
    require: ['fgSchema'],
    controller: 'fgSchemaController',
    link: fgSchemaLinkFn
  };

}).factory('fgSchemaLinkFn' , function() {
  return function($scope, $element, $attrs, ctrls) {
    var schemaCtrl = ctrls[0];

    $scope.$watch($attrs.fgSchema, function(value) {
      schemaCtrl.model(value);
    });

//    var getModel = $parse($attrs.fgSchema);
//    var setModel = getModel.assign;
//
//    var model = getModel($scope);
//
//    schemaCtrl.model(model);
//
//    $scope.$watch(function() {
//      return schemaCtrl.model();
//    }, function(value) {
//      setModel($scope, value);
//    });
  };
});

