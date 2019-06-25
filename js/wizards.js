'use strict';

(function () {

  var QUANTITY = 4;
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
          name: names[window.util.getRandomInt(0, names.length - 1)] + ' ' + familyNames[window.util.getRandomInt(0, familyNames.length - 1)],
          coatColor: coatColors[window.util.getRandomInt(0, coatColors.length - 1)],
          eyesColor: eyesColors[window.util.getRandomInt(0, eyesColors.length - 1)]
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

  // отрисовка волшебников

  document.querySelector('.setup-similar').classList.remove('hidden');
  drawWizards(QUANTITY, window.data.wizardCoatColors, window.data.
wizardEyesColors, window.data.wizardNames, window.data.wizardFamilyNames);

})();
