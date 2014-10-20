describe('angular-drag-queen', function () {

  return;
  
  beforeEach(function () {
    module('dq');
  });

  describe('nq-draggable directive', function () {

    var $compile, $scope, $rootScope, dqUtils;

    beforeEach(function () {
      inject(function (_$compile_, _$rootScope_, _dqUtils_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        dqUtils = _dqUtils_;
      })
    });

    it('should set the draggable attribute to true', function () {

      // Arrange

      var template = "<div dq-draggable></div>";
      var $element = $(template);

      // Act

      $compile($element)($scope);
      var result = $element.attr('draggable');

      // Assert

      expect(result).toBeDefined();
      expect(result).toBe('true');
    });


    describe('dragstart event', function () {

      var dataTransfer = {
        effectAllowed: '',
        setData: angular.noop
      };

      it('should set the DTO Text value to the target areaname', function () {

        // Arrange

        spyOn(dataTransfer, 'setData');

        var event = $.Event('dragstart', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable="myTargetArea" dq-drag-begin="dragBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        // Act

        $element.trigger(event);

        // Assert

        expect(dataTransfer.setData).toHaveBeenCalledWith('Text', "myTargetArea");
      });

      it('should evaluate the drag begin', function () {

        // Arrange

        $scope.dragBegin = jasmine.createSpy('dragBegin');

        var event = $.Event('dragstart', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable dq-drag-begin="dragBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        // Act

        $element.trigger(event);

        // Assert

        expect($scope.dragBegin).toHaveBeenCalled();
      });

      it('should broadcast the drag begin', function () {

        // Arrange

        var event = $.Event('dragstart', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable></div>';
        var $element = $(template);
        $compile($element)($scope);

        spyOn($rootScope, '$broadcast');

        // Act

        $element.trigger(event);

        // Assert

        expect($rootScope.$broadcast).toHaveBeenCalled();
      });

      it('should broadcast the drag begin with correct arguments', function () {

        // Arrange

        var data = {
          prop: '123'
        };

        $scope.dragBegin = function() { return data; };

        var event = $.Event('dragstart', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable="myTargetArea" dq-drag-begin="dragBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        spyOn($rootScope, '$broadcast');

        // Act

        $element.trigger(event);

        // Assert

        expect($rootScope.$broadcast).toHaveBeenCalledWith('dqDragBegin', { area: "myTargetArea", data: data });
      });

      it('should store the drag data in the dqUtils', function () {

        // Arrange

        var data = {
          prop: '123'
        };

        $scope.dragBegin = function() { return data; };

        var event = $.Event('dragstart', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable="myTargetArea" dq-drag-begin="dragBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        spyOn(dqUtils, 'dragData');

        // Act

        $element.trigger(event);

        // Assert

        expect(dqUtils.dragData).toHaveBeenCalledWith({ area: "myTargetArea", data: data });
      });
    });

    describe('dragend event', function () {

      var dataTransfer = {
        effectAllowed: '',
        setData: angular.noop
      };

      it('should evaluate the drag end', function () {

        // Arrange

        $scope.dragEnd = jasmine.createSpy('dragEnd');

        var event = $.Event('dragend', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable dq-drag-end="dragEnd()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        // Act

        $element.trigger(event);

        // Assert

        expect($scope.dragEnd).toHaveBeenCalled();
      });

      it('should broadcast the drag end', function () {

        // Arrange

        var event = $.Event('dragend', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable></div>';
        var $element = $(template);
        $compile($element)($scope);

        spyOn($rootScope, '$broadcast');

        // Act

        $element.trigger(event);

        // Assert

        expect($rootScope.$broadcast).toHaveBeenCalled();
      });

      it('should broadcast the drag end with correct arguments', function () {

        // Arrange

        var data = {
          prop: '123'
        };

        $scope.dragEnd = function() { return data; };

        var event = $.Event('dragend', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable="myTargetArea" dq-drag-end="dragEnd()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        spyOn($rootScope, '$broadcast');

        // Act

        $element.trigger(event);

        // Assert

        expect($rootScope.$broadcast).toHaveBeenCalledWith('dqDragEnd', { area: "myTargetArea", data: data });
      });

      it('should clear the dragData', function () {

        // Arrange

        var event = $.Event('dragend', { dataTransfer: dataTransfer });

        var template = '<div dq-draggable="myTargetArea" dq-drag-end="dragEnd()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        spyOn(dqUtils, 'dragData');

        // Act

        $element.trigger(event);

        // Assert

        expect(dqUtils.dragData).toHaveBeenCalledWith(null);
      });
    });
  });
});
