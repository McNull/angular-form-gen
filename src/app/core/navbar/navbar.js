/*

 The app-navbar directive accepts an array of navitems:

 [{
 name:             name of the item.
 url:              url of the item.
 [visible]:        boolean or function which indicates if the item is visible.
 [pattern]:        regular expression used to indicate if the current item is active in the navigation bar.
 }]

 */

app.directive('appNavbar', function (appNavbarLinkFn) {
  return {
    scope: {
      items: '='
    },
    templateUrl: 'app/core/navbar/navbar.ng.html',
    link: appNavbarLinkFn
  };
});

app.factory('appNavbarLinkFn', function ($location, $timeout) {

  function appNavbarLinkFn($scope) {

    $scope.collapsed = true;

    $scope.toggleCollapsed = function () {
      $scope.collapsed = !$scope.collapsed;
    };

    $scope.collapse = function () {

      // The timeout is to ensure that any click event is handled.

      $timeout(function () {
        $scope.collapsed = true;
      }, 200);
    };

    // - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    $scope.isVisible = function (item) {
      if (item.visible !== undefined) {
        if (angular.isFunction(item.visible)) {
          return item.visible(item) == true;
        } else {
          return item.visible;
        }
      }

      return true;
    };

    // - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function setActive(url) {
      if($scope.items) {
        for (var i = 0; i < $scope.items.length; i++) {

          var navItem = $scope.items[i];
          var regexp = navItem.$_regexp;

          if (!regexp) {
            var pattern = navItem.pattern;

            if (!pattern) {
              pattern = navItem.url || '/';
              pattern = pattern.replace(/^#/, '');
              pattern = '^' + pattern;

              if(pattern == '^/') {
                pattern += '$';
              }
            }

            regexp = new RegExp(pattern, 'i');
            navItem.$_regexp = regexp;
          }

          navItem.$_active = regexp.test(url);
        }
      }
    }

    $scope.$watch(function () {
      return $location.path();
    }, setActive);

    // - - 8-< - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }

  return appNavbarLinkFn;

});
