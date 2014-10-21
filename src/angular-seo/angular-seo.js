var seo = angular.module('seo', []);

seo.config(function ($locationProvider) {
  $locationProvider.hashPrefix('!');
});

seo.constant('seoDefaults', {
  title: '',
  keywords: '',
  description: ''
});

seo.factory('seoPageState', function(seoDefaults) {

  var state = {};

  state._reset = function() {
    angular.extend(state, seoDefaults);
  };

  state._reset();

  return state;

});

seo.factory('seoPage', function(seoPageState, $rootScope) {

  function reset() {
    seoPageState._reset();
  }

  $rootScope.$on('$routeChangeSuccess', function() {
    reset();
  });

  return {
    reset: reset,
    title: function(value) {
      seoPageState.title = value;
    },
    keywords: function(value) {
      seoPageState.keywords = value;
    },
    description: function(value) {
      seoPageState.description = value;
    },
    addKeywords: function(value) {
      seoPageState.keywords += ', ' + value;
    }
  };
});

function stateDirective(name) {

  var directiveName = 'seoPage' + name.charAt(0).toUpperCase() + name.substring(1);

  seo.directive(directiveName, function(seoPage) {

    return {
      restrict: 'EA',
      link: function($scope, $element, $attrs) {
        $attrs.$observe(directiveName, function(value) {
          if(value) {
            seoPage[name](value);
          }
        });
      }
    };

  });
}

stateDirective('title');
stateDirective('keywords');
stateDirective('description');

seo.directive('seoPageKeywordsAdd', function(seoPage) {

  return {
    restrict: 'EA',
    link: function($scope, $element, $attrs) {
      $attrs.$observe('seoPageKeywordsAdd', function(value) {
        if(value) {
          seoPage.addKeywords(value);
        }
      });
    }
  };

});