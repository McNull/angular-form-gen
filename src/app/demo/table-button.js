app.directive('appTableButton', function() {

  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {

      var icon = '<span class="glyphicon glyphicon-' + $attrs.appTableButton + '"></span>';
      var text = '<span class="hidden-xs hidden-sm">&nbsp;' + $element.text() + '</span>';

      $element.attr('type', 'button');

      if(!$element.hasClass('btn')) {
        $element.addClass('btn btn-default');
      }

      $element.html(icon + text);
    }
  }
});
