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