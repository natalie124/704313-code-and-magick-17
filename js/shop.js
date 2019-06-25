'use strict';

(function () {

  var shopElement = document.querySelector('.setup-artifacts-shop');

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

  shopElement.addEventListener('dragstart', onShopElementDragAndDrop);

})();
