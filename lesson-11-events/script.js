'use strict';

var container = document.querySelector('div');
container.style.position = 'relative';
var imgs = document.querySelectorAll('img');
var startX = 0;
var startY = 0;
//устанавливаем стартовое положение картинок 
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
container.addEventListener('mousedown', event => {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
    down = true;
    event.target.style.cursor = 'pointer';
    event.target.style.zIndex = 5;
    xInside = event.pageX - event.target.offsetLeft - event.currentTarget.offsetLeft; //коорд клика внутри img
    yInside = event.pageY - event.target.offsetTop - event.currentTarget.offsetTop;
    console.dir(event.target);
  }
});

container.addEventListener('mousemove', event => {
  if (down) {
    if (event.target.tagName === 'IMG') {
      event.preventDefault();
      // находим координаты клика внутри container и меняем положение img  
      var insideContainerX = event.pageX - event.currentTarget.offsetLeft - xInside;
      var insideContainerY = event.pageY - event.currentTarget.offsetTop - yInside;
      event.target.style.left = insideContainerX + 'px';
      event.target.style.top = insideContainerY + 'px';
      // при столкновении с краем - border у контейнера становится красным
      makeContainerLimits('clientHeight', insideContainerY, 'top');
      makeContainerLimits('clientWidth', insideContainerX, 'left');
      // border снова обычный
      if ((insideContainerY > 0 && insideContainerY < container.clientHeight - event.target.clientHeight) && (insideContainerX > 0 && insideContainerX < container.clientWidth - event.target.clientWidth)) {
        container.classList.remove('alarm');
      }
    }
  }

  container.addEventListener('mouseup', event => {
    event.preventDefault();
    down = false;
    event.target.style.cursor = 'default';
    imgs.forEach(item => {
      item.style.zIndex = 1;
    });
    event.target.style.zIndex = 0; // при mouseup картинка падает на самый нижний слой
  });
  // ограничение области перемещения картинок размером контейнера
  function makeContainerLimits(limit, position, side) {
    var heightLimit = container[limit] - event.target[limit];
    if (position <= 0) {
      event.target.style[side] = 0 + 'px';
      container.classList.add('alarm');
    } else if (position >= heightLimit) {
      event.target.style[side] = heightLimit + 'px';
      container.classList.add('alarm');
    }
  }
});
// два класса для плавной анимации в обе стороны
container.addEventListener('mouseover', () => {
  if (container.classList.contains('end')) {
    container.classList.remove('end');
  }
  container.classList.add('start');
});

container.addEventListener('mouseout', () => {
  container.classList.remove('start');
  container.classList.add('end');
});