'use strict';
(function () {
  /**
   * отрисовывает статистику
   * @param {object} ctx canvas
   * @param {array} names массив с именами игроков
   * @param {array} times массив с временем прохождения игры
   *
   */
  window.renderStatistics = function (ctx, names, times) {
    var CLOUD_WIDTH = 420;
    var CLOUD_HEIGHT = 270;
    var CLOUD_X = 100;
    var CLOUD_Y = 10;
    var GAP = 10;
    var TEXT_HEIGHT = 20;
    var BAR_WIDTH = 40;
    var BAR_HEIGHT = 150;
    var currentColor = 'rgba(255, 0, 0, 1)';
    var maxTime = window.util.getMaxElement(times);
    /**
     * отрисовывает облако
     * @param {number} x кооордината
     * @param {number} y кооордината
     * @param {string} color цвет
     * @param {number} width ширина
     * @param {number} height высота
     */
    function drawCloud(x, y, color, width, height) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
    /**
     * отрисовывает текст
     * @param {string} text текст
     * @param {number} x кооордината
     * @param {number} y кооордината
     */
    function drawText(text, x, y) {
      ctx.fillStyle = '#000';
      ctx.font = '16px PT Mono';
      ctx.fillText(text, x, y);
    }
    /**
     * отрисовывает одну колонку
     * @param {number} x кооордината
     * @param {number} y кооордината
     * @param {number} height высота
     * @param {number} width ширина
     * @param {string} color цвет
     * @param {string} player имя игрока
     * @param {object} result время прохождения игры
     * @param {number} playerY кооордината для отрисовке на облаке
     * @param {number} resultY кооордината для отрисовке на облаке
     */
    function drawSingleBar(x, y, height, width, color, player, result, playerY, resultY) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
      drawText(player, x, playerY);
      drawText(result, x, resultY);
    }
    /**
     * возвращает цвет колонки
     * @param {string} name имя игрока
     * @return {string} цвет
     */
    function isCurrentColor(name) {
      return name === 'Вы' ? currentColor : window.util.getColor(window.util.getRandomInt(0, 255), window.util.getRandomInt(0, 255), 255, 1);
    }
    drawCloud(
        CLOUD_X + GAP,
        CLOUD_Y + GAP,
        'rgba(0, 0, 0, 0.7)',
        CLOUD_WIDTH,
        CLOUD_HEIGHT
    );
    drawCloud(
        CLOUD_X,
        CLOUD_Y,
        '#fff',
        CLOUD_WIDTH,
        CLOUD_HEIGHT
    );
    drawText(
        'Ура вы победили!',
        CLOUD_X + GAP * 5,
        CLOUD_Y + GAP + TEXT_HEIGHT
    );
    drawText(
        'Список результатов: ',
        CLOUD_X + GAP * 5,
        CLOUD_Y + GAP + TEXT_HEIGHT * 2
    );
    for (var i = 0; i < names.length; i++) {
      drawSingleBar(
          CLOUD_X + GAP * 5 + GAP * 8 * i,
          CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - GAP - TEXT_HEIGHT,
          (BAR_HEIGHT * times[i]) / maxTime,
          BAR_WIDTH,
          isCurrentColor(names[i]),
          Math.round(times[i]),
          names[i],
          CLOUD_HEIGHT - GAP,
          CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - GAP * 2 - TEXT_HEIGHT
      );
    }
  };
})();
