var app = angular.module('app',
  [
    'seo',
    'ngSanitize',
    'ngAnimate',
    'ngRoute',
    'ngLogo',
    'githubLogo',
    'fg',
    'inform',
    'inform-exception',
    'inform-http-exception',
    'blockUI'
    //'markdown'
  ]);

app.config(function(seoDefaults) {
  seoDefaults.title = 'angular-form-gen';
  seoDefaults.description = 'Dynamic form schema generator for AngularJS.';
  seoDefaults.keywords = 'angularjs, angular, form, schema, generator';
});

app.controller('MainCtrl', function ($scope, appMenuItems, seoPageState) {
  $scope.pageState = seoPageState;
  $scope.menuItems = appMenuItems;
});

//app.config(function(fgConfigProvider) {
//
//  var numberField = fgConfigProvider.fields.get('number');
//  numberField.editor = { visible: false };
//
//});
//
