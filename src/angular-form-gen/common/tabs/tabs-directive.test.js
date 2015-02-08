describe('fg-tabs-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('fg');

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
    });

  });

  describe('scope properties', function() {

    it('child tabs should have access to the tabs controller', function() {

      // The pane content should have access to the tabs controller via scope property binding

      var template = '<div fg-tabs="my.tabs"><div fg-tabs-pane><p>My Content</p></div></div>';

      var $element = angular.element(template);

      $element = $compile($element)($scope);
      $scope.$digest();

      var paneScope = $element.find('.fg-tabs-pane').scope();

      expect(paneScope.my.tabs).toBeDefined();

    });
    
    it('active item should be in sync with controller property', function() {

      var template = '<div fg-tabs="tabs.ctrl" fg-tabs-active="tabs.active"><div fg-tabs-pane="tab1"></div><div fg-tabs-pane="tab2"></div></div>';

      var $element = angular.element(template);

      $element = $compile($element)($scope);
      $scope.$digest();

      expect($scope.tabs.ctrl).toBeDefined();
      expect($scope.tabs.active).toBeDefined();
      expect($scope.tabs.active.title).toBe("tab1");
      
      $scope.tabs.ctrl.activate(1);
      $scope.$digest();
      
      expect($scope.tabs.active.title).toBe("tab2");
    });

    
    it('active index should be in sync with controller property', function() {

      var template = '<div fg-tabs="tabs.ctrl" fg-tabs-active-index="tabs.activeIndex"><div fg-tabs-pane="tab1"></div><div fg-tabs-pane="tab2"></div></div>';

      var $element = angular.element(template);

      $element = $compile($element)($scope);
      $scope.$digest();

      expect($scope.tabs.ctrl).toBeDefined();
      expect($scope.tabs.activeIndex).toBeDefined();
      expect($scope.tabs.activeIndex).toBe(0);
      
      $scope.tabs.ctrl.activate(1);
      $scope.$digest();
      
      expect($scope.tabs.activeIndex).toBe(1);
    });

  });

  it('should compile template', function() {

    // Arrange

    var $element = angular.element('<div fg-tabs></div>');

    // Act

    $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($element.find('.fg-tabs').length).toBe(1);
  });

  describe('tab pane headers', function() {

    it('should add pane titles in headers', function() {
      // Arrange

      var $element = angular.element(
        '<div fg-tabs>' +
          '<div fg-tabs-pane="myFirstPane"></div>' +
          '<div fg-tabs-pane="mySecondPane"></div>' +
        '</div>'
      );

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $li = $element.find('li');

      // Assert

      expect($li.length).toBe(2);
      expect($.trim($($li[0]).text())).toBe('myFirstPane');
      expect($.trim($($li[1]).text())).toBe('mySecondPane');
    });

    it('should add pane titles in headers', function() {
      // Arrange

      var $element = angular.element(
        '<div fg-tabs>' +
          '<div fg-tabs-pane="myFirstPane"></div>' +
          '<div fg-tabs-pane="mySecondPane"></div>' +
        '</div>'
      );

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $li = $element.find('li');

      // Assert

      expect($li.length).toBe(2);
      expect($.trim($($li[0]).text())).toBe('myFirstPane');
      expect($.trim($($li[1]).text())).toBe('mySecondPane');
    });

    it('should set pane active on click', function() {
      // Arrange

      var $element = angular.element(
        '<div fg-tabs fg-tabs-active-index="activeIndex">' +
          '<div fg-tabs-pane="myFirstPane"></div>' +
          '<div fg-tabs-pane="mySecondPane"></div>' +
        '</div>'
      );

      $compile($element)($scope);
      $scope.$digest();

      var $liFirst = $element.find('li:eq(0)');
      var $liSecond = $element.find('li:eq(1)');

      // Act

      $liSecond.find('a').click();
      // $scope.$digest(); // No digest needed?

      // Assert

      expect($liFirst.hasClass('active')).toBeFalsy();
      expect($liSecond.hasClass('active')).toBeTruthy();
      expect($scope.activeIndex).toBe(1);
    });

  }); // tab pane headers

});