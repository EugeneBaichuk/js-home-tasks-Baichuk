'use strict';

var container = document.querySelector('div');
container.style.position = 'relative';
var imgs = document.querySelectorAll('img');

var startX = 0; //устанавливаем стартовое положение картинок
var startY = 0;
imgs.forEach(img => {
  img.style.position = 'absolute';
  img.style.left = (10 + startX) + 'px';
  startX += (10 + img.offsetWidth);
  img.style.top = (10 + startY) + 'px';
  if ((startX + img.offsetWidth) > container.clientWidth) {
    startX = 0;
    startY += (10 + img.offsetHeight);
  }
});

var down = false;
var xInside, yInside;
container.addEventListener('mousedown', function (event) {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
    down = true;
    event.target.style.cursor = 'pointer';
    event.target.style.zIndex = 5;
    xInside = event.pageX - event.target.offsetLeft - this.offsetLeft; //координаты клика внутри img
    yInside = event.pageY - event.target.offsetTop - this.offsetTop;
  }
});

container.addEventListener('mousemove', function (event) {
  if (down) {
    if (event.target.tagName === 'IMG') {
      event.preventDefault();
      // находим координаты клика внутри container и меняем положение img  
      var insideContainerX = event.pageX - this.offsetLeft - xInside;
      var insideContainerY = event.pageY - this.offsetTop - yInside;
      event.target.style.left = insideContainerX + 'px';
      event.target.style.top = insideContainerY + 'px';
      //огр. область перемещения картинок размером контейнера + меняем border у контейнера на красный
      addAlarm(insideContainerX, insideContainerY, this);
    }
  }
});

container.addEventListener('mouseup', event => {
  event.preventDefault();
  down = false;
  event.target.style.cursor = 'default';
  imgs.forEach(item => {
    item.style.zIndex = 1;
  });
  event.target.style.zIndex = 0; //картинка падает на самый нижний слой
});

function addAlarm(x, y, container) {
  makeLimits('clientHeight', y, 'top', container);
  makeLimits('clientWidth', x, 'left', container);
  if ((y > 0 && y < container.clientHeight - event.target.clientHeight) && (x > 0 && x < container.clientWidth - event.target.clientWidth)) {
    container.classList.remove('alarm');
  }
}

function makeLimits(limit, position, side, container) {
  var heightLimit = container[limit] - event.target[limit];
  if (position <= 0) {
    event.target.style[side] = 0 + 'px';
    container.classList.add('alarm');
  } else if (position >= heightLimit) {
    event.target.style[side] = heightLimit + 'px';
    container.classList.add('alarm');
  }
}

container.addEventListener('mouseover', function () {
  if (this.classList.contains('end')) {
    this.classList.remove('end'); // для плавной анимации в обе стороны
  }
  this.classList.add('start');
});

container.addEventListener('mouseout', function () {
  this.classList.remove('start');
  this.classList.add('end');
});