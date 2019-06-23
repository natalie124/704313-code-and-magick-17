'use strict';

var setup = document.querySelector('.setup');
var dialogHandle = setup.querySelector('.upload');
var shop = setup.querySelector('.setup-artifacts-shop');

// функция обработчик перетаскивания окна setup
function onDialogHandleMouseDown(evt) {
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    if (setup.offsetLeft < setup.offsetWidth / 2) {
      setup.style.left = setup.offsetWidth / 2 + 'px';
    }
    if (setup.offsetLeft > screen.width - setup.offsetWidth / 2) {
      setup.style.left = screen.width - setup.offsetWidth / 2 + 'px';
    }
    if (setup.offsetTop < 0) {
      setup.style.top = 0;
    }
    if (setup.offsetTop > screen.height - setup.offsetHeight / 2) {
      setup.style.top = screen.height - setup.offsetHeight / 2 + 'px';
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    function onClickPreventDefault(dragEvt) {
      dragEvt.preventDefault();
      dialogHandle.removeEventListener('click', onClickPreventDefault);
    }

    if (dragged) {
      dialogHandle.addEventListener('click', onClickPreventDefault);
    }
  }
  evt.preventDefault();
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// функция обработчик перетаскивания предметов из рюкзака
function onShopMouseDown(evt) {
  var backpack = setup.querySelector('.setup-artifacts');
  var artifactCell = setup.querySelector('.setup-artifacts-cell');
  var artifact = evt.target;
  var defaultCoords = {
    x: artifact.offsetLeft,
    y: artifact.offsetTop
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    artifact.style.top = (artifact.offsetTop - shift.y) + 'px';
    artifact.style.left = (artifact.offsetLeft - shift.x) + 'px';
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    if (artifact.offsetLeft < backpack.offsetLeft - artifactCell.offsetWidth / 2.5 ||
        artifact.offsetLeft > backpack.offsetLeft + backpack.offsetWidth - artifactCell.offsetWidth ||
        artifact.offsetTop < backpack.offsetTop + backpack.offsetHeight / 2 + artifactCell.offsetHeight ||
        artifact.offsetTop > backpack.offsetTop + backpack.offsetHeight * 2 - artifactCell.offsetHeight * 1.5) {

      artifact.style.top = defaultCoords.y + 'px';
      artifact.style.left = defaultCoords.x + 'px';
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  if (artifact.tagName === 'IMG') {

    artifact.style.position = 'absolute';

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}

dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
shop.addEventListener('mousedown', onShopMouseDown);
