
// Demo module

var ngLogo = angular.module('ngLogo', []);

ngLogo.directive('ngLogo', function() {
  return {  templateUrl: 'angular-logo/angular-logo.ng.html' };
});

ngLogo.directive('ngLogoSvg', function() {
  return {
    replace: true,
    templateUrl: 'angular-logo/angular-logo.ng.svg'
  };
});
