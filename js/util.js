'use strict';
(function () {
  var Code = {
    ENTER: 13,
    ESC: 27
  };
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout = null;
  window.util = {
    /**
     * обрабатывает событие при нажатии  Esc
     *
     * @param {object} evt объект события
     * @param {function}  action действие, когда событие сработает
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Code.ESC) {
        action();
      }
    },
    /**
     * обрабатывает событие при нажатии  Enter
     *
     * @param {object} evt объект события
     * @param {function}  action действие, когда событие сработает
     */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Code.ENTER) {
        action();
      }
    },
    /**
     * получает рандомное число в диапазоне
     *
     * @param {number} min минимальное значение
     * @param {number} max максимальное значение
     * @return {number} число
     */
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * получает максимальный элемент в массиве (с числами)
     *
     * @param {array} arr
     * @return {number} число
     */
    getMaxElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 0; i < arr.length && arr.length > 0; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    /**
     * получает цвет в формате rgba
     *
     * @param {number} r число в диапазоне от 0 до 255
     * @param {number} g число в диапазоне от 0 до 255
     * @param {number} b число в диапазоне от 0 до 255
     * @param {number} a число в диапазоне от 0 до 255
     * @return {string} цвет
     */
    getColor: function (r, g, b, a) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    },
    /**
     * сравнивает строки
     *
     * @param {string} left
     * @param {string} right
     * @return {number}
     */
    namesComparator: function (left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    },
    /**
     * возвращает обертку, которая откладывает вызов исходной функции на определенное время
     *
     * @param {function} cb функция обертка с исходной функцией
     */
    debounce: function (cb) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
})();
