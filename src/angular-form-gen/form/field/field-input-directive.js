fg.directive('fgFieldInput', function (fgFieldInputLinkFn) {
  return {
    require: ['^fgField', 'ngModel'],
    link: fgFieldInputLinkFn
  };
}).factory('fgFieldInputLinkFn', function () {
  return function ($scope, $element, $attrs, ctrls) {

    var fgFieldCtrl = ctrls[0];
    var ngModelCtrl = ctrls[1];

    fgFieldCtrl.setFieldState(ngModelCtrl);
  };
}).factory('fgUpdatePattern', function () {
  //SSchaaf http://stackoverflow.com/questions/20847979/ngpattern-binding-not-working
  //Angular migration https://docs.angularjs.org/guide/migration
  return {
    require: "^ngModel",
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(function () {
          // Evaluate the ngPattern attribute against the current scope
          alert("attrs.ngPattern", attrs.ngPattern);
          return scope.$eval(attrs.ngPattern);
        },
        function (newval, oldval) {
          //Get the value from `ngModel`
          alert("newval", newval);
          alert("oldval", oldval);
          value = ctrl.$viewValue;

          // And set validity on the model to true if the element
          // is empty  or passes the regex test
          if (ctrl.$isEmpty(value) || newval.test(value)) {
            ctrl.$setValidity('pattern', true);
            return value;
          } else {
            ctrl.$setValidity('pattern', false);
            return undefined;
          }
        });
    }
  }
});
