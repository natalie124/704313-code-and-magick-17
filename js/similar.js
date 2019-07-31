'use strict';
(function () {

  var QUANTITY = 4; // количество волшебников для отрисовки

  var Rank = { // рейтинг похожести волшебников на основе его характеристик
    COAT: 2,
    EYES: 1
  };

  var wizards = []; // массив с данными волшебников

  var setup = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');

  // возвращает разметку с данными одного волшебника

  function renderWizard(wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  // рисует волшебников на странице
  function renderWizards(wizardsList) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY; i++) {
      fragment.appendChild(renderWizard(wizardsList[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  }

  // удаляет волшебников со страницы

  function removeWizards() {
    var wizardsList = similarListElement.querySelectorAll('.setup-similar-item');

    wizardsList.forEach(function (wizard) {
      wizard.remove();
    });
  }

  // получает рейтинг похожести волшебника

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.setup.color.COAT) {
      rank += Rank.COAT;
    }
    if (wizard.colorEyes === window.setup.color.EYES) {
      rank += Rank.EYES;
    }

    return rank;
  }

  //  рисует волшебников на основе рейтига похожести
  function updateWizards() {
    removeWizards();
    renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.util.namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  // при успешном получении данных с сервера рисует волшебников на странице
  function successHandler(data) {
    wizards = data;
    updateWizards();
  }

  window.similar = {
    remove: removeWizards,
    update: updateWizards,
    success: successHandler
  };
})();
