'use strict';

(function () {

  var Code = {
    ENTER: 13,
    ESC: 27
  };
  var DEBOUNCE_INTERVAL = 300;

  var lastTimeout = null;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Code.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Code.ENTER) {
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
    },
    errrorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.classList.add('error-js');

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);

      setupButton.disabled = false;
    },
    namesComparator: function (left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    },
    debounce: function (cb) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };

})();
