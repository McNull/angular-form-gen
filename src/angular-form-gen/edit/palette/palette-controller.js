fg.controller('fgEditPaletteController', function ($scope, fgConfig) {

  $scope.templates = [];
  
  var tmpls = fgConfig.fields.templates;
  var i = tmpls.length;
  
  while(i--) {
    var tmpl = tmpls[i];
    
    if(tmpl.editor && tmpl.editor.visible == false) {
      continue;
    }
    
    $scope.templates.unshift(angular.copy(tmpl));
  }
  
  $scope.templateFilter = function (template) {
    return !$scope.selectedCategory || $scope.selectedCategory[template.type];
  };
  
});