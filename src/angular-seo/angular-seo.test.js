describe('angular-seo', function () {

  describe('seoPageState', function () {

    var seoDefaults;

    beforeEach(function () {

      module('seo');

      inject(function (_seoDefaults_) {
        seoDefaults = _seoDefaults_;
      });

    });

    it('should have the seoDefault values', function () {

      // Arrange

      var seoPageState = {};

      seoDefaults.title = 'my title';
      seoDefaults.keywords = 'my keywords';
      seoDefaults.description = 'my description';

      // Act

      inject(function (_seoPageState_) {
        seoPageState = _seoPageState_;
      });

      // Assert

      expect(seoPageState.title).toBe(seoDefaults.title);
      expect(seoPageState.keywords).toBe(seoDefaults.keywords);
      expect(seoPageState.description).toBe(seoDefaults.description);

    });

  });

  describe('seoPage service', function () {

    var seoPage, seoPageState, seoDefaults, $rootScope;

    beforeEach(function () {

      module('seo');

      inject(function (_seoPage_, _seoPageState_, _seoDefaults_, _$rootScope_) {
        seoPage = _seoPage_;
        seoPageState = _seoPageState_;
        seoDefaults = _seoDefaults_;
        $rootScope = _$rootScope_;
      });

    });

    it('should reset the state to defaults', function () {

      // Arrange

      seoDefaults.title = 'my title';
      seoDefaults.keywords = 'my keywords';
      seoDefaults.description = 'my description';

      seoPageState.title = 'different title';
      seoPageState.keywords = 'different keywords';
      seoPageState.description = 'different description';

      // Act

      seoPage.reset();

      // Assert

      expect(seoPageState.title).toBe(seoDefaults.title);
      expect(seoPageState.keywords).toBe(seoDefaults.keywords);
      expect(seoPageState.description).toBe(seoDefaults.description);
    });

    it('should set properties on the state', function () {

      // Arrange

      seoPageState.title = 'wrong title';
      seoPageState.keywords = 'wrong keyword';
      seoPageState.description = 'wrong description';

      // Act

      seoPage.title('correct title');
      seoPage.keywords('correct keywords');
      seoPage.description('correct description');

      // Assert

      expect(seoPageState.title).toBe('correct title');
      expect(seoPageState.keywords).toBe('correct keywords');
      expect(seoPageState.description).toBe('correct description');

    });

    it('should reset the properties to default on route change event', function () {

      // Arrange

      seoPageState.title = seoPageState.keywords = seoPageState.description = 'before route change event';
      seoDefaults.title = seoDefaults.keywords = seoDefaults.description = 'after route change event';

      // Act

      $rootScope.$broadcast('$routeChangeSuccess');

      // Assert

      expect(seoPageState.title).toBe(seoDefaults.title);
      expect(seoPageState.keywords).toBe(seoDefaults.keywords);
      expect(seoPageState.description).toBe(seoDefaults.description);

    });

    it('should add a keywords', function() {

      // Arrange

      seoPageState.keywords = "current, keywords";


      // Act

      seoPage.addKeywords('added, new');

      // Assert

      expect(seoPageState.keywords).toBe("current, keywords, added, new");

    });
  });

  describe('seoPage directives', function () {

    var seoPage, seoPageState, seoDefaults, $compile, $scope;

    beforeEach(function () {

      module('seo');

      inject(function (_seoPage_, _seoPageState_, _seoDefaults_, _$compile_, _$rootScope_) {
        seoPage = _seoPage_;
        seoPageState = _seoPageState_;
        seoDefaults = _seoDefaults_;
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      });

    });

    it('should set the state properties', function() {

      // Arrange

      var template =
        '<div seo-page-title="title via directive" seo-page-keywords="keywords via directive" seo-page-description="description via directive"></div>';

      seoPageState.title = seoPageState.keywords = seoPageState.description = 'unchanged';

      // Act

      $compile(template)($scope);
      $scope.$digest();

      // Assert

      expect(seoPageState.title).toBe('title via directive');
      expect(seoPageState.description).toBe('description via directive');
      expect(seoPageState.keywords).toBe('keywords via directive');

    });

    it('should not set the unspecified state properties', function() {

      // Arrange

      var template = '<div seo-page-keywords="keywords"></div>';
      seoPageState.title = seoPageState.keywords = seoPageState.description = 'unchanged';

      // Act

      $compile(template)($scope);
      $scope.$digest();

      // Assert

      expect(seoPageState.title).toBe('unchanged');
      expect(seoPageState.description).toBe('unchanged');

    });

    it('should not set empty state properties', function() {

      // Arrange

      var template = '<div seo-page-title=""></div>';
      seoPageState.title = seoPageState.keywords = seoPageState.description = 'unchanged';

      // Act

      $compile(template)($scope);
      $scope.$digest();

      // Assert

      expect(seoPageState.title).toBe('unchanged');

    });

    it('should add keywords', function() {

      // Arrange

      var template = '<div seo-page-keywords-add="my, other, keywords"></div>';
      seoPageState.keywords = "my, initial, keywords";

      // Act

      $compile(template)($scope);
      $scope.$digest();

      // Assert

      expect(seoPageState.keywords).toBe('my, initial, keywords, my, other, keywords');

    });
  });

});
