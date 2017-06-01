function fgToJsonReplacer(key, value) {
 var val = value;

 if (typeof key === 'string' && key.charAt(0) === '$') {
   val = undefined;
 }
 return val;
}

fg.filter('j$on',function () {
  return function (input, displayHidden) {

    if(displayHidden)
      return JSON.stringify(input || {}, null, '  ');

    //https://github.com/angular/angular.js/commit/c054288c9722875e3595e6e6162193e0fb67a251#diff-1d54c5f722aebc473dbe96f836ddf974R995
    //return angular.toJson(input || {}, true);
    return JSON.stringify(input || {}, fgToJsonReplacer, '  ');
  };
}).directive('jsonify', function ($window, $filter) {
    return {
      templateUrl: 'angular-form-gen/common/jsonify/jsonify.ng.html',
      replace: true,
      scope: {
        jsonify: "=",
        displayHidden: "@jsonifyDisplayHidden"
      },
      link: function($scope, $element, $attrs, ctrls) {
        $scope.expression = $attrs.jsonify;

        $scope.copy = function() {
          $window.prompt ("Copy to clipboard: Ctrl+C, Enter", $filter('j$on')($scope.jsonify, $scope.displayHidden));
        };
      }
    };
  });
