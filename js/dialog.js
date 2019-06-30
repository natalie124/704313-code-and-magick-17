'use strict';

(function () {

  var QUANTITY = 4;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupIcon = setupOpen.querySelector('.setup-open-icon');
  var setupUserName = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');
  var setupButton = setup.querySelector('.setup-submit');

  function renderWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function successHandler(wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  }

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
  }

  // функции показа окна настроек

  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    window.backend.load(successHandler, errorHandler);
  }

  function closeSetup() {
    var error = document.querySelector('.error-js');

    setup.classList.add('hidden');
    setup.removeAttribute('style');

    if (error !== null) {
      error.remove();
      setupButton.disabled = false;
    }
    document.removeEventListener('keydown', onEscPress);
  }

  // функции обработчки событий показа окна настроек

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

    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
      setupButton.disabled = false;
    }, errorHandler);

    if (error !== null) {
      error.remove();
    }

    evt.preventDefault();
  }

  setupOpen.addEventListener('click', openSetup);
  setupClose.addEventListener('click', closeSetup);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  setupIcon.addEventListener('keydown', onSetupIconEnterPress);
  form.addEventListener('submit', onFormSubmit);

})();
