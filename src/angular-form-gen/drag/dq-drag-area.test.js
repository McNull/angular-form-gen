

describe('angular-drag-queen', function () {

  return;

  beforeEach(function () {
    module('dq');
  });

  describe('nq-drag-area directive', function () {

    var $compile, $scope, $rootScope;

    beforeEach(function () {
      inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
      })
    });

    describe("dq-drag-progress-begin attribute", function () {

      it('should evaluate expression on drag begin event', function() {

        // Arrange

        $scope.progressBegin = jasmine.createSpy('progressBegin');

        var eventArgs = {};

        var template = '<div dq-drag-area dq-drag-progress-begin="progressBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        // Act

        $rootScope.$broadcast('dqDragBegin', eventArgs);

        // Assert

        expect($scope.progressBegin).toHaveBeenCalled();
      });

      it('should not evaluate expression on area name mismatch in event args', function() {

        // Arrange

        $scope.progressBegin = jasmine.createSpy('progressBegin');

        var eventArgs = { area: "myArea" };

        var template = '<div dq-drag-area dq-drag-progress-begin="progressBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        // Act

        $rootScope.$broadcast('dqDragBegin', eventArgs);

        // Assert

        expect($scope.progressBegin).not.toHaveBeenCalled();
      });

      it('should not evaluate expression on area name mismatch in attribute', function() {

        // Arrange

        $scope.progressBegin = jasmine.createSpy('progressBegin');

        var eventArgs = { area: undefined };

        var template = '<div dq-drag-area="myArea" dq-drag-progress-begin="progressBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        // Act

        $rootScope.$broadcast('dqDragBegin', eventArgs);

        // Assert

        expect($scope.progressBegin).not.toHaveBeenCalled();
      });

      it('should not evaluate expression on area name mismatch in both', function() {

        // Arrange

        $scope.progressBegin = jasmine.createSpy('progressBegin');

        var eventArgs = { area: "something else" };

        var template = '<div dq-drag-area="myArea" dq-drag-progress-begin="progressBegin()"></div>';
        var $element = $(template);
        $compile($element)($scope);

        // Act

        $rootScope.$broadcast('dqDragBegin', eventArgs);

        // Assert

        expect($scope.progressBegin).not.toHaveBeenCalled();
      });

    });

  });
});
