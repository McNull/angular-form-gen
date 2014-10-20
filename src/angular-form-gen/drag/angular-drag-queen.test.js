describe('angular-drag-queen', function() {

  return;

  beforeEach(function() {
    module('dq');
  });

  describe('dqUtils factory', function() {

    var dqUtils, $window = {};

    beforeEach(function() {

      module(function($provide) {
        $provide.value('$window', $window);
      });

      inject(function(_dqUtils_) {
        dqUtils = _dqUtils_;
      });
    });

    describe('getEvent', function() {

      it('should return the provided event item', function() {

        // Arrange

        var event = {};

        // Act

        var result = dqUtils.getEvent(event);

        // Assert

        expect(result).toBeDefined();
        expect(result).toBe(event);

      });

      it('should return the original event item from jquery event', function() {

        // Arrange

        var event = { originalEvent: {} };

        // Act

        var result = dqUtils.getEvent(event);

        // Assert

        expect(result).toBeDefined();
        expect(result).toBe(event.originalEvent);
      });

      it('should return the IE event item from window object', function() {

        // Arrange

        var event = {};
        $window.event = event;

        // Act

        var result = dqUtils.getEvent(undefined);

        // Assert

        expect(result).toBeDefined();
        expect(result).toBe(event);
        expect(result).toBe($window.event);
      });
    });

    describe('stopEvent', function() {

      it('should set IE8 cancelBubble to true', function() {

        // Arrange

        var event = {};

        // Act

        var returnValue = dqUtils.stopEvent(event);

        // Assert

        expect(event.cancelBubble).toBe(true);
        expect(returnValue).toBe(false);
      });

      it('should call stopPropagation', function() {

        // Arrange

        var event = { stopPropagation: angular.noop };
        spyOn(event, 'stopPropagation');

        // Act

        var returnValue = dqUtils.stopEvent(event);

        // Assert

        expect(event.stopPropagation).toHaveBeenCalled();
        expect(returnValue).toBe(false);
      });

      it('should call preventDefault', function() {

        // Arrange

        var event = { preventDefault: angular.noop };
        spyOn(event, 'preventDefault');

        // Act

        var returnValue = dqUtils.stopEvent(event);

        // Assert

        expect(event.preventDefault).toHaveBeenCalled();
        expect(returnValue).toBe(false);
      });
    });
  });
});

