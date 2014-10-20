app.factory('FormData', function (fakeHttpResolve, dataEntries) {

  var idCounter = 0;

  function query(params) {
    var result = app.utils.where(dataEntries, function (x) {
      return x.formId == params.id;
    });

    return fakeHttpResolve(result);
  }

  function remove(params) {
    var idx = app.utils.indexOfMatch(dataEntries, function (x) {
      return x.id === params.id;
    });

    if (idx !== -1) {
      dataEntries.splice(idx, 1);
      return fakeHttpResolve();
    } else {
      throw new Error('Form not found');
    }
  }

  function save(params) {
    var idx = app.utils.indexOfMatch(dataEntries, function (x) {
      return x.id === params.id;
    });

    if (idx !== -1) {
      dataEntries.splice(idx, 1, params);
    } else {
      params.id = ++idCounter;
      dataEntries.push(params);
    }

    return fakeHttpResolve(params);
  }

  function get(params) {

    var ret = app.utils.singleOrDefault(dataEntries, function (x) {
      return x.id == params.dataId;
    });

    if (!ret) {
      throw new Error('Not found');
    } else {
      return fakeHttpResolve(ret);
    }
  }

  return {
    query: query,
    save: save,
    remove: remove,
    get: get
  };

});

app.factory('dataEntries', function (formData) {

  var dataEntries = [];

  function seed(formName, countOrArray, seedFunc) {

    // seedFunc(form, indexOrArrayItem)

    var form = app.utils.singleOrDefault(formData, function (x) {
      return x.name == formName;
    });

    if (form) {
      if (angular.isArray(countOrArray)) {
        angular.forEach(countOrArray, function (x) {
          x.formId = form.id;
          if (seedFunc) {
            seedFunc(form, x);
          }
          dataEntries.push(x);
        });

      } else {
        while (countOrArray--) {
          var ret = seedFunc(form, countOrArray);
          ret.formId = form.id;
          dataEntries.push(ret);
        }
      }
    }
  }

  seed('Textbox Validation', 5, function () {
    return {
      "pattern": "test 123",
      "required": "I'm required",
      "minLength": "55555",
      "maxLength": "666666"
    };
  });

  seed('People', [
    {"firstName": "Paula", "lastName": "Ray", "email": "pray0@nifty.com", "country": "Azerbaijan", "ipAddress": "27.44.68.152"},
    {"firstName": "Emily", "lastName": "Alvarez", "email": "ealvarez1@imgur.com", "country": "Uganda", "ipAddress": "181.58.156.227"},
    {"firstName": "Ann", "lastName": "Flores", "email": "aflores2@patch.com", "country": "Belgium", "ipAddress": "246.178.125.201"},
    {"firstName": "Anthony", "lastName": "Hernandez", "email": "ahernandez3@shareasale.com", "country": "Nigeria", "ipAddress": "51.208.181.207"},
    {"firstName": "Gerald", "lastName": "Knight", "email": "gknight4@rambler.ru", "country": "Cameroon", "ipAddress": "139.220.61.6"},
    {"firstName": "Justin", "lastName": "Reed", "email": "jreed5@theglobeandmail.com", "country": "United States", "ipAddress": "94.200.119.122"},
    {"firstName": "Gary", "lastName": "Harris", "email": "gharris6@gmpg.org", "country": "Kazakhstan", "ipAddress": "60.143.78.167"},
    {"firstName": "Jeffrey", "lastName": "Holmes", "email": "jholmes7@issuu.com", "country": "Italy", "ipAddress": "116.19.76.199"},
    {"firstName": "Linda", "lastName": "Young", "email": "lyoung8@yahoo.co.jp", "country": "United States", "ipAddress": "57.175.61.242"},
    {"firstName": "Steve", "lastName": "Daniels", "email": "sdaniels9@stumbleupon.com", "country": "South Korea", "ipAddress": "215.215.31.78"}
  ]);

  (function () {
    var i = 0;
    angular.forEach(dataEntries, function (e) {
      e.id = ++i;
    });
  })();

  return dataEntries;
});