'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupUserName = setup.querySelector('.setup-user-name');

  var setupWizard = setup.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');

  // функции обработчики событий настроек персонажа

  function onSetupWizardCoatClick() {
    var setupWizardCoatInput = setup.querySelector('input[name = coat-color]');
    var color = window.data.wizardCoatColors[window.util.getRandomInt(0, window.data.wizardCoatColors.length - 1)];

    setupWizardCoat.style.fill = color;
    setupWizardCoatInput.value = color;
  }

  function onSetupWizardEyesClick() {
    var setupWizardEyesInput = setup.querySelector('input[name = eyes-color]');
    var color = window.data.wizardEyesColors[window.util.getRandomInt(0, window.data.wizardEyesColors.length - 1)];

    setupWizardEyes.style.fill = color;
    setupWizardEyesInput.value = color;
  }

  function onSetupFireballClick() {
    var setupFireballInput = setupFireball.querySelector('input[name = fireball-color]');
    var color = window.data.wizardFireballColors[window.util.getRandomInt(0, window.data.wizardFireballColors.length - 1)];

    setupFireball.style.backgroundColor = color;
    setupFireballInput.value = color;
  }

  // валидации поля для ввода имени персонажа

  setupUserName.addEventListener('invalid', function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-x символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Обязательное поле');
    } else {
      setupUserName.setCustomValidity('');
    }
  });

  // добавление событий настройки персонажа

  setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
  setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
  setupFireball.addEventListener('click', onSetupFireballClick);

})();
