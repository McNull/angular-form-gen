describe('fg-tabs-controller', function () {

  var $controller, $scope;

  beforeEach(function () {

    module('fg');

    inject(function (_$controller_, _$rootScope_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();

    });

  });

  it('should construct controller', function () {

    var result = $controller('fgTabsController', {
      $scope: $scope
    });

    expect(result).toBeDefined();

  });

  describe('when activating panes', function () {

    it('should set the active property to the pane', function () {

      // Arrange

      var controller = $controller('fgTabsController', {
        $scope: $scope
      });

      var pane1 = {},
        pane2 = {};

      controller.add(pane1);
      controller.add(pane2);

      // Act

      controller.activate(pane2);

      // Assert

      expect(controller.active).toBe(pane2);
    });

    it('should not activate a disabled pane', function () {

      // Arrange

      var controller = $controller('fgTabsController', {
        $scope: $scope
      });

      var pane1 = {},
        pane2 = {
          disabled: true
        };

      controller.add(pane1);
      controller.add(pane2);

      controller.activate(pane1);

      // Act

      controller.activate(pane2);

      // Assert

      expect(controller.active).toBe(pane1);

    });

    describe('active index property', function () {
      
      it('should set the active index property', function () {

        // Arrange

        var controller = $controller('fgTabsController', {
          $scope: $scope
        });

        var pane1 = {},
          pane2 = {};

        controller.add(pane1);
        controller.add(pane2);

        // Act

        controller.activate(pane2);

        // Assert

        expect(controller.activeIndex).toBe(1);
      });
      
      it('should set activate the pane by index', function () {

        // Arrange

        var controller = $controller('fgTabsController', {
          $scope: $scope
        });

        var pane1 = {},
          pane2 = {};

        controller.add(pane1);
        controller.add(pane2);

        // Act

        controller.activate(1);

        // Assert

        expect(controller.active).toBe(pane2);
      });
      
      
    });
  });

  describe('when adding panes', function () {

    it('should add pane to collection', function () {

      // Arrange

      var controller = $controller('fgTabsController', {
        $scope: $scope
      });

      var pane1 = {},
        pane2 = {};

      // Act

      controller.add(pane1);
      controller.add(pane2);

      // Assert

      expect(controller.items.length).toBe(2);
      expect(controller.items[0]).toBe(pane1);
      expect(controller.items[1]).toBe(pane2);

    });

    it('should set the first pane active', function () {

      // Arrange

      var controller = $controller('fgTabsController', {
        $scope: $scope
      });

      var pane1 = {},
        pane2 = {};

      // Act

      controller.add(pane1);
      controller.add(pane2);

      // Assert

      expect(controller.items[0]).toBe(controller.active);

    });

    it('should NOT set the first pane active if auto activate is false', function () {

      // Arrange

      var controller = $controller('fgTabsController', {
        $scope: $scope
      });

      var pane1 = {
          autoActive: false
        },
        pane2 = {};

      // Act

      controller.add(pane1);
      controller.add(pane2);

      // Assert

      expect(controller.active).toBe(pane2);

    });

    it('should order the panes', function () {

      // Arrange

      var controller = $controller('fgTabsController', {
        $scope: $scope
      });

      var pane1 = {
          order: 10
        },
        pane2 = {
          order: 100
        },
        pane3 = {
          order: 1
        };

      // Act

      controller.add(pane1);
      controller.add(pane2);
      controller.add(pane3);

      // Assert

      expect(controller.items[0]).toBe(pane3); // Lowest order value 1
      expect(controller.items[1]).toBe(pane1); // Medium order value 10
      expect(controller.items[2]).toBe(pane2); // Highest order value 100

    });

  });

});