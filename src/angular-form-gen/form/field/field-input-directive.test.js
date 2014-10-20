describe('fg-input-directive', function() {

  var fgFieldInputLinkFn, $scope, fieldCtrl = {}, modelCtrl = {};

  beforeEach(function() {

    module('fg');

    inject(function(_fgFieldInputLinkFn_, _$rootScope_){
      fgFieldInputLinkFn = _fgFieldInputLinkFn_;
      $scope = _$rootScope_.$new;
    });

  });

  it('should register the state on the field controller', function() {

    // Arrange 

    fieldCtrl.setFieldState = jasmine.createSpy('setFieldState');
    
    var ctrls = [
      fieldCtrl, modelCtrl
    ];

    // Act

    fgFieldInputLinkFn($scope, null, null, ctrls);

    // Assert

    expect(fieldCtrl.setFieldState).toHaveBeenCalledWith(modelCtrl);
  });

});