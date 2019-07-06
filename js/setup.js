'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupUserName = setup.querySelector('.setup-user-name');

  var setupWizard = setup.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');

  var setupWizardCoatInput = setup.querySelector('input[name = coat-color]');
  var setupWizardEyesInput = setup.querySelector('input[name = eyes-color]');
  var setupFireballInput = setupFireball.querySelector('input[name = fireball-color]');

  var wizardCoatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var wizardEyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var wizardFireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  window.Color = {
    COAT: setupWizardCoatInput.value,
    EYES: setupWizardEyesInput.value
  }

  // функции обработчики событий настроек персонажа

  function onSetupWizardCoatClick() {

    var color = wizardCoatColors[window.util.getRandomInt(0, wizardCoatColors.length - 1)];

    this.style.fill = color;
    this.value = color;
    window.util.debounce(function () {
      Color.COAT = color;
      window.similar.update();
    });
  }

  function onSetupWizardEyesClick() {

    var color = wizardEyesColors[window.util.getRandomInt(0, wizardEyesColors.length - 1)];

    this.style.fill = color;
    this.value = color;

    window.util.debounce(function () {
      Color.EYES = color;
      window.similar.update();
    });
  }

  function onSetupFireballClick() {

    var color = wizardFireballColors[window.util.getRandomInt(0, wizardFireballColors.length - 1)];

    this.style.backgroundColor = color;
    this.value = color;
  }

  // валидации поля для ввода имени персонажа

  setupUserName.addEventListener('invalid', function () {
    var message = '';
    if (setupUserName.validity.tooShort) {
      message = 'Имя должно состоять минимум из 2-x символов';
    } else if (setupUserName.validity.valueMissing) {
      message = 'Обязательное поле';
    }
    setupUserName.setCustomValidity(message);
  });

  // добавление событий настройки персонажа

  setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
  setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
  setupFireball.addEventListener('click', onSetupFireballClick);

})();
