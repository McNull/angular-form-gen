fg.directive('fgTabsPane', function(fgTabsPaneLinkFn) {
  return {
    require: ['^fgTabs'],
    restrict: 'EA',
    transclude: true,
    templateUrl: 'angular-form-gen/common/tabs/tabs-pane.ng.html',
    link: fgTabsPaneLinkFn,
    scope: true
  };
}).factory('fgTabsPaneLinkFn', function() {
  return function($scope, $element, $attrs, $ctrls) {

    $scope.tabs = $ctrls[0];

    $scope.pane = {
      title: $attrs.fgTabsPane || $attrs.title,
      order: parseInt($attrs.fgTabsPaneOrder || $attrs.order) || 10,
      autoActive: !($attrs.fgTabsPaneAutoActive === "false" || $attrs.autoActive === "false"),
      renderAlways: $attrs.fgTabsPaneRenderAlways === "true" || $attrs.renderAlways === "true"
    };

    $scope.$watch($attrs.fgTabsPaneDisabled, function(value) {
      $scope.pane.disabled = value;
    });

    $scope.tabs.add($scope.pane);
  };
});
