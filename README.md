# angular-form-gen

Drag and drop dynamic bootstrap forms with angular.

## Description

An extendable _angular_ module that allows you and/or your web users to design and render _bootstrap_ forms. 
Field components can be dragged from a _pallette_ onto a _canvas_ where details like _validation_ can be fine-tuned further.
Developers can extend the editor by adding _custom field components_ and _validation patterns_.

## Demostration

A full blown demonstration is available on [angular-form-gen.nullest.com](http://angular-form-gen.nullest.com/#!/demo). Smaller examples can be found on plunker:

* [Simple Schema Editor](http://plnkr.co/edit/sS7wXK?p=info)
* [Simple Schema Renderer](http://plnkr.co/edit/8d7TPg?p=info)
* [Form Schema Editor with Preview](http://plnkr.co/edit/8erjmp?p=info)
* [Wizard Example](http://plnkr.co/edit/RQO8cr)

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

## Usage

_FormGen_ can be split in two areas:

1. The schema editor
2. The form renderer

The schema editor is where the structure and behaviour of the form is created. _FormGen_ comes with a client-side editor, which allows you to drag and drop fields to a canvas and modify properties like labels, model-names and/or validation rules. The complete set of fields and their associated behaviour is bundled in a schema object. Since this is a simple javascript object it can be stored easily on a backend database.

To display the form to a user the so called renderer is used. This simply takes an earlier created schema object, transforms it into a _bootstrap_ form and validates the input of the user.

### Schema Editor

The schema editor can be embedded in any `form` by marking a child element with a `fg-edit` attribute and providing the target schema model with the `fg-schema` directive.

```
<!-- Create normal bootstrap form element -->
<form class="form-horizontal">
  
  <!-- Embed the schema editor on the form -->
  <div fg-edit fg-schema="myForm.schema"></div>
  
</form>
```

The editor behaves just like any other angular form element; if the schema model is invalid the parent form status is set to `$invalid`, if anything in the schema has been modified the form status is set to `$dirty`.

#### Layout

The schema editor is split in two main columns. On the left side is the _canvas_, which contains all the fields that are a member of the current schema. On the right side is the _palette_, which contains all the available field templates. The contents of the _palette_ is determined by the selected category.

#### Adding, Ordering and Removing Fields

Fields can be added to the schema by either pressing the _add_ button on the field in the _palette_ or by dragging and dropping the _field_ from the _palette_ on the _canvas_. The order of fields can be modified by using the _up_ and _down_ buttons or by dragging and dropping the _field_ to the desired position. A field can be removed by pressing the _delete_ button.

#### Field Configuration

By pressing on the _configure_ button the _configuration panes_ become visible for the specific field. The configuration options are separated in several tabs. Some of them are only specific for certain field types.

##### General Properties

These are the most common field properties.

Depending on the field type the following properties are available.

* Name: The name of the field
* Display name: The name to show on the label
* Placeholder text: The text to use as placeholder
* Tooltip: The text to use as tooltip
* Initial value: The initial value of the field

##### Validation

Here the validation rules can be applied to the field. For each validation rule that is enabled, a custom message can be supplied to be shown to the user if the field value doesn't validate. This is complete optional -- if no message is specified, a default for that specific validation type is used.

Depending on the field type the following properties are available.

* Minimum length: Field value must be at least this length
* Maximum length: Field value must not exceed this length
* Pattern: Field value should match this pattern
* Required: Field value is required

##### Options

This tab is only available for field types that have a list of options, such as the `select` element. Form designers can add and/or remove items here from the option list.

##### Debug Information

The _debug_ tab shows the schema properties for the current field.

### Form Renderer

Like the _schema editor_, the form renderer should be a child element of a `form` element. This allows for more customisation, like rendering multiple schemas and/or adding form fields without the need for a pre-generated schema.

Rendering of a schema is done by the `fg-form` directive:

```
<form novalidate class="form">
  <div fg-form
       fg-form-data="myFormData"
       fg-schema="mySchema">
  </div>
</form>
```

The `fg-form-data` attribute specifies that target object model. This model will receive all the input values of the fields. If for example the schema contains a field with the name `myField`, the value of the input will be stored at `myFormData.myField`.

Any parent `form` or `ng-form` state will be updated accordantly if any of the validation rules defined in the schema will fail or succeed.

```
<form novalidate class="form" name="myForm">
  
  <div fg-form
       fg-form-data="myFormData"
       fg-schema="mySchema">
  </div>
  
  <!-- set the disabled class on the submit button when the form state is invalid -->
  
  <button type="submit"
          class="btn btn-primary"
          ng-class="{ disabled: myForm.$invalid }">
    Submit
  </button>
  
</form>
```

#### Form Layout

The form renderer works with both the `form` and the `form-horizontal` bootstrap classes.

## Building the GitHub Project

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

