
var myApp = angular.module('myApp', ['fg', 'ngSanitize', 'markdown']);

myApp.controller('MyController', function($scope) {
  $scope.myForm = {};
});