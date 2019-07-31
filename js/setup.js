'use strict';
(function () {
  var WizardColor = {
    COAT: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    EYES: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    FIREBALL: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };
  var setup = document.querySelector('.setup');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupWizard = setup.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var setupFireballInput = setupFireball.querySelector('input[name = fireball-color]');
  var setupWizardCoatInput = setup.querySelector('input[name = coat-color]');
  var setupWizardEyesInput = setup.querySelector('input[name = eyes-color]');


  var Color = {
    COAT: setupWizardCoatInput.value,
    EYES: setupWizardEyesInput.value
  };
  /**
   * функция обработчик события click по плащу персонажа
   *
   */
  function onSetupWizardCoatClick() {
    var color = WizardColor.COAT[window.util.getRandomInt(0, WizardColor.COAT.length - 1)];

    setupWizardCoat.style.fill = color;
    setupWizardCoatInput.value = color;
    Color.COAT = color;
    window.util.debounce(function () {
      window.similar.update();
    });
  }
  /**
   * функция обработчик события click по глазам персонажа
   *
   */
  function onSetupWizardEyesClick() {
    var color = WizardColor.EYES[window.util.getRandomInt(0, WizardColor.EYES.length - 1)];

    setupWizardEyes.style.fill = color;
    setupWizardEyesInput.value = color;
    Color.EYES = color;
    window.util.debounce(function () {
      window.similar.update();
    });
  }
  /**
   * функция обработчик события click по файерболу персонажа
   *
   */
  function onSetupFireballClick() {
    var color = WizardColor.FIREBALL[window.util.getRandomInt(0, WizardColor.FIREBALL.length - 1)];

    setupFireball.style.backgroundColor = color;
    setupFireballInput.value = color;
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
  window.setup = {
    color: Color
  };
})();
