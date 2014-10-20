app.factory('Form', function (fakeHttpResolve, formData) {

  var idCounter = formData.length;

  sortForms();

  function sortForms() {
    formData.sort(function (x, y) {
      return y.id - x.id;
    });
  }

  function query(params) {
    return fakeHttpResolve(formData);
  }

  function get(params) {
    var form = app.utils.singleOrDefault(formData, function (x) {
      return x.id == params.id;
    });

    if (!form) {
      throw new Error('Form not found');
    }

    return fakeHttpResolve(form);
  }

  function remove(params) {
    var idx = app.utils.indexOfMatch(formData, function (x) {
      return x.id === params.id;
    });

    if (idx !== -1) {
      formData.splice(idx, 1);
      sortForms();
      return fakeHttpResolve();
    } else {
      throw new Error('Form not found');
    }
  }

  function save(params) {

    var idx = app.utils.indexOfMatch(formData, function (x) {
      return x.id === params.id;
    });

    if (idx !== -1) {
      formData.splice(idx, 1, params);
    } else {
      params.id = ++idCounter;
      formData.push(params);
    }

    sortForms();

    return fakeHttpResolve(params);
  }

  return {
    query: query,
    get: get,
    remove: remove,
    save: save
  };

});

app.factory('formData', function () {
  var forms = [
    {
      "schema": {
        "name": "All Fields",
        "fields": [
          {
            "type": "text",
            "name": "field553",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "email",
            "name": "field555",
            "displayName": "Email",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "number",
            "name": "field557",
            "validation": {
              "maxlength": 15,
              "messages": {}
            },
            "displayName": "Number"
          },
          {
            "type": "password",
            "name": "field559",
            "displayName": "Password",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "textarea",
            "name": "field561",
            "displayName": "Textarea",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "checkbox",
            "name": "field7781",
            "nolabel": true,
            "displayName": "Checkbox"
          },
          {
            "type": "checkboxlist",
            "name": "field7783",
            "displayName": "Checkbox List",
            "options": [
              {
                "value": "1",
                "text": "Option 1"
              },
              {
                "value": "2",
                "text": "Option 2"
              },
              {
                "value": "3",
                "text": "Option 3"
              }
            ],
            "value": {
              "1": true,
              "2": true
            }
          },
          {
            "type": "radiobuttonlist",
            "name": "field7787",
            "displayName": "Radiobutton List",
            "options": [
              {
                "value": "1",
                "text": "Option 1"
              },
              {
                "value": "2",
                "text": "Option 2"
              },
              {
                "value": "3",
                "text": "Option 3"
              }
            ],
            "value": "1"
          },
          {
            "type": "selectlist",
            "name": "field7789",
            "displayName": "Select List",
            "options": [
              {
                "value": "1",
                "text": "Option 1"
              },
              {
                "value": "2",
                "text": "Option 2"
              },
              {
                "value": "3",
                "text": "Option 3"
              }
            ],
            "value": "1"
          }
        ]
      },
      "name": "All Fields",
      "id": 3,
      "layout": "form-horizontal",
      "description": "Contains all available field templates."
    },
    {
      "name": "Textboxes",
      "schema": {
        "name": "Textboxes",
        "fields": [
          {
            "type": "text",
            "name": "field553",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "email",
            "name": "field555",
            "displayName": "Email",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "number",
            "name": "field557",
            "validation": {
              "maxlength": 15,
              "messages": {}
            },
            "displayName": "Number"
          },
          {
            "type": "password",
            "name": "field559",
            "displayName": "Password",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "textarea",
            "name": "field561",
            "displayName": "Textarea",
            "validation": {
              "messages": {}
            }
          }
        ]
      },
      "id": 2,
      "layout": "form-horizontal",
      "description": "Contains all textbox field templates."
    },
    {
      "name": "Textbox Validation",
      "schema": {
        "fields": [
          {
            "type": "text",
            "name": "pattern",
            "displayName": "Pattern",
            "validation": {
              "messages": {},
              "pattern": "^test 123$"
            },
            "placeholder": "Should match \"test 123\""
          },
          {
            "type": "text",
            "name": "required",
            "displayName": "Required",
            "validation": {
              "messages": {},
              "required": true
            },
            "placeholder": "Value is required"
          },
          {
            "type": "text",
            "name": "minLength",
            "displayName": "Min-length",
            "validation": {
              "messages": {
                "minlength": ""
              },
              "minlength": 5
            },
            "placeholder": "Minimum length of 5"
          },
          {
            "type": "text",
            "name": "maxLength",
            "displayName": "Max-length",
            "validation": {
              "messages": {},
              "maxlength": 6
            },
            "placeholder": "Maximum length of 6"
          }
        ],
        "name": "Validation"
      },
      "layout": "form-horizontal",
      "description": "Textbox validation options"
    },
    {
      "name": "People",
      "layout": "form-horizontal",
      "schema": {
        "fields": [
          {
            "type": "text",
            "name": "firstName",
            "displayName": "Name",
            "validation": {
              "messages": {},
              "required": true
            },
            "placeholder": "Fill in your first name",
            "tooltip": "Fill in your first name"
          },
          {
            "type": "text",
            "name": "lastName",
            "displayName": "Last name",
            "validation": {
              "messages": {},
              "required": true
            },
            "placeholder": "Fill in your last name",
            "tooltip": "Fill in your last name"
          },
          {
            "type": "email",
            "name": "email",
            "displayName": "Email",
            "validation": {
              "messages": {}
            },
            "placeholder": "Fill in your email address"
          },
          {
            "type": "text",
            "name": "country",
            "displayName": "Country",
            "validation": {
              "messages": {}
            },
            "placeholder": ""
          },
          {
            "type": "text",
            "name": "ipAddress",
            "displayName": "IP Address",
            "validation": {
              "messages": {
                "pattern": "The value \"{{ field.state.$viewValue }}\" is not a valid IP address."
              },
              "pattern": "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
            },
            "value": ""
          }
        ]
      },
      "description": "Example person form"
    }
  ];

  var i = forms.length;

  while (i--) {
    forms[i].id = i + 1;
  }

  return forms;
});