'use strict';

// для настройки окна (открыть/закрыть)
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupIcon = setupOpen.querySelector('.setup-open-icon');
// для настройки персонажа (имя, цвет(мантии, глаз, фаербола))
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
// данные для настройки персонажей
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

var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var wizardFamilyNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

// вспомогательные фенкции

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функции показа окна настроек
function openSetup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
}

function closeSetup() {
  setup.classList.add('hidden');
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
  if (evt.keyCode === 13) {
    openSetup();
  }
}

function onEscPress(evt) {
  if (evt.keyCode === 27 && setupUserName !== document.activeElement) {
    evt.preventDefault();
    closeSetup();
  }
}

function onSetupCloseEnterPress(evt) {
  if (evt.keyCode === 13 && setupClose === document.activeElement) {
    evt.preventDefault();
    closeSetup();
  }
}
// функции обработчики событий настроек персонажа
function onSetupWizardCoatClick() {
  var setupWizardCoatInput = setup.querySelector('input[name = coat-color]');
  var color = wizardCoatColors[getRandomInt(0, wizardCoatColors.length - 1)];

  setupWizardCoat.style.fill = color;
  setupWizardCoatInput.value = color;
}

function onSetupWizardEyesClick() {
  var setupWizardEyesInput = setup.querySelector('input[name = eyes-color]');
  var color = wizardEyesColors[getRandomInt(0, wizardEyesColors.length - 1)];

  setupWizardEyes.style.fill = color;
  setupWizardEyesInput.value = color;
}

function onSetupFireballClick() {
  var setupFireballInput = setupFireball.querySelector('input[name = fireball-color]');
  var color = wizardFireballColors[getRandomInt(0, wizardFireballColors.length - 1)];

  setupFireball.style.backgroundColor = color;
  setupFireballInput.value = color;
}

// функция для отрисовки волшебников

function drawWizards(quantity, coatColors, eyesColors, names, familyNames) {

  var characters = getWizards(quantity);
  var fragment = document.createDocumentFragment();
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function getWizards(number) {

    var wizards = [];

    for (var i = 0; i < number; i++) {
      var wizard = {
        name: names[getRandomInt(0, names.length - 1)] + ' ' + familyNames[getRandomInt(0, familyNames.length - 1)],
        coatColor: coatColors[getRandomInt(0, coatColors.length - 1)],
        eyesColor: eyesColors[getRandomInt(0, eyesColors.length - 1)]
      };
      wizards.push(wizard);
    }

    return wizards;
  }

  for (var i = 0; i < quantity; i++) {
    var wizard = similarWizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = characters[i].name;
    wizard.querySelector('.wizard-coat').style.fill = characters[i].coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = characters[i].eyesColor;
    fragment.appendChild(wizard);
  }

  return similarListElement.appendChild(fragment);
}

// добавление событий:
// показа окна
setupOpen.addEventListener('click', onSetupOpenClick);
setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onSetupCloseEnterPress);
setupIcon.addEventListener('keydown', onSetupIconEnterPress);
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
// настройки персонажа
setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
setupFireball.addEventListener('click', onSetupFireballClick);

// отрисовка волшебников

document.querySelector('.setup-similar').classList.remove('hidden');
drawWizards(4, wizardCoatColors, wizardEyesColors, wizardNames, wizardFamilyNames);
