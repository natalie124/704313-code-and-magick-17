'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupIcon = setupOpen.querySelector('.setup-open-icon');
  var setupUserName = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');
  var setupButton = setup.querySelector('.setup-submit');

// открывает окно настройки
  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    window.backend.load(window.similar.success, window.util.errorHandler);
  }
// закрывает окно настройки
  function closeSetup() {
    var error = document.querySelector('.error-js');

    setup.classList.add('hidden');
    setup.removeAttribute('style');
    setupButton.disabled = false;
    window.similar.remove();

    if (error !== null) {
      error.remove();
    }
    document.removeEventListener('keydown', onEscPress);
  }

  // функции обработчки событий окна настроек

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

  // функция обработчик события отправки формы

  function onFormSubmit(evt) {
    var error = document.querySelector('.error-js');

    setupButton.disabled = true;

    window.backend.save(new FormData(form), closeSetup, window.util.errorHandler);

    evt.preventDefault();
  }

  setupOpen.addEventListener('click', openSetup);
  setupClose.addEventListener('click', closeSetup);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  setupIcon.addEventListener('keydown', onSetupIconEnterPress);
  form.addEventListener('submit', onFormSubmit);

})();
