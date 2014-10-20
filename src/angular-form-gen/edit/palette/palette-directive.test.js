describe('fg-edit-palette', function () {

  var $controller, $scope, fgConfigMock, $compile, $templateCache, fgUtils, $fixture, schemaCtrl = {}, FgField;

  beforeEach(function () {

    module('fg');

    fgConfigMock = {
      fields: {
        templates: [],
        categories: {},
        renderInfo: {}
      }
    };

    module(function ($provide) {
      $provide.constant('fgConfig', fgConfigMock);
    });

    inject(function (_$controller_, _$rootScope_, _$compile_, _$templateCache_, _fgUtils_, _FgField_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
      fgUtils = _fgUtils_;
      FgField = _FgField_;
    });

    $fixture = angular.element('<div></div>');

    $fixture.data('$fgSchemaController', schemaCtrl);
  });

  describe('directive', function () {

    var template = '<div fg-edit-palette></div>';

    it('should compile the template', function () {

      // Arrange

      $fixture.append(template);

      // Act

      var result = $compile($fixture)($scope);
      $scope.$digest();

      // Assert

      expect(result.find('.fg-edit-palette').length).toBe(1);
    });


    it('should render all field templates from config', function () {

      // Arrange

      fgConfigMock.fields.templates.push(new FgField('Ein'));
      fgConfigMock.fields.templates.push(new FgField('Zwein'));
      fgConfigMock.fields.templates.push(new FgField('Drein'));

      var fieldCount = fgConfigMock.fields.templates.length;
      
      $fixture.append(template);
      var $element = $compile($fixture)($scope);

      // Act

      $scope.$digest();
      var result = $element.find('.fg-field');

      // Assert

      expect(result.length).toBe(fieldCount);

      result.each(function () {
        var $overlay = $(this).find('.fg-field-overlay');
        expect($overlay.length).toBe(1);
      });

    });

    it('should call the addField on button click', function () {

      // Arrange

      var field = new FgField('foo');
      fgConfigMock.fields.templates.push(field);

      $fixture.append(template);
      var $element = $compile($fixture)($scope);

      $scope.$digest();

      $scope = $scope.$$childHead;

      schemaCtrl.addField = jasmine.createSpy('addField');

      // Act

      $element.find('.btn').first().click();

      // Assert

      expect(schemaCtrl.addField).toHaveBeenCalled();
      expect(schemaCtrl.addField.calls[0].args[0]).toBeDefined();
      expect(schemaCtrl.addField.calls[0].args[0].type).toBeDefined('foo');
    });

    it('should only render fields of the selected category', function () {

      // Arrange

      // -- construct 2 fake templates

      var templates = fgConfigMock.fields.templates = [
        new FgField('myType'), new FgField('myOtherType')
      ];

      // -- create two categories and register each fake template

      var categories = fgConfigMock.fields.categories = {
        'myCategory': { 'myType': true },
        'myOtherCategory': { 'myOtherType': true }
      };

      // -- fake the template cache that we've got html entries

      _.forEach(templates, function (template) {
        var templateUrl = fgUtils.formatTemplateUrl(template.type);
        $templateCache.put(templateUrl, '<div class="render-result">' + template.type + '</div>')
      });

      // -- Set the initial selected category

      $scope.selectedCategory = categories['myCategory'];

      // -- Compile, link and grab the dom element

      $fixture.append(template);
      var $element = $compile($fixture)($scope);

      // Act

      // -- Swallow!

      $scope.$digest();

      var before = $element.find('.render-result').text();

      // -- Change the select category

      $scope.selectedCategory = categories['myOtherCategory'];

      // -- Swallow!

      $scope.$digest();

      var after = $element.find('.render-result').text();

      // Assert

      expect(before).not.toBe(after);
      expect(before).toBe('myType');
      expect(after).toBe('myOtherType');
    });
  });
});
