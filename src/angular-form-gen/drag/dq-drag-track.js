angular.module('dq').directive('dqDragEnter',function (dqDragTrack) {
  return {
    link: dqDragTrack
  };
}).directive('dqDragLeave',function (dqDragTrack) {
    return {
      link: dqDragTrack
    };
  }).directive('dqDragOver',function (dqDragTrack) {
    return {
      link: dqDragTrack
    };
  }).directive('dqDrop',function (dqDragTrack) {
    return {
      link: dqDragTrack
    };
  }).factory('dqDragTrack', function (dqUtils, $document) {

    // Combines both nq-drag-enter & nq-drag-leave & nq-drag-over

    return function ($scope, $element, $attrs) {

      // Tracking already set on the element?

      if ($element.data('dqDragTrack') !== true) {

        var trackingEnabled = false; // Toggled on drag-begin if the area name does not match the target
        var inbound = false; // Toggle to indicate if the dragging is in or outbound element
        var element = $element[0];
        var dropEffect = 'none'; // Drop effect used in the dragover event
        var doingLeaveDoubleCheck = false; // Toggle that indicates the body has a dragover event to do.

        var $body = $document.find('body');

        function dragLeaveDoubleCheck($e) {
          var e = dqUtils.getEvent($e);

          // Check if the drag over element is a child of the this element

          var target = e.target || $e.target;

          if (target !== element) {

            // TODO: we're not really checking if the target element is visually within the $element.

            if (!element.contains(target)) {

              // Drag over element is out of bounds

              dragLeaveForSure(true);
            }
          }

          // We're done with the expensive body call

          $body.off('dragover', dragLeaveDoubleCheck);

          // Notify the local element event callback there's no event listener on the body and the next event
          // can safely be cancelled.

          doingLeaveDoubleCheck = false;

          e.dataTransfer.dropEffect = dropEffect;

          // Always cancel the dragover -- otherwise the dropEffect is not used.

          return dqUtils.stopEvent($e);
        }

        function dragLeaveForSure(apply) {
          inbound = false;
          var expression = $attrs.dqDragLeave;
          if (expression) {
            if (apply) {
              $scope.$apply(function () {
                $scope.$eval(expression);
              });
            } else {
              $scope.$eval(expression);
            }
          }
        }

        $scope.$on('$destroy', function () {
          // Just to be sure
          $body.off('dragover', dragLeaveDoubleCheck);
        });

        $scope.$on('dqDragBegin', function () {
          // Check if we should track drag movements
          trackingEnabled = dqUtils.isAreaMatch($scope);
        });

        $scope.$on('dqDragEnd', function () {
          if (trackingEnabled) {
            // Gief cake
            dragLeaveForSure(false);
          }
        });

        $element.on('dragenter', function (e) {
          if (trackingEnabled && inbound === false) {
            inbound = true;
            var expression = $attrs.dqDragEnter;
            if (expression) {
              $scope.$apply(function () {
                $scope.$eval(expression);
              });
            }
          }
        });

        $element.on('dragleave', function () {
          if (trackingEnabled && inbound === true) {

            // dragleave is a lie -- hovering child elements will cause this event to trigger also.
            // We fake the cake by tracking the drag ourself.

            // Notify the "real" dragover event that he has to play nice with the body and not to
            // cancel the event chain.

            doingLeaveDoubleCheck = true;
            $body.on('dragover', dragLeaveDoubleCheck);
          }
        });

        //noinspection FunctionWithInconsistentReturnsJS
        $element.on('dragover', function ($e) {

          if (trackingEnabled) {

            var e = dqUtils.getEvent($e);

            var expression = $attrs.dqDragOver;
            var result;

            if (expression) {
              $scope.$apply(function () {
                result = $scope.$eval(expression);
              });
            }

            // The evaluated expression can indicate to cancel the drop

            dropEffect = result === false ? 'none' : 'copy';

            if (!doingLeaveDoubleCheck) {

              // There's no dragover queued on the body.
              // The event needs to be terminated here else the dropEffect will
              // not be applied (and dropping is not allowed).

              e.dataTransfer.dropEffect = dropEffect;
              return dqUtils.stopEvent($e);
            }
          }
        });

        //noinspection FunctionWithInconsistentReturnsJS
        $element.on('drop', function($e) {

          var e = dqUtils.getEvent($e);

          if(trackingEnabled) {
            var expression = $attrs.dqDrop;

            if(expression) {
              $scope.$apply(expression);
            }
          }

          return dqUtils.stopEvent($e);
        });

        // Ensure that we only do all this magic stuff on this element for one time only.

        $element.data('dqDragTrack', true);
      }
    };

  });
