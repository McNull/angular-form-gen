describe('options-directive', function() {

  var $scope;

  beforeEach(function() {

    module('fg');

    inject(function($rootScope) {
      $scope = $rootScope.$new();
    });

  });

  describe('when linking', function() {

    var linkFn;

    beforeEach(function() {

      inject(function(fgPropertyFieldOptionsLinkFn) {
        linkFn = fgPropertyFieldOptionsLinkFn;
      });

    });

    xit('should observe main attribute for field object', function() {

      // Arrange

      $scope.myField = {};

      var $attrs = {
        fgPropertyFieldOptionsLinkFn: 'myField'
      };

      // Act

      linkFn($scope, null, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.field).toBe($scope.myField);

    });

  });

});