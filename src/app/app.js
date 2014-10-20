var app = angular.module('app',
  [
    'ngSanitize',
    'ngRoute',
    'ngLogo',
    'fg',
    'inform',
    'inform-exception',
    'inform-http-exception',
    'blockUI',
    'markdown'
  ]);

app.controller('MainCtrl', function ($scope, appMenuItems) {
  $scope.menuItems = appMenuItems;
});

app.config(function ($locationProvider) {

  $locationProvider.hashPrefix('!');

});