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

var xInside, yInside;
var img;
container.addEventListener('mousedown', mouseDown, false);

function mouseDown(event) {
  img = event.target;
  if (img.tagName === 'IMG') {
    event.preventDefault();
    img.style.cursor = 'pointer';
    img.style.zIndex = 5; //картинка падает на самый нижний слой
    xInside = event.pageX - img.offsetLeft - this.offsetLeft; //координаты клика внутри img
    yInside = event.pageY - img.offsetTop - this.offsetTop;
  }

  container.addEventListener('mousemove', mouseMove, false);
  container.addEventListener('mouseup', mouseUp, false);
}

function mouseMove(event) {
  if (img.tagName === 'IMG') {
    event.preventDefault();
    // находим координаты клика внутри container и меняем положение img  
    var insideContainerX = event.pageX - this.offsetLeft - xInside;
    var insideContainerY = event.pageY - this.offsetTop - yInside;
    img.style.left = insideContainerX + 'px';
    img.style.top = insideContainerY + 'px';
    //огр. область перемещения картинок размером контейнера + меняем border у контейнера на красный
    addAlarm(insideContainerX, insideContainerY, this);
  }
}

function mouseUp(event) {
  event.preventDefault();
  img.style.cursor = 'default';
  img.style.zIndex = 1;
  container.removeEventListener('mousemove', mouseMove);
  container.removeEventListener('mouseup', mouseUp);
}

function addAlarm(x, y, container) {
  makeLimits('clientHeight', y, 'top', container);
  makeLimits('clientWidth', x, 'left', container);
  if ((y > 0 && y < container.clientHeight - img.clientHeight) && (x > 0 && x < container.clientWidth - img.clientWidth)) {
    container.classList.remove('alarm');
  }
}

function makeLimits(limit, position, side, container) {
  var heightLimit = container[limit] - img[limit];
  if (position <= 0) {
    img.style[side] = 0 + 'px';
    container.classList.add('alarm');
  } else if (position >= heightLimit) {
    img.style[side] = heightLimit + 'px';
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