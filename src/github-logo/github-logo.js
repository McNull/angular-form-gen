
var githubLogo = angular.module('githubLogo', []);

githubLogo.directive('githubIcon', function() {
  return {
    template: '<div class="github-icon"><span github-icon-svg></span></div>'
  };
});

githubLogo.directive('githubIconSvg', function() {
  return {
    replace: true,
    templateUrl: 'github-logo/github-icon-small.ng.svg'
  };
});

githubLogo.directive('githubLogo', function() {
  return {
    template: '<div class="github-logo"><span github-logo-svg></span></div>'
  };
});

githubLogo.directive('githubLogoSvg', function() {
  return {
    replace: true,
    templateUrl: 'github-logo/github-logo.ng.svg'
  };
});
