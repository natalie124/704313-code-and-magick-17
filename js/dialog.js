'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupIcon = setupOpen.querySelector('.setup-open-icon');
  var setupUserName = setup.querySelector('.setup-user-name');

  // функции показа окна настроек

  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  }

  function closeSetup() {
    setup.classList.add('hidden');
    setup.removeAttribute('style');
    document.removeEventListener('keydown', onEscPress);
  }

  // функции обработчки событий показа окна настроек

  function onSetupOpenClick() {
    openSetup();
  }

  function onSetupCloseClick() {
    closeSetup();
  }

  function onSetupIconEnterPress(evt) {
    window.util.isEnterEvent(evt, openSetup);
  }

  function onEscPress(evt) {
    if (setupUserName !== document.activeElement) {
      evt.preventDefault();
      window.util.isEscEvent(evt, closeSetup);
    }
  }

  function onSetupCloseEnterPress(evt) {
    if (setupClose === document.activeElement) {
      evt.preventDefault();
      window.util.isEnterEvent(evt, closeSetup);
    }
  }

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  setupIcon.addEventListener('keydown', onSetupIconEnterPress);

})();
