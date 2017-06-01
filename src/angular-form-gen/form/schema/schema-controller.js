fg.controller('fgSchemaController', function($scope, fgUtils) {

  var _model;

  this.model = function(value) {
    if(value !== undefined) {
      _model = value;

      if(!angular.isArray(value.fields)) {
        value.fields = [];
      }
    }

    return _model;
  };

  this.addField = function(field, index) {
    var copy = fgUtils.copyField(field);

    index = index === undefined ? _model.fields.length : index;
    _model.fields.splice(index, 0, copy);
    //call to the add field callback function if it's set
    if (this.addFieldCallback) {
      this.addFieldCallback(field, index);
    }

  };

  this.removeField = function(index) {
    _model.fields.splice(index, 1);

    //call to the remove field callback function if it's set
    if (this.removeFieldCallback) {
      this.removeFieldCallback(index);
    }
  };

  this.swapFields = function(idx1, idx2) {
    if (idx1 <= -1 || idx2 <= -1 || idx1 >= _model.fields.length || idx2 >= _model.fields.length) {
      return;
    }
    _model.fields[idx1] = _model.fields.splice(idx2, 1, _model.fields[idx1])[0];

    //call to the move field callback function if it's set
    if (this.moveFieldCallback) {
      this.moveFieldCallback(idx1, idx2);
    }
  };

  this.moveField = function(fromIdx, toIdx) {
    if ((fromIdx >= 0) && (toIdx <= _model.fields.length) && (fromIdx !== toIdx)) {
      var field = _model.fields.splice(fromIdx, 1)[0];
      if (toIdx > fromIdx)--toIdx;
      _model.fields.splice(toIdx, 0, field);

      //call to the move field callback function if it's set
      if (this.moveFieldCallback) {
        this.moveFieldCallback(fromIdx, toIdx);
      }
    }
  };

});
