'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawWizards(quantity) {

  var characters = getWizards(quantity);
  var fragment = document.createDocumentFragment();
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function getWizards(number) {
    var names = [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ];

    var familyNames = [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг'
    ];

    var coatColors = [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ];

    var eyesColors = [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ];

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

  similarListElement.appendChild(fragment);

  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
}

drawWizards(4);
