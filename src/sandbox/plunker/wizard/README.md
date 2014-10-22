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