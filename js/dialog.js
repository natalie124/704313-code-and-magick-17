'use strict';

var setup = document.querySelector('.setup');
var dialogHandle = setup.querySelector('.upload');
var shopElement = document.querySelector('.setup-artifacts-shop');

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
function onShopElementDragAndDrop(evt) {
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  function onArtifactsElementDragover(dragoverEvt) {
    dragoverEvt.preventDefault();
    return false;
  }

  function onArtifactElementDrop(dropEvt) {
    dropEvt.preventDefault();
    dropEvt.target.style.backgroundColor = '';
    dropEvt.target.appendChild(draggedItem);
  }

  function onArtifactElementDragenter(dragenterEvt) {
    dragenterEvt.target.style.backgroundColor = 'yellow';
    dragenterEvt.preventDefault();
  }

  function onArtifactElementDragleave(dragleaveEvt) {
    dragleaveEvt.target.style.backgroundColor = '';
    dragleaveEvt.preventDefault();
  }

  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }

  artifactsElement.addEventListener('dragover', onArtifactsElementDragover);
  artifactsElement.addEventListener('drop', onArtifactElementDrop);
  artifactsElement.addEventListener('dragenter', onArtifactElementDragenter);
  artifactsElement.addEventListener('dragleave', onArtifactElementDragleave);
}

dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
shopElement.addEventListener('dragstart', onShopElementDragAndDrop);
