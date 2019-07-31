'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var dialogHandle = setup.querySelector('.upload');
  /**
   * обработчик события перетаскивая окна настроек персонажа
   * @param {object} evt объект события
   *
   */
  function onDialogHandleMouseDown(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    /**
     * обработчик события mouse move
     * @param {object} moveEvt объект события
     *
     */
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
    /**
     * обработчик события mouse up
     * @param {object} upEvt объект события
     *
     */
    function onMouseUp(upEvt) {
      /**
       * обработчик события click
       * @param {object} dragEvt объект события
       *
       */
      function onClickPreventDefault(dragEvt) {
        dragEvt.preventDefault();
        dialogHandle.removeEventListener('click', onClickPreventDefault);
      }
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    }
    evt.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  dialogHandle.addEventListener('mousedown', onDialogHandleMouseDown);
})();
