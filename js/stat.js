'use strict';

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length && arr.length > 0; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function getColor(r, g, b, a) {
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
  var maxTime = getMaxElement(times);

  function drawCloud(x, y, color, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  function drawText(text, x, y) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(text, x, y);
  }

  function drawSingleBar(x, y, height, width, color, player, result, playerY, resultY) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    drawText(player, x, playerY);
    drawText(result, x, resultY);
  }

  function isCurrentColor(name) {
    return name === 'Вы' ? currentColor : getColor(getRandomInt(0, 255), getRandomInt(0, 255), 255, 1);
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
