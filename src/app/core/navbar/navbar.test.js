describe('mindef-navbar-directive', function () {

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  beforeEach(module('mindef'));

  var $rootScope, $scope, $timeout, locationMock = {
    path: function (v) {

      if (v !== undefined) {
        locationMock._path = v;
      }

      return locationMock._path;
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  beforeEach(function () {

    module(function ($provide) {
      $provide.value('$location', locationMock);
    });

    inject(function (_$rootScope_, _$timeout_, $location) {

      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;

    });

  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  describe('linkFn', function () {

    var linkFn;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    beforeEach(function () {

      inject(function (mindefNavbarLinkFn) {
        linkFn = mindefNavbarLinkFn;
      });

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    it('should inject the link function', function () {

      expect(linkFn).toBeDefined();
      expect(angular.isFunction(linkFn)).toBeTruthy();

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    describe('collapse', function () {

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should be collapsed by default', function () {

        expect($scope.collapsed).toBeFalsy();

        linkFn($scope);

        expect($scope.collapsed).toBeTruthy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should toggle collapse value', function () {

        linkFn($scope);

        expect($scope.collapsed).toBeTruthy();

        $scope.toggleCollapsed();

        expect($scope.collapsed).toBeFalsy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should collapse after a timeout', function () {

        linkFn($scope);

        $scope.collapsed = false;

        $scope.collapse();

        expect($scope.collapsed).toBeFalsy();

        $timeout.flush();

        expect($scope.collapsed).toBeTruthy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    describe('visible', function () {

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      beforeEach(function () {
        linkFn($scope);
      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should return true if no value specified', function () {

        expect($scope.isVisible({})).toBeTruthy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should return the visibility value', function () {

        expect($scope.isVisible({ visible: true })).toBeTruthy();
        expect($scope.isVisible({ visible: false })).toBeFalsy();
        expect($scope.isVisible({ visible: null })).toBeFalsy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should return the value of the function', function () {

        expect($scope.isVisible({ visible: function () {
          return true;
        } })).toBeTruthy();
        expect($scope.isVisible({ visible: function () {
          return 1;
        } })).toBeTruthy();
        expect($scope.isVisible({ visible: function () {
          return false;
        } })).toBeFalsy();
        expect($scope.isVisible({ visible: function () {
          return 0;
        } })).toBeFalsy();
        expect($scope.isVisible({ visible: function () {
        } })).toBeFalsy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    describe('active item', function () {

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      beforeEach(function () {
        linkFn($scope);
      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should set exact match to active', function () {

        $scope.items = [
          { url: '/a' },
          { url: '/b' },
          { url: '/c' }
        ];

        locationMock.path('/a');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeTruthy();
        expect($scope.items[1].$_active).toBeFalsy();
        expect($scope.items[2].$_active).toBeFalsy();

        locationMock.path('/b');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeFalsy();
        expect($scope.items[1].$_active).toBeTruthy();
        expect($scope.items[2].$_active).toBeFalsy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should set partial match to active', function () {

        $scope.items = [
          { url: '/a' },
          { url: '/b' },
          { url: '/c' }
        ];

        locationMock.path('/a/sub');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeTruthy();
        expect($scope.items[1].$_active).toBeFalsy();
        expect($scope.items[2].$_active).toBeFalsy();

        locationMock.path('/b/sub');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeFalsy();
        expect($scope.items[1].$_active).toBeTruthy();
        expect($scope.items[2].$_active).toBeFalsy();

      });

      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

      it('should set item to active by pattern', function () {

        $scope.items = [
          { url: '/a', pattern: '/some-folder(/.*)?' },
          { url: '/b' },
          { url: '/c' }
        ];

        locationMock.path('/a');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeFalsy();
        expect($scope.items[1].$_active).toBeFalsy();
        expect($scope.items[2].$_active).toBeFalsy();

        locationMock.path('/b');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeFalsy();
        expect($scope.items[1].$_active).toBeTruthy();
        expect($scope.items[2].$_active).toBeFalsy();

        locationMock.path('/some-folder');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeTruthy();
        expect($scope.items[1].$_active).toBeFalsy();
        expect($scope.items[2].$_active).toBeFalsy();

        locationMock.path('/some-folder/1/2/3');
        $scope.$digest();

        expect($scope.items[0].$_active).toBeTruthy();
        expect($scope.items[1].$_active).toBeFalsy();
        expect($scope.items[2].$_active).toBeFalsy();

      });

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  });

});
