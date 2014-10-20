fg.directive('fgFieldInput', function(fgFieldInputLinkFn) {
  return {
    require: ['^fgField', 'ngModel'],
    link: fgFieldInputLinkFn
  };
}).factory('fgFieldInputLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    var fgFieldCtrl = ctrls[0];
    var ngModelCtrl = ctrls[1];

    fgFieldCtrl.setFieldState(ngModelCtrl);
  };
});