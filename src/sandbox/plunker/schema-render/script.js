
var myApp = angular.module('myApp', ['fg', 'ngSanitize', 'markdown']);

myApp.controller('MyController', function($scope, mySchema) {

  // Something to store the input at.

  $scope.myFormData = {};

  // Expose the schema on the scope.

  $scope.mySchema = mySchema;

});

myApp.value('mySchema', {
  "fields": [
    {
      "type": "text",
      "name": "firstName",
      "displayName": "First name",
      "validation": {
        "messages": {},
        "required": true
      },
      "placeholder": "Enter your first name here",
      "tooltip": "Enter your first name here"
    },
    {
      "type": "text",
      "name": "lastName",
      "displayName": "Last name",
      "validation": {
        "messages": {},
        "required": true
      },
      "placeholder": "Enter your last name here",
      "tooltip": "Enter your last name here"
    },
    {
      "type": "radiobuttonlist",
      "name": "sex",
      "displayName": "Sex",
      "options": [
        {
          "value": "male",
          "text": "Male"
        },
        {
          "value": "female",
          "text": "Female"
        }
      ],
      "value": "male"
    },
    {
      "type": "email",
      "name": "email",
      "displayName": "Email",
      "validation": {
        "messages": {}
      },
      "placeholder": "Enter your email address here",
      "tooltip": "Enter your email address here"
    },
    {
      "type": "checkboxlist",
      "name": "color",
      "displayName": "Colors",
      "options": [
        {
          "value": "red",
          "text": "Red"
        },
        {
          "value": "blue",
          "text": "Blue"
        },
        {
          "value": "green",
          "text": "Green"
        }
      ],
      "value": {}
    }
  ]
});