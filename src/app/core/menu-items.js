/*
 [{
 name:             name of the item.
 url:              url of the item.
 [visible]:        boolean or function which indicates if the item is visible.
 [pattern]:        regular expression used to indicate if the current item is active in the navigation bar.
 }]
 */

app.constant('appMenuItems', [{
  name: 'Home',
  url: '/'
}, {
  name: 'Demostration',
  url: '/demo'
}]);
