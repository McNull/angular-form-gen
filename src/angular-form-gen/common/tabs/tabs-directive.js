fg.directive('fgTabs', function() {
  return {
    require: ['fgTabs'],
    restrict: 'EA',
    transclude: true,
    controller: 'fgTabsController',
    templateUrl: 'angular-form-gen/common/tabs/tabs.ng.html',
    scope: {
      'tabs': '=?fgTabs',
      'active': '=?fgTabsActive',
      'activeIndex': '=?fgTabsActiveIndex'
    },
    link: function($scope, $element, $attrs, $ctrls) {
      $scope.tabs = $ctrls[0];
      
      $scope.$watch('activeIndex', function(value) {
        if(value !== undefined && $scope.tabs.activeIndex !== value) {
          $scope.tabs.activate(value);
        }
      });
    }
  };
});



