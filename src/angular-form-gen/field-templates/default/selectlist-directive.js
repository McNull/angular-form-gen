fg.directive('fgSelectlist', function($timeout) {

  // Angular adds a '? undefined:undefined ?' option dom element if it cannot find a matching model value in the
  // options list. Somehow this also happens if the value is in the option list. This directive simply removes
  // the invalid option from the dom.

  // https://github.com/angular/angular.js/issues/1019
  // http://stackoverflow.com/questions/12654631/why-does-angularjs-include-an-empty-option-in-select

  return {
    priority: 1000,
    link: function($scope, $element) {

      // Ensure that the ng-repeat has finished by suspending the remove.

      $timeout(function() {

        var $options = $element.find('option');
        var i = $options.length;

        while(--i >= 0) {
          var $option = angular.element($options[i]);
          if($option.val() == '? undefined:undefined ?') {
            $option.remove();
            break;
          }
        }
      }, 0);
    }
  }
});
