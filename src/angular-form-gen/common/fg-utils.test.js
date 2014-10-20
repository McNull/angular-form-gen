describe('fgUtils', function() {

  var fgUtils;
  var $templateCache;
  var fgConfigMock;
  var FgField;

  beforeEach(function() {
    module('fg');

    module(function($provide) {
      fgConfigMock = {
        fields: {
          templates: [],
          aliases: {}
        }
      };
      $provide.constant('fgConfig', fgConfigMock);
    });

    inject(function(_fgUtils_, _$templateCache_, _FgField_) {
      fgUtils = _fgUtils_;
      $templateCache = _$templateCache_;
      FgField = _FgField_;
    });
  });

  describe('copyField', function() {

    it('should copy the provided field', function() {

      // Arrange

      var field = new FgField('myType');

      // Act

      var result = fgUtils.copyField(field);

      // Assert

      expect(result).toBeDefined();
      expect(result).not.toBe(field);
      expect(result.type).toBe(field.type);
    });
  });

  describe('getTemplateUrl', function() {

    it('should check the template cache for an entry', function() {
      // Arrange

      var field = new FgField('myType');
      var cacheKey = fgUtils.formatTemplateUrl(field.type);

      spyOn($templateCache, 'get').andCallFake(function() {
        return true;
      });

      // Act

      fgUtils.getTemplateUrl(field);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(cacheKey);
    });

    it('should check the template cache for an entry in a specified area', function() {
      // Arrange

      var field = new FgField('myType');
      var area = 'myArea';
      var cacheKey = fgUtils.formatTemplateUrl(field.type, area);

      spyOn($templateCache, 'get').andCallFake(function() {
        return true;
      });

      // Act

      fgUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(cacheKey);
    });

    it('should fallback to the default area when the specified area does not contain a template', function() {
      // Arrange

      var field = new FgField('myType');
      var area = 'myArea';
      var areaCacheKey = fgUtils.formatTemplateUrl(field.type, area);
      var defaultCacheKey = fgUtils.formatTemplateUrl(field.type, 'default');

      spyOn($templateCache, 'get').andCallFake(function(key) {
        return key === defaultCacheKey;
      });

      // Act

      fgUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(areaCacheKey);
      expect($templateCache.get).toHaveBeenCalledWith(defaultCacheKey);
    });

    it('should NOT fallback to the default area when the specified area is "properties"', function() {
      // Arrange

      var field = new FgField('myType');
      var area = 'properties';
      var areaCacheKey = fgUtils.formatTemplateUrl(field.type, area);
      var defaultCacheKey = fgUtils.formatTemplateUrl(field.type, 'default');
      var expected = fgUtils.formatTemplateUrl('not-in-cache');

      spyOn($templateCache, 'get');

      // Act

      var result = fgUtils.getTemplateUrl(field, area);

      // Assert

      expect($templateCache.get).toHaveBeenCalledWith(areaCacheKey);
      expect($templateCache.get).not.toHaveBeenCalledWith(defaultCacheKey);
      expect(result).toBe(expected);
    });

    it('should return "not-in-cache" template', function() {
      // Arrange

      var field = new FgField('myType');
      var area = 'myArea';
      var expected = fgUtils.formatTemplateUrl('not-in-cache');

      // Act

      var result = fgUtils.getTemplateUrl(field, area);

      // Assert

      expect(result).toBe(expected);
    });

    //    it('should use the template type value of the field', function () {
    //      // Arrange
    //
    //      var templateAlias = 'myAlias';
    //      var field = new FgField('myType');
    //
    //      fgConfigMock.fields.aliases['myType'] = templateAlias;
    //      var expected = fgUtils.formatTemplateUrl(templateAlias);
    //
    //      spyOn($templateCache, 'get').andCallFake(function () {
    //        return true;
    //      });
    //
    //      // Act
    //
    //      fgUtils.getTemplateUrl(field);
    //
    //      // Assert
    //
    //      expect($templateCache.get).toHaveBeenCalledWith(expected);
    //    });
  });
});