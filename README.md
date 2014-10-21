# angular-form-gen

Drag and drop dynamic bootstrap forms with angular.

## Description

An extendable _angular_ module that allows you and/or your web users to design and render _bootstrap_ forms. 
Field components can be dragged from a _pallette_ onto a _canvas_ where details like _validation_ can be fine-tuned further.
Developers can extend the editor by adding _custom field components_ and _validation patterns_.

## Demostration

A full blown demonstration is available on [angular-form-gen.nullest.com](http://angular-form-gen.nullest.com/#!/demo). Smaller examples can be found on plunker (links will follow).

## Dependencies

This module was build using _AngularJS_ ~1.2.21 and _Bootstrap (CSS)_ ~3.2.0.

## Installation

Install the package with bower:

```
$ bower --save install angular-form-gen
```

Include both `angular-form-gen.css` and `angular-form-gen.js` in your `index.html`.

Setup your main module dependencies:

```
angular.module('myApp', ['fg']);
```

## Building the GitHub project

### Setup

```
# Clone the github project
$ git clone git@github.com:McNull/angular-form-gen.git
$ cd angular-form-gen

# Install dependencies
$ npm install
$ bower install
```

### Building

```
# Build the demonstration website (outputs into ./dest)
$ gulp build

# Build a distribution release (outputs into ./dist)
$ gulp dist

# Start watch/autobuild
$ gulp-tasks/watch.sh

# Execute tests
$ karma start
```

