
(function(app) {

  app.utils = {
    toDashCased: function (str) {
      return str.replace(/([a-z])([A-Z])/g, "$1-$2").split(' ').join('-').toLowerCase();
    },
    indexOf: function(arr, obj) {

      var predicate = function(x) {
        return x === obj;
      };

      return app.utils.indexOfMatch(arr, predicate);

    },
    indexOfMatch: function(arr, predicate) {
      var i = arr.length;

      while(i--) {
        if(predicate(arr[i])) {
          return i;
        }
      }

      return -1;
    },
    singleOrDefault: function(arr, predicate) {
      var idx = app.utils.indexOfMatch(arr, predicate);
      return idx === -1 ? null : arr[idx];
    },
    where: function(arr, predicate) {

      var res = [];

      var i = arr.length;

      while(i--) {
        var item = arr[i];

        if(predicate(item)) {
          res.push(item);
        }
      }

      return res;
    }
  };
})(app);

app.factory('fakeHttpResolve', function($q, $timeout, blockUI) {

  var fakeWaitTime = 500;

  function fakeHttpResolve(data) {
    var defer = $q.defer();

    blockUI.start();

    $timeout(function () {

      blockUI.stop();
      defer.resolve(data ? angular.copy(data) : undefined);

    }, fakeWaitTime);

    return defer.promise;
  }

  return fakeHttpResolve;
});
