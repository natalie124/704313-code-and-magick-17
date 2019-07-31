'use strict';
(function () {
  var shopElement = document.querySelector('.setup-artifacts-shop');
  /**
   * обработчик перетаскивания предметов из магазина в рюкзак
   * @param {object} evt объект события
   *
   */
  function onShopElementDragAndDrop(evt) {
    var artifactsElement = document.querySelector('.setup-artifacts');
    var draggedItem = null;
    /**
     * обработчик события dragover
     * @param {object} dragoverEvt объект события
     * @return {boolean} false
     *
     */
    function onArtifactsElementDragover(dragoverEvt) {
      dragoverEvt.preventDefault();
      return false;
    }
    /**
     * обработчик события drop
     * @param {object} dropEvt объект события
     *
     */
    function onArtifactElementDrop(dropEvt) {
      dropEvt.preventDefault();
      dropEvt.target.style.backgroundColor = '';
      dropEvt.target.appendChild(draggedItem);
    }
    /**
     * обработчик события dragenter
     * @param {object} dragenterEvt объект события
     *
     */
    function onArtifactElementDragenter(dragenterEvt) {
      dragenterEvt.target.style.backgroundColor = 'yellow';
      dragenterEvt.preventDefault();
    }
    /**
     * обработчик события dragleave
     * @param {object} dragleaveEvt объект события
     *
     */
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
