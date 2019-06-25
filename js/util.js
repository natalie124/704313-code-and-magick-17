'use strict';

(function () {

  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESC = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        action();
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getMaxElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 0; i < arr.length && arr.length > 0; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }

      return maxElement;
    },
    getColor: function (r, g, b, a) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }
  };

})();
