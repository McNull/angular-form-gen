fg.controller('fgTabsController', function ($scope) {

  this.items = [];
  this.active = null;
  this.activeIndex = -1;
  
  this.add = function (item) {
    this.items.push(item);

    this.items.sort(function (x, y) {
      return x.order - y.order;
    });

    if (!$scope.active && item.autoActive != false) {
      this.activate(item);
    }
  };

  this.activate = function (itemOrIndex) {

    var idx = -1, item;
    
    if (isNaN(itemOrIndex)) {
      
      // Locate the item index
      
      item = itemOrIndex;
      var i = this.items.length;

      while (i--) {
        if (this.items[i] === item) {
          idx = i;
          break;
        }
      }

      if (idx === -1) {
        throw new Error('Cannot activate pane: not found in pane list.');
      }
    } else {
      
      // Grab the item at the provided index
      
      idx = itemOrIndex;
      
      if(idx < 0 || idx >= this.items.length) {
        throw new Error('Cannot activate pane: index out of bounds.')
      }
      
      item = this.items[idx];
    }

    if (!item.disabled) {
      this.active = $scope.active = item;
      this.activeIndex = $scope.activeIndex = idx;
    }

  };

});