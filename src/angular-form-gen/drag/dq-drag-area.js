angular.module('dq').directive('dqDragArea', function (dqUtils) {

  function evalBroadcastEvent($scope, args, areaName, expression) {
    if (expression && args && args.area === areaName) {
      $scope.$eval(expression);
    }
  }

  return {
    restrict: 'AEC',
    link: function ($scope, $element, $attrs) {

      var areaName = $attrs.dqDragArea || $attrs.dqDragAreaName || "";

      $scope.$on('dqDragBegin', function ($event, args) {
        evalBroadcastEvent($scope, args, areaName, $attrs.dqDragProgressBegin);
      });

      $scope.$on('dqDragEnd', function ($event, args) {
        evalBroadcastEvent($scope, args, areaName, $attrs.dqDragProgressEnd);
      });

      $scope.$on('dqLocateArea', function($event, args) {
        args.name = areaName;
        $event.stopPropagation();
      });
    }
  }
});
