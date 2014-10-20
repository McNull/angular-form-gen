fg.controller('fgTabsController', function () {

  this.items = [];
  this.active = null;

  this.add = function (item) {
    this.items.push(item);

    this.items.sort(function(x, y) {
      return x.order - y.order;
    });

    if (!this.active && item.autoActive != false) {
      this.activate(item);
    }
  };

  this.activate = function (item) {

    if(!item.disabled) {
      this.active = item;
    }

  };

});
