'use strict';

var container = document.querySelector('div');
container.style.position = 'relative';
var imgs = document.querySelectorAll('img');
var startX = 0;


imgs.forEach(img => {
  img.style.position = 'absolute';
  img.classList.add('img');
  img.style.left = (10 + startX) + 'px';
  startX += (10 + img.offsetWidth);
  img.style.top = 10 + 'px';
});

var down = false;
var xInside, yInside;
container.addEventListener('mousedown', event => {
  if (event.target.classList.contains('img')) {
    event.preventDefault();
    down = true;
    event.target.style.cursor = 'pointer';
    event.target.style.zIndex = 5;
    xInside = event.pageX - event.target.offsetLeft - event.currentTarget.offsetLeft; //коорд клика внутри img
    yInside = event.pageY - event.target.offsetTop - event.currentTarget.offsetTop;
  }
});

container.addEventListener('mouseup', event => {
  event.preventDefault();
  event.target.style.cursor = 'default';
  down = false;
  imgs.forEach(item => {
    item.style.zIndex = 1;
  });
  event.target.style.zIndex = 0;
});

container.addEventListener('mousemove', event => {
  if (down) {
    if (event.target.classList.contains('img')) {
      event.preventDefault();
      // координаты клика внутри container  
      var insideContainerX = event.pageX - event.currentTarget.offsetLeft - xInside;
      var insideContainerY = event.pageY - event.currentTarget.offsetTop - yInside;
      event.target.style.left = insideContainerX + 'px';
      event.target.style.top = insideContainerY + 'px';
      // при столкновении container становится красным
      makeContainerLimits('clientHeight', insideContainerY, 'top');
      makeContainerLimits('clientWidth', insideContainerX, 'left');
      // container обычный
      if ((container.classList.value && insideContainerY > 0 && insideContainerY < container.clientHeight - event.target.clientHeight) && (container.classList.value && insideContainerX > 0 && insideContainerX < container.clientWidth - event.target.clientWidth)) container.classList.remove('alarm');
    }
  }

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