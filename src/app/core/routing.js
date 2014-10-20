

app.route = {
  /* {
   [name]:           name of the route,
   [url]:            url to map the route to. defaults to /{{name-dash-cased}}
   [templateUrl]:    url to template. defaults to /app/{{url}}/index.html
   } */
  home: {
    url: '/',
    templateUrl: 'app/home/index.html',
    label: 'Home'
  },
  about: {
      url: '/about'
  }
};

app.config(function ($routeProvider) {

  angular.forEach(app.route, function(routes, key) {

    if(!angular.isArray(routes)) {
      routes.name = routes.name || key[0].toUpperCase() + key.slice(1);
      routes = [routes];
    }

    angular.forEach(routes, function (route) {
      if (!route.url) {

        if (!route.name) {
          throw new Error('Route is missing name and url property. ' + JSON.stringify(route))
        }

        route.url = '/' + app.utils.toDashCased(route.name);
      }

      if (!route.templateUrl) {

        var url = route.url;

        if (url[0] != '/') {
          url = url + '/';
        }

        if (url[url.length - 1] != '/') {
          url += '/';
        }

        route.templateUrl = 'app' + url + 'index.html';
      }

      $routeProvider.when(route.url, route);

    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  });
});

