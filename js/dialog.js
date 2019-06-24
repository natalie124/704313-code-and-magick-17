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
    var dialogHandleLeft = setup.offsetLeft;
    var dialogHandleTop = setup.offsetTop;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    moveEvt.preventDefault();

    dragged = true;

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    dialogHandleTop = (dialogHandleTop - shift.y);
    dialogHandleLeft = (dialogHandleLeft - shift.x);

    if (dialogHandleLeft < setup.offsetWidth / 2) {
      dialogHandleLeft = setup.offsetWidth / 2;
    }
    if (dialogHandleLeft > document.body.clientWidth - setup.offsetWidth / 2) {
      dialogHandleLeft = document.body.clientWidth - setup.offsetWidth / 2;
    }
    if (setup.offsetTop < 0) {
      dialogHandleTop = 0;
    }
    if (dialogHandleTop > screen.height - setup.offsetHeight / 2) {
      dialogHandleTop = screen.height - setup.offsetHeight / 2;
    }

    setup.style.left = dialogHandleLeft + 'px';
    setup.style.top = dialogHandleTop + 'px';
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

// функция обработчик перетаскивания предметов из магазина в рюкзак
function onShopMouseDown(evt) {
  var backpack = setup.querySelector('.setup-artifacts');
  var artifactCell = setup.querySelector('.setup-artifacts-cell');
  var artifact = evt.target;
  var defaultCoords = {
    x: artifact.offsetLeft,
    y: artifact.offsetTop
  };

  function onMouseMove(moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    moveEvt.preventDefault();

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
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    artifact.style.position = 'absolute';

    evt.preventDefault();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}

dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
shop.addEventListener('mousedown', onShopMouseDown);
