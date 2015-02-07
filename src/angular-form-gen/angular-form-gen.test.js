describe('fgConfigProvider', function () {

  var configProvider;

  beforeEach(function () {
    // Initialize the service provider 
    // by injecting it to a fake module's config block
    var fakeModule = angular.module('this.is.so.fake', function () {});
    fakeModule.config(function (fgConfigProvider) {
      configProvider = fgConfigProvider;
    });
    // Initialize test.app injector
    module('fg', 'this.is.so.fake');

    // Kickstart the injectors previously registered 
    // with calls to angular.mock.module
    inject(function () {});
  });

  it('it should resolve the fgConfigProvider', function () {
    expect(configProvider).not.toBeUndefined();
  });

  it('should get field template by type', function () {

    var result = configProvider.fields.get('text');
    
    expect(result).toBeDefined();
    expect(result.type).toBe('text');
  });
});
