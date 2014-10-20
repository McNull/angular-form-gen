describe('fg-property-field-common', function() {

  var $scope;

  beforeEach(function() {
    module('fg');

    inject(function($rootScope) {
      $scope = $rootScope.$new();
    });
  });

  describe('when linking', function() {

    var fgPropertyFieldCommonLinkFn;

    beforeEach(function() {

      inject(function(_fgPropertyFieldCommonLinkFn_) {
        fgPropertyFieldCommonLinkFn = _fgPropertyFieldCommonLinkFn_;
      });
    });

    it('should observe and extend the fgPropertyFieldCommon attribute into the fields scope value', function() {

      // Arrange

      var $attrs = {
        fgPropertyFieldCommon: '{ fieldname: true, myOtherProp: "gedoe" }'
      };

      // Act

      fgPropertyFieldCommonLinkFn($scope, {}, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.fields).toBeDefined();
      expect($scope.fields.fieldname).toBe(true);
      expect($scope.fields.displayname).toBeFalsy();
      expect($scope.fields.placeholder).toBeFalsy();
      expect($scope.fields.myOtherProp).toBe('gedoe');
    });
  });

});