fg.directive('fgForm', function(fgFormCompileFn) {
  return {
    restrict: 'AE',
    require: ['^?form', 'fgForm', '^fgSchema'],
    controller: 'fgFormController',
    scope: true,
    compile: fgFormCompileFn
  };
}).factory('fgFormLinkFn', function() {
    return function link($scope, $element, $attrs, ctrls) {

      var ngFormCtrl = ctrls[0];
      var formCtrl = ctrls[1];
      var schemaCtrl = ctrls[2];

      var editMode = $attrs.fgNoRender === 'true';

      formCtrl.init($attrs.fgFormData, schemaCtrl, ngFormCtrl, editMode);
      
    };
}).factory('fgFormCompileFn', function(fgFormLinkFn) {
  return function($element, $attrs) {

    $element.addClass('fg-form');

    var noRender = $attrs.fgNoRender;
    
    if (noRender !== 'true') {
      var renderTemplate = '<div fg-form-fields></div>';
      $element.append(renderTemplate);
    }
    
    return fgFormLinkFn;
  };
});

