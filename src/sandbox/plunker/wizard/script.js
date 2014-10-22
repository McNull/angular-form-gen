var myApp = angular.module('myApp', ['fg', 'ngSanitize', 'markdown', 'blockUI']);

myApp.controller('MyController', function ($scope, myWizardPages, queueBlockUI, $q) {

  // Expose state on scope.

  $scope.myWizard = {
    data: {},
    pages: myWizardPages,
    pageIndex: 0
  };

  // Called whenever the next button is pressed

  $scope.onNext = function (data) {

    // Grab the current page schema

    var page = $scope.myWizard.pages[$scope.myWizard.pageIndex],
      result = true;

    if (page.name === 'Zork') {

      // Because we'll perfom an async action we'll need to return
      // a promise object to the wizard and resolve it when we're done.

      var promise, defer = $q.defer();

      switch (data.zorkAction) {
        case 'east':
          promise = queueBlockUI(['You can\'t go that way!!']);

          // By resolving or returning false we'll tell the wizard that we can't go
          // to the next page.

          result = false;
          break;

        case 'west':
          promise = queueBlockUI(['You go west']);
          break;

        default:
          promise = queueBlockUI(['You\'ve killed the mailbox']);
          break;
      }

      // When the promise of queueBlockUI is resolved we resolve our promise so
      // the wizard can continue.

      promise.then(function () {
        defer.resolve(result);
      });

      return defer.promise;
    }

    return result;

  };

  // Executed when the finish button has been pressed.

  $scope.onFinish = function (data) {

    queueBlockUI([
      'Processing your data ...',
      'Feeding results to server ...',
      'Parsing server response ...',
      'Trying to make sense of it all ...',
      'Comprehension failed ... ',
      'Resetting Form ...'
    ]).then(function () {
      $scope.myWizard.pageIndex = 0;
      $scope.myWizard.data = {};
    });

  };
});

// The wizard directive

myApp.directive('myWizard', function ($q, $timeout) {

  return {
    restrict: 'EA',
    templateUrl: 'my-wizard.html',
    scope: {
      pages: '=myWizardPages',
      pageIndex: '=myWizardPageIndex',
      data: '=myWizardData',
      onFinish: '&myWizardOnFinish',
      onNext: '&myWizardOnNext'
    },
    link: {
      pre: function ($scope) {

        // This needs to be done in the prelink, otherwise the form element
        // on the template cannot access this property on the scope.

        $scope.wizard = { form: {} };
      },
      post: function ($scope) {

        var transition;

        // Track the current pageIndex and update the currentPage property
        // when it has changed.

        $scope.$watch('pageIndex', function () {

          // - - - - 8-< - - - - - - - - - - -
          // Something silly to do animations

          if(transition) {
            $timeout.cancel(transition);
          }

          $scope.pageActive = false;

          transition = $timeout(function(){
            $scope.pageActive = true;
          }, 1);

          // - - - - 8-< - - - - - - - - - - -

          // Grab the currentPage based on the index

          $scope.currentPage = $scope.pages[$scope.pageIndex];
        });

        // Executed when the user presses the previous button
        // Note that I didn't implement a callback here.

        $scope.prevPage = function () {
          $scope.pageIndex = Math.max($scope.pageIndex - 1, 0);
        };

        // Executed when the user presses the previous button

        $scope.nextPage = function () {

          // Execute the callback (see MyController) and if that
          // resolves to true we can continue to the next page.

          var x = $scope.onNext({ data: $scope.data });

          $q.when(x).then(function (result) {

            if (result) {
              $scope.pageIndex = Math.min($scope.pageIndex + 1, $scope.pages.length);
            }

          });

        };

        $scope.prevAllowed = function () {
          return $scope.pageIndex > 0;
        };

        $scope.nextAllowed = function () {
          return $scope.wizard.form.$valid && $scope.pageIndex <= $scope.pages.length;
        };
      }
    }
  };
});

// The schemas used to display the wizard pages

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

  {
    name: "Zork",
    description: "You are standing in an open field west of a white house, with a boarded front door. There is a small mailbox here.",
    schema: {
      "fields": [
        {
          "type": "radiobuttonlist",
          "name": "zorkAction",
          "displayName": "Action",
          "options": [
            {
              "value": "openMailbox",
              "text": "Open mailbox"
            },
            {
              "value": "breakMailbox",
              "text": "Kick mailbox"
            },
            {
              "value": "tortureMailbox",
              "text": "Torture mailbox"
            },
            {
              "value": "insultMailbox",
              "text": "Insult mailbox"
            },
            {
              "value": "allTheAbove",
              "text": "All the above"
            },
            {
              "value": "west",
              "text": "Go west"
            },
            {
              "value": "east",
              "text": "Go east"
            }
          ],
          "value": "openMailbox"
        }
      ]
    }
  },

  {
    name: 'Something something',
    schema: {
      "fields": [
        {
          "type": "text",
          "name": "magicNumber",
          "validation": {
            "maxlength": 15,
            "messages": {
              "pattern": "The value {{ field.state.$viewValue }} is {{ field.state.$viewValue < 7 && 'too low' || field.state.$viewValue > 7 && 'too high' || 'not a number' }}"
            },
            "pattern": "^7$",
            "required": true
          },
          "displayName": "Magic Number",
          "placeholder": "Guess the magic number"
        },
        {
          "type": "password",
          "name": "secret",
          "displayName": "Secret",
          "validation": {
            "messages": {}
          },
          "placeholder": "Tell me your secret"
        },
        {
          "type": "checkboxlist",
          "name": "checkboxList",
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
        }
      ]
    }
  }

]);

// Something silly to display a little bit of interaction between the pages.

myApp.factory('queueBlockUI', function (blockUI, $timeout, $q) {
  return function (messages) {

    var x = 0, defer = $q.defer();

    function next() {

      var msg = messages[x];

      if (!x) {
        blockUI.start(msg);
      } else if (x < messages.length) {
        blockUI.message(msg);
      } else {
        blockUI.stop();
        defer.resolve();
      }

      if (x++ < messages.length) {
        $timeout(next, Math.floor(Math.random() * 500 + 1000));
      }
    }

    next();

    return defer.promise;
  }
});
