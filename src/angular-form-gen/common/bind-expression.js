fg.directive('fgBindExpression', function ($interpolate) {

  function buildWatchExpression(interpolateFn) {
    var sb = [];
    var expressions = interpolateFn.expressions;
    var ii = expressions.length;

    while (ii--) {
      var expression = expressions[ii];

      if (expression.exp && !expression.exp.match(/^\s*$/)) {
        sb.push(expression.exp);
      }
    }

    return '[' + sb.join() + ']';
  }

  return function (scope, element, attr) {

    var interpolateFn, watchHandle, oldWatchExpr;

    function cleanWatchHandle() {
      if (watchHandle) watchHandle();
      watchHandle = undefined;
    }

    function interpolateExpression() {
      element.text(interpolateFn(scope));
    }

    scope.$on('$destroy', function () {
      cleanWatchHandle();
    });

    scope.$watch(attr.fgBindExpression, function (value) {
      if (value !== undefined) {
        interpolateFn = $interpolate(value);

        element.addClass('ng-binding').data('$binding', interpolateFn);

        var watchExpr = buildWatchExpression(interpolateFn);

        if (oldWatchExpr !== watchExpr) {

          oldWatchExpr = watchExpr;

          cleanWatchHandle();

          watchHandle = scope.$watchCollection(watchExpr, function () {
            interpolateExpression();
          });
        } else {
          interpolateExpression();
        }
      }
    });
  };
});
