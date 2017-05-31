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
            "name": "field2200",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2198",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2196",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
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
            },
            "validation": {
              "messages": {}
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
            "value": "1",
            "validation": {
              "messages": {}
            }
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
            "value": "1",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2202",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2204",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2206",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2208",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2210",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2212",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2214",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2216",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2218",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2220",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2222",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2224",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2226",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2228",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2230",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2232",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2234",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2236",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2238",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2240",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2242",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2244",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2246",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2248",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2250",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2252",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2254",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2256",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2258",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2260",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2262",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2264",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2266",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2268",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2270",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2272",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2274",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2276",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2278",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2280",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2282",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2284",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2286",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2288",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2290",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2292",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2294",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2296",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      },
          {
            "type": "text",
            "name": "field2298",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
      }
    ]
      },
      "name": "Large Form",
      "layout": "form-horizontal",
      "description": "Beserk form"
},

    ///////////////////////////////////////////////////////////////////////////////

    {
      "name": "Required option fields",
      "layout": "form-horizontal",
      "description": "An example schema containing required multiple choice option fields.",
      "schema": {
        "fields": [
          {
            "type": "checkboxlist",
            "name": "checkboxes",
            "displayName": "Checkboxes",
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
              },
              {
                "value": "4",
                "text": "Option 4"
              },
              {
                "value": "5",
                "text": "Option 5"
              }
            ],
            "value": {
              "1": false,
              "2": false
            },
            "validation": {
              "messages": {},
              "required": true,
              "minoptions": 2,
              "maxoptions": 3
            }
          },
          {
            "type": "radiobuttonlist",
            "name": "radiobuttons",
            "displayName": "Radiobuttons",
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
            "validation": {
              "messages": {},
              "required": true
            }
          },
          {
            "type": "selectlist",
            "name": "select",
            "displayName": "Select",
            "options": [
              {
                "value": "",
                "text": "No option selected"
              },
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
            "validation": {
              "messages": {},
              "required": true
            },
            value: ""
          }
        ]
      }
    },
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
            "type": "date",
            "name": "startDate",
            "displayName": "Start Date",
            "validation": {
              "pattern": "^(?:(?:31(\\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"
            },
            "placeholder": "Fill in your first name",
            "tooltip": "Fill in your first name"
          },
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
      "description": "An example form with some common person fields. It contains two required fields, email input and one field with a custom validation pattern."
    }
  ];

  var i = forms.length;

  while (i--) {
    forms[i].id = i + 1;
  }

  return forms;
});
