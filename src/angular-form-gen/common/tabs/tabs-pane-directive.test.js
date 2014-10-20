describe('fg-tabs-pane-directive', function() {

  var linkFn, $scope, tabsCtrl, paneCtrl, ctrls, $element, $attrs, $compile;

  beforeEach(function() {
    module('fg');

    $attrs = {
      $observe: angular.noop
    };

    tabsCtrl = {
      add: angular.noop
    };

    paneCtrl = {};

    ctrls = [tabsCtrl];

    inject(function(_fgTabsPaneLinkFn_, $rootScope, _$compile_) {
      linkFn = _fgTabsPaneLinkFn_;
      $compile = _$compile_;
      $scope = $rootScope.$new();
    });
  });


  describe('when linking the directive', function() {

    it('should create a pane property on the scope', function() {

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane).toBeDefined();

    });

    it('should add a default order value to the pane', function() {

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.order).toBeDefined();
      expect($scope.pane.order).toBe(10);

    });

    it('should add a the provided order value to the pane', function() {

      // Arrange

      $attrs.fgTabsPaneOrder = "100";

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.order).toBeDefined();
      expect($scope.pane.order).toBe(100);

    });

    it('should add auto activate property', function() {

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.autoActive).toBeDefined();
      expect($scope.pane.autoActive).toBe(true);

    });

    it('should add provided auto activate property value', function() {

      // Arrange

      $attrs.fgTabsPaneAutoActive = "false";
      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.autoActive).toBeDefined();
      expect($scope.pane.autoActive).toBe(false);

    });


    it('should add auto renderAlways property', function() {

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.renderAlways).toBeDefined();
      expect($scope.pane.renderAlways).toBe(false);

    });


    it('should set provided renderAlways property value', function() {

      // Arrange

      $attrs.fgTabsPaneRenderAlways = "true";
      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.renderAlways).toBeDefined();
      expect($scope.pane.renderAlways).toBe(true);

    });

    it('should add the pane to the tabs controller', function() {

      // Arrange

      tabsCtrl.add = jasmine.createSpy('addPane');

      // Act

      linkFn($scope, $element, $attrs, ctrls);

      // Assert

      expect(tabsCtrl.add).toHaveBeenCalledWith($scope.pane);

    });


    it('should assign the title to the pane', function() {

      // Arrange

      var title = 'myTitle';
      $attrs.fgTabsPane = title;

      // Act


      linkFn($scope, $element, $attrs, ctrls);

      // Assert

      expect($scope.pane.title).toBe(title);

    });

  }); // when linking the attribute

  describe('when compiling the template', function() {

    it('should compile', function() {

      // Arrange

      var $fixture = angular.element('<div></div>');
      $fixture.data('$fgTabsController', tabsCtrl);

      $fixture.append('<div fg-tabs-pane="myPane"></div>');

      // Act

      $compile($fixture)($scope);
      $scope.$digest();

      // Assert

      expect($fixture.find('.fg-tabs-pane').length).toBe(1);

    });

    it('should only be visible when active', function() {

      // Arrange

      var $fixture = angular.element('<div></div>');
      $fixture.data('$fgTabsController', tabsCtrl);

      $fixture.append('<div fg-tabs-pane="myPane"></div>');

      $compile($fixture)($scope);
      $scope.$digest();

      var $pane = $fixture.find('.fg-tabs-pane');
//      var paneCtrl = $pane.controller('fgTabsPane');

      // Act

      tabsCtrl.active = null;
      $scope.$digest();

      var whenNotActive = $pane.hasClass('ng-hide');

      tabsCtrl.active = $pane.scope().pane;
      $scope.$digest();

      // console.log($fixture[0].outerHTML);

      var whenActive = $pane.hasClass('ng-hide')

      // Assert

      expect(whenNotActive).toBe(true); // has class ng-hide
      expect(whenActive).toBe(false);   // does not have class ng-hide

    });

    it('should only render when active', function() {

      // Arrange

      var template =
        '<div fg-tabs="tabs">' +
          '<div fg-tabs-pane="Should be rendered">Tab 1</div>' +
          '<div fg-tabs-pane="Should NOT be rendered">Tab 2</div>' +
        '</div>';

      var $element = $compile(template)($scope);
      $scope.$digest();

      var tabsCtrl = $scope.tabs;

      // Act

      tabsCtrl.activate(tabsCtrl.items[0]);
      $scope.$digest();

      var result1 = {
        tab1: $element.text().indexOf('Tab 1'),
        tab2: $element.text().indexOf('Tab 2')
      };

      tabsCtrl.activate(tabsCtrl.items[1]);
      $scope.$digest();

      var result2 = {
        tab1: $element.text().indexOf('Tab 1'),
        tab2: $element.text().indexOf('Tab 2')
      };


      // Assert

      expect(result1.tab1).not.toBe(-1);
      expect(result1.tab2).toBe(-1);

      expect(result2.tab1).toBe(-1);
      expect(result2.tab2).not.toBe(-1);

    });

    it('should only always render when forced', function() {

      // Arrange

      var template =
        '<div fg-tabs="tabs">' +
        '<div fg-tabs-pane="Should be rendered">Tab 1</div>' +
        '<div fg-tabs-pane="Should always be rendered" data-render-always="true">Tab 2</div>' +
        '</div>';

      var $element = $compile(template)($scope);
      $scope.$digest();

      var tabsCtrl = $scope.tabs;

      // Act

      tabsCtrl.activate(tabsCtrl.items[0]);
      $scope.$digest();

      var result1 = {
        tab1: $element.text().indexOf('Tab 1'),
        tab2: $element.text().indexOf('Tab 2')
      };

      tabsCtrl.activate(tabsCtrl.items[1]);
      $scope.$digest();

      var result2 = {
        tab1: $element.text().indexOf('Tab 1'),
        tab2: $element.text().indexOf('Tab 2')
      };


      // Assert

      expect(result1.tab1).not.toBe(-1);
      expect(result1.tab2).not.toBe(-1);

      expect(result2.tab1).toBe(-1);
      expect(result2.tab2).not.toBe(-1);

    });

  });


});