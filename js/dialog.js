'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupIcon = setupOpen.querySelector('.setup-open-icon');
  var setupUserName = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');
  var setupButton = setup.querySelector('.setup-submit');
  /**
   * выводит сообщение об ошибке, если ошибка возникла
   * @param {string} errorMessage сообщение об ошибке
   *
   */
  function onError(errorMessage) {
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
  /**
   * открывает окно настройки персонажа
   *
   */
  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    window.backend.load(window.similar.success, onError);
  }
  /**
   * закрывает окно настройки персонажа
   *
   */
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
  /**
   * обработчик события нажатия Enter на иконке окна настроек персонажа
   * @param {object} evt объект события
   *
   */
  function onSetupIconEnterPress(evt) {
    window.util.isEnterEvent(evt, openSetup);
  }
  /**
   * обработчик события нажатия Esc
   * @param {object} evt объект события
   *
   */
  function onEscPress(evt) {
    if (setupUserName !== document.activeElement) {
      evt.preventDefault();
      window.util.isEscEvent(evt, closeSetup);
    }
  }
  /**
   * обработчик события нажатия Enter на кнопке закрытия окна настроек персонажа
   * @param {object} evt объект события
   *
   */
  function onSetupCloseEnterPress(evt) {
    if (setupClose === document.activeElement) {
      evt.preventDefault();
      window.util.isEnterEvent(evt, closeSetup);
    }
  }
  /**
   * обработчик события submit формы окна настроек
   * @param {object} evt объект события
   *
   */
  function onFormSubmit(evt) {
    setupButton.disabled = true;
    window.backend.save(new FormData(form), closeSetup, onError);
    evt.preventDefault();
  }
  setupOpen.addEventListener('click', openSetup);
  setupClose.addEventListener('click', closeSetup);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  setupIcon.addEventListener('keydown', onSetupIconEnterPress);
  form.addEventListener('submit', onFormSubmit);
})();
