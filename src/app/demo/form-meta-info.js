// This is schema we'll use for all our forms to fill in the meta information.

app.value('formMetaInfo', {
  "fields": [
    {
      "type": "text",
      "name": "name",
      "displayName": "Form name",
      "validation": {
        "messages": {},
        "required": true
      },
      "value": "",
      "tooltip": "Enter the name of the form",
      "placeholder": "The name of the form"
    },
    {
      "type": "textarea",
      "name": "description",
      "displayName": "Description",
      "validation": {
        "messages": {}
      },
      "placeholder": "A short description of this form",
      "tooltip": "Enter a short description"
    },
    {
      "type": "radiobuttonlist",
      "name": "layout",
      "displayName": "Layout",
      "options": [
        {
          "value": "form-horizontal", "text": "Horizontal"
        },
        {
          "value": "form", "text": "Vertical"
        }
      ],
      "value": "form-horizontal",
      "tooltip": "Choose a layout"
    }
  ]
});