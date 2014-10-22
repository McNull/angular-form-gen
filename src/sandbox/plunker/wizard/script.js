var myApp = angular.module('myApp', ['fg', 'ngSanitize', 'markdown']);

myApp.controller('MyController', function ($scope, myWizardPages) {

  console.log(myWizardPages);
  // Something to store the input at.

  $scope.myWizardData = {};

  // Expose the schemas on the scope.

  $scope.myWizardPages = myWizardPages;

});

myApp.directive('myWizard', function() {

  return {
    restrict: 'EA',
    templateUrl: 'my-wizard.html',
    scope: {
      pages: '=myWizardPages',
      data: '=myWizardData'
    },
    link: function($scope) {

      var pageIndex = 0;

      $scope.currentPage = $scope.pages[0];

      $scope.wizard = {};

      $scope.prevPage = function() {
        pageIndex = Math.max(pageIndex - 1, 0);
        $scope.currentPage = $scope.pages[pageIndex];
      };

      $scope.nextPage = function() {
        pageIndex = Math.min(pageIndex + 1, $scope.pages.length - 1);
        $scope.currentPage = $scope.pages[pageIndex];
      };

    }
  };
});

myApp.value('myWizardPages', [
  {
    name: 'Who are YOU?',
    schema: {
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
            "required": false
          },
          "placeholder": "Enter your last name here",
          "tooltip": "Enter your last name here"
        }
      ]
    }
  },

//  {
//    name: "Adventure Game",
//    schema: {
//      "fields": [
//        {
//          "type": "radiobuttonlist",
//          "name": "direction",
//          "displayName": "Direction",
//          "options": [
//            {
//              "value": "up",
//              "text": "Up"
//            },
//            {
//              "value": "right",
//              "text": "Right"
//            },
//            {
//              "value": "down",
//              "text": "Down"
//            },
//            {
//              "value": "left",
//              "text": "Left"
//            }
//          ],
//          "value": "up"
//        }
//      ]
//    }
//  },
//
//  {
//    name: 'Something something',
//    schema: {
//      "fields": [
//        {
//          "type": "number",
//          "name": "magicNumber",
//          "validation": {
//            "maxlength": 15,
//            "messages": {
//              "pattern": "The value {{ field.state.$viewValue }} is {{ field.state.$viewValue < 7 && 'too low' || field.state.$viewValue > 7 && 'too high' || 'not a number' }}"
//            },
//            "pattern": "^7$",
//            "required": true
//          },
//          "displayName": "Magic Number",
//          "placeholder": "Guess the magic number"
//        },
//        {
//          "type": "password",
//          "name": "secret",
//          "displayName": "Secret",
//          "validation": {
//            "messages": {}
//          },
//          "placeholder": "Tell me your secret"
//        },
//        {
//          "type": "checkboxlist",
//          "name": "field3741",
//          "displayName": "Checkbox List",
//          "options": [
//            {
//              "value": "1",
//              "text": "Option 1"
//            },
//            {
//              "value": "2",
//              "text": "Option 2"
//            },
//            {
//              "value": "3",
//              "text": "Option 3"
//            }
//          ],
//          "value": {
//            "1": true,
//            "2": true
//          }
//        }
//      ]
//    }
//  }


]);