var fg = angular.module('fg', ['dq']);

/**
 * Constructor for form-gen Field types.
 * @param {string} type         Indicates the type of field
 * @param {object} properties   [optional] Initial property values
 */
fg.constant('FgField', function FgField(type, properties) {
    this.name = this.type = type;

    if (properties) {
      angular.extend(this, properties);
    }

    this.displayName = this.displayName || this.type.charAt(0).toUpperCase() + this.type.substring(1);
  }
);

fg.config(function ($provide) {

  $provide.provider('fgConfig', function () {

    var config = {
      enableDebugInfo: true,
      validation: {
        messages: {},
        patterns: {}
      },
      fields: {
        templates: [],
        categories: {},
        renderInfo: {}
      }
    };

    var templates = config.fields.templates;

    function indexOfTemplate(type) {
      var idx = templates.length;

      while (idx--) {
        if (templates[idx].type === type) {
          break;
        }
      }

      return idx;
    }

    return {
      debug: function (value) {
        config.enableDebugInfo = value;
      },
      fields: {
        add: function (objectTemplate, categories, templateUrl, propertiesTemplateUrl) {

          if (!objectTemplate || !objectTemplate.type || !categories || !categories.length) {
            throw new Error('Need a valid objectTemplate and at least one category');
          }

          var idx = indexOfTemplate(objectTemplate.type);

          if (idx !== -1) {
            templates[idx] = objectTemplate;
          } else {
            templates.push(objectTemplate);
          }

          this.category(objectTemplate.type, categories);
          this.renderInfo(objectTemplate.type, templateUrl, propertiesTemplateUrl);
        },
        remove: function (type) {
          var idx = indexOfTemplate(type);

          if (idx !== -1) {
            templates.splice(idx, 1);
          }

          this.category(type);
          this.renderInfo(type);
        },
        renderInfo: function (fieldType, templateUrl, propertiesTemplateUrl) {
          config.fields.renderInfo[fieldType] = {
            templateUrl: templateUrl,
            propertiesTemplateUrl: propertiesTemplateUrl
          };
        },
        category: function (fieldType, categories) {
          if (!angular.isArray(categories)) {
            categories = [categories];
          }

          angular.forEach(config.fields.categories, function (category) {
            delete category[fieldType];
          });

          angular.forEach(categories, function (category) {
            if (config.fields.categories[category] === undefined) {
              config.fields.categories[category] = {};
            }

            config.fields.categories[category][fieldType] = true;
          });
        }
      },
      validation: {
        message: function (typeOrObject, message) {

          var messages = config.validation.messages;

          if (angular.isString(typeOrObject)) {

            if (!message) {
              throw new Error('No message specified for ' + typeOrObject);
            }

            messages[typeOrObject] = message;
          } else {
            angular.extend(messages, typeOrObject);
          }
        },
        pattern: function (nameOrObject, pattern) {

          if (angular.isString(nameOrObject)) {
            config.validation.patterns[nameOrObject] = pattern;
          } else {
            angular.extend(config.validation.patterns, nameOrObject);
          }
        }
      },
      $get: function () {
        return config;
      }
    };
  });

});

fg.config(function (fgConfigProvider, FgField) {

  // - - - - - - - - - - - - - - - - - - - - - -
  // Messages
  // - - - - - - - - - - - - - - - - - - - - - -

  fgConfigProvider.validation.message({
    required: 'A value is required for this field.',
    minlength: 'The value does not match the minimum length{{ field.schema && (" of " + field.schema.validation.minlength + " characters" || "")}}.',
    maxlength: 'The value exceeds the maximum length{{ field.schema && (" of " + field.schema.validation.maxlength + " characters" || "")}}.',
    pattern: 'The value "{{ field.state.$viewValue }}" does not match the required format.',
    email: 'The value "{{ field.state.$viewValue }}" is not a valid email address.',
    unique: 'The value "{{ field.state.$viewValue }}" is already in use.',
    number: 'The value "{{ field.state.$viewValue }}" is not a number.',
    min: 'The value {{ field.schema && ("should be at least " + field.schema.validation.min) || field.state.$viewValue + " is too low" }}',
    max: 'The value {{ field.schema && ("should be less than " + field.schema.validation.max) || field.state.$viewValue + " is too high" }}',
    minoptions: 'At least {{ field.schema.validation.minoptions }} option(s) should be selected.',
    maxoptions: 'No more than {{ field.schema.validation.maxoptions }} option(s) should be selected.'
  });

  // - - - - - - - - - - - - - - - - - - - - - -
  // Fields
  // - - - - - - - - - - - - - - - - - - - - - -

  var categories = {
    'Text input fields': [
      new FgField('text', {
        displayName: 'Textbox'
      }),
      new FgField('email'),
      new FgField('number', {
        validation: { maxlength: 15 /* to prevent > Number.MAX_VALUE */ }
      }),
      new FgField('password'),
      new FgField('textarea')
    ],
    'Checkbox fields': [
      new FgField('checkbox', { nolabel: true }),
      new FgField('checkboxlist', {
        displayName: 'Checkbox List',
        options: [
          {
            value: '1',
            text: 'Option 1'
          },
          {
            value: '2',
            text: 'Option 2'
          },
          {
            value: '3',
            text: 'Option 3'
          }
        ],
        value: {
          '1': true,
          '2': true
        }
      })
    ],
    'Select input fields': [
      new FgField('radiobuttonlist', {
        displayName: 'Radiobutton List',
        options: [
          {
            value: '1',
            text: 'Option 1'
          },
          {
            value: '2',
            text: 'Option 2'
          },
          {
            value: '3',
            text: 'Option 3'
          }
        ],
        value: '1'
      }),
      new FgField('selectlist', {
        displayName: 'Select List',
        options: [
          {
            value: '',
            text: 'Select an option'
          },
          {
            value: '1',
            text: 'Option 1'
          },
          {
            value: '2',
            text: 'Option 2'
          },
          {
            value: '3',
            text: 'Option 3'
          }
        ],
        value: ''
      }) // ,
      // new FgField('dropdownlist', {
      //   options: [{
      //     value: '1',
      //     text: 'Option 1'
      //   }, {
      //     value: '2',
      //     text: 'Option 2'
      //   }, {
      //     value: '3',
      //     text: 'Option 3'
      //   }],
      //   value: '1'
      // })
    ]
  };


  angular.forEach(categories, function (fields, category) {
    angular.forEach(fields, function (field) {
      fgConfigProvider.fields.add(field, category /*, templateUrl, propertiesTemplateUrl */);
    });
  });

  // - - - - - - - - - - - - - - - - - - - - - -
  // Patterns
  // - - - - - - - - - - - - - - - - - - - - - -

  fgConfigProvider.validation.pattern({
    'None': undefined,
    'Url': '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
    'Domain': '^([a-z][a-z0-9\\-]+(\\.|\\-*\\.))+[a-z]{2,6}$',
    'IPv4 Address': '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    'Email Address': '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
    'Integer': '^-{0,1}\\d+$',
    'Positive Integers': '^\\d+$',
    'Negative Integers': '^-\\d+$',
    'Number': '^-{0,1}\\d*\\.{0,1}\\d+$',
    'Positive Number': '^\\d*\\.{0,1}\\d+$',
    'Negative Number': '^-\\d*\\.{0,1}\\d+$',
    'Year (1920-2099)': '^(19|20)[\\d]{2,2}$',
    'Password': '(?=.*\\d)(?=.*[!@#$%^&*\\-=()|?.\"\';:]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$'
  });
});
