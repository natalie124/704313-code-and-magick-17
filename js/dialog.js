'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupIcon = setupOpen.querySelector('.setup-open-icon');
  var setupUserName = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');
  var setupButton = setup.querySelector('.setup-submit');

  // показывает текст ошибки на странице

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.classList.add('error-js');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    setupButton.disabled = false;
  }

  // открывает окно настройки
  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    window.backend.load(window.similar.success, errorHandler);
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
    setupButton.disabled = true;
    window.backend.save(new FormData(form), closeSetup, errorHandler);
    evt.preventDefault();
  }

  setupOpen.addEventListener('click', openSetup);
  setupClose.addEventListener('click', closeSetup);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  setupIcon.addEventListener('keydown', onSetupIconEnterPress);
  form.addEventListener('submit', onFormSubmit);

})();
