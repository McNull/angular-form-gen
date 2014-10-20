describe('fg-edit-palette', function () {

  var $controller, $scope, fgConfigMock, $compile, $templateCache;

  beforeEach(function () {

    module('fg');

    fgConfigMock = {
      fields: {
        templates: [],
        categories: []
      }
    };

    module(function ($provide) {
      $provide.constant('fgConfig', fgConfigMock);
    });

    inject(function (_$controller_, _$rootScope_, _$compile_, _$templateCache_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });
  });

  describe('controller', function () {

    it('should create a copy of the templates found in the configuration', function () {

      // Arrange

      var templates = fgConfigMock.fields.templates = [
        new fg.Field('myType'), new fg.Field('myOtherType')
      ];

      // Act

      $controller('fgEditPaletteController', { $scope: $scope, fgConfig: fgConfigMock });

      // Assert

      expect($scope.templates).toBeDefined();
      expect($scope.templates).not.toBe(templates);

      expect($scope.templates.length).toEqual(templates.length);

      _.forEach($scope.templates, function (copyTemplate) {

        var origTemplate = _.find(templates, { type: copyTemplate.type });

        expect(origTemplate).toBeDefined();
        expect(origTemplate).not.toBe(copyTemplate);

        _.forEach(origTemplate, function (value, key) {
          if (key !== 'id') {
            expect(value).toEqual(copyTemplate[key]);
          }
        });
      });
    });

    describe('templateFilter', function () {

      it('should include all templates when no category has been selected', function () {

        // Arrange

        $controller('fgEditPaletteController', { $scope: $scope, fgConfig: fgConfigMock });

        $scope.selectedCategory = null;

        // Act

        var result = $scope.templateFilter({});

        // Assert

        expect(result).toBe(true);
      });

      it('should not include templates on category mismatch', function () {

        // Arrange

        var templates = fgConfigMock.fields.templates = [
          new fg.Field('myType'), new fg.Field('myOtherType')
        ];

        var categories = fgConfigMock.fields.categories = {
          'myCategory': { 'myType': true },
          'myOtherCategory': { 'myOtherType': true }
        };

        $controller('fgEditPaletteController', { $scope: $scope, fgConfig: fgConfigMock });

        $scope.selectedCategory = categories['myOtherCategory'];

        // Act

        var result = $scope.templateFilter(templates[0]);

        // Assert

        expect(result).toBeFalsy();
      });

      it('should include templates on category match', function () {

        // Arrange

        var templates = fgConfigMock.fields.templates = [
          new fg.Field('myType'), new fg.Field('myOtherType')
        ];

        var categories = fgConfigMock.fields.categories = {
          'myCategory': { 'myType': true },
          'myOtherCategory': { 'myOtherType': true }
        };

        $controller('fgEditPaletteController', { $scope: $scope, fgConfig: fgConfigMock });

        $scope.selectedCategory = categories['myCategory'];

        // Act

        var result = $scope.templateFilter(templates[0]);

        // Assert

        expect(result).toBe(true);
      });

    })

  });

});
