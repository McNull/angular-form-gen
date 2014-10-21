//fg.directive('fgFieldFocus', function($parse) {
//  return {
//    require: ['?^fgForm'],
//    link: function($scope, $element, $attrs, ctrls) {
//
//      var formCtrl = ctrls[0];
//
//      // if(formCtrl && formCtrl.editMode) {
//      //   return;
//      // }
//
//      var e = $element[0];
//
//      var getModel = $parse($attrs.fgFieldFocus);
//      var setModel = getModel.assign;
//
//      $scope.$watch(getModel, function(value) {
//
//        if (value) {
//          if(formCtrl) {
//            formCtrl.clearFocusOnFields();
//            setModel($scope, true);
//
//            if(formCtrl.editMode) {
//              return;
//            }
//          }
//
//          e.focus();
//
//        } else if(formCtrl && !formCtrl.editMode) {
//
//          e.blur();
//
//        }
//      });
//
//      // function onBlur() {
//      //   // if(getModel($scope) !== undefined) {
//      //   //   $timeout(function() {
//      //   //     setModel($scope, false);
//      //   //   });
//      //   // }
//      // }
//
//      // function onFocus() {
//      //   $timeout(function() {
//      //     setModel($scope, true);
//      //   });
//      // }
//
//      // $element.on('focus', onFocus);
//      // $element.on('blur', onBlur);
//
//      // $scope.$on('$destroy', function() {
//      //   $element.off('focus', onFocus);
//      //   $element.off('blur', onBlur);
//      // });
//    }
//  };
//});
