fg.directive('fgTabs', function() {
  return {
    require: ['fgTabs'],
    restrict: 'EA',
    transclude: true,
    controller: 'fgTabsController',
    templateUrl: 'angular-form-gen/common/tabs/tabs.ng.html',
    scope: {
      'tabs': '=?fgTabs'
    },
    link: function($scope, $element, $attrs, $ctrls) {
      $scope.tabs = $ctrls[0];
    }
  };
});



