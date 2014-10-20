angular.module('dq').directive('dqDraggable', function (dqUtils, $rootScope) {

  function evalAndBroadcast(eventName, targetArea, $scope, expression, cb) {
    $scope.$apply(function () {
      var data = $scope.$eval(expression);

      var bcData = {
        area: targetArea,
        data: data
      };

      cb(bcData);

      $rootScope.$broadcast(eventName, bcData);
    });
  }

  return {
    restrict: 'AEC',
    link: function ($scope, $element, $attrs) {

      var targetArea = $attrs.dqDraggable || $attrs.dqDragTargetArea || "";
      var disabled = false;

      $scope.$watch($attrs.dqDragDisabled, function(value) {
        disabled = value;
        $element.attr('draggable', disabled ? 'false' : 'true');
      });

      $element.on('selectstart',function (e) {

        // Pure IE evilness

        if (!disabled && this.dragDrop) {
          this.dragDrop();
          e = dqUtils.getEvent(e);
          return dqUtils.stopEvent(e);
        }
      }).on('dragstart',function (e) {

          e = dqUtils.getEvent(e);

          if(disabled) {
            return dqUtils.stopEvent(e);
          }

          var dt = e.dataTransfer;
          dt.effectAllowed = 'all';
          dt.setData('Text', 'The cake is a lie!');

          evalAndBroadcast('dqDragBegin', targetArea, $scope, $attrs.dqDragBegin, function(dragData) {
            dqUtils.dragData(dragData);
          });

        }).on('dragend', function () {

          evalAndBroadcast('dqDragEnd', targetArea, $scope, $attrs.dqDragEnd, function() {
            dqUtils.dragData(null);
          });

        });
    }
  };

});