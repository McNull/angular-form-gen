describe('fg-property-field-directive', function() {

  var $scope;

  beforeEach(function() {
    module('fg');

    inject(function($rootScope) {
      $scope = $rootScope.$new();
    });
  });

  describe('when linking', function() {

    var fgPropertyFieldLinkFn;

    beforeEach(function() {

      inject(function(_fgPropertyFieldLinkFn_) {
        fgPropertyFieldLinkFn = _fgPropertyFieldLinkFn_;
      });
    });

    it('should observe the fgPropertyField attribute', function() {

      // Arrange

      var myFieldName = "12345";

      var $attrs = {
        $observe: function(attribute, fn) {
          if(attribute === 'fgPropertyField') {
            fn(myFieldName);
          }
        }
      };

      // Act

      fgPropertyFieldLinkFn($scope, {}, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.fieldName).toBe(myFieldName);

    });

    it('should observe the fgPropertyFieldLabel attribute', function() {

      // Arrange

      var myFieldLabel = "12345";

      var $attrs = {
        $observe: function(attribute, fn) {
          if(attribute === 'fgPropertyFieldLabel') {
            fn(myFieldLabel);
          }
        }
      };

      // Act

      fgPropertyFieldLinkFn($scope, {}, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.fieldLabel).toBe(myFieldLabel);
      
    });
  });

});