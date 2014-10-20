angular.module('dq', []).factory('dqUtils', function($window, $rootScope) {

  var _dragData = null;

  //noinspection FunctionWithInconsistentReturnsJS
  return {
    getEvent: function (e) {
      return e && e.originalEvent ? e.originalEvent : e || $window.event;
    },
    stopEvent: function (e) {
      // e.cancelBubble is supported by IE8 -
      // this will kill the bubbling process.
      e.cancelBubble = true;
      e.bubbles = false;
      
      // e.stopPropagation works in modern browsers
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();

      return false;
    },
    dragData: function (data) {
      if (data === undefined) {
        return _dragData;
      }
      _dragData = data;
    },
    getParentArea: function ($scope) {
      var area = {};
      $scope.$emit('dqLocateArea', area);
      return area.name;
    },
    isAreaMatch: function ($scope) {
      var parentArea = this.getParentArea($scope);
      var eventArea = _dragData ? _dragData.area : "";

      return parentArea === eventArea;
    }
  };
});