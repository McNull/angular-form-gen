
describe('app.utils', function() {

  var app;

  beforeEach(module('app'));

  beforeEach(function() {

    app = angular.module('app');

  });

  describe('toDashCased', function() {

    it('should convert camel to dash cased', function() {

      var input = "camelCasedText";
      var expected = "camel-cased-text";

      var output = app.utils.toDashCased(input);

      expect(output).toBe(expected);

    });

    it('should convert pascal to dash cased', function() {

      var input = "PascalCasedText";
      var expected = "pascal-cased-text";

      var output = app.utils.toDashCased(input);

      expect(output).toBe(expected);

    });

    it('should convert space to dash cased', function() {

      var input = "spaced text here";
      var expected = "spaced-text-here";

      var output = app.utils.toDashCased(input);

      expect(output).toBe(expected);

    });

  });

});
