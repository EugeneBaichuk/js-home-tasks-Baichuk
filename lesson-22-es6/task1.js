'use strict';

let startWrapper = document.getElementById('page');
init();

function init() {
  startWrapper.innerHTML = 'Загрузка... Спасибо за ожидание. Вы клевые';
  articlesStorage.getAjaxString(renderNewState);
  window.onhashchange = renderNewState;
};

function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    switchToState({
      page: 'first'
    });
  } else {
    state = JSON.parse(state);
  }

  switch (state.page) {
    case 'first':
      articlesStorage.renderFirstPage();
      break;
    case 'second':
      articlesStorage.renderSecondPage();
      break;
    default:
      articlesStorage.renderThirdPage(state.page);
      break;
  }
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

function switchToFirst() {
  switchToState({
    page: 'first'
  });
}

function switchToSecond() {
  switchToState({
    page: 'second'
  });
}

function switchToThird(state) {
  switchToState({
    page: `${state}`
  });
}