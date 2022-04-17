'use strict';

(function () {
  const wrapper = document.getElementById('wrapper');
  const baseRadius = 310; //радиус циферблата
  const numbersBaseRadius = baseRadius / 2.5; //радиус оси цифр циферблата
  const circleRadius = 30; // радиус кружков с цифрами
  const fontSize = 16; // шрифт
  const dotSize = 16; //размер точки в центре часов
  wrapper.appendChild(createWatch());
  tickTimer();

  // UI
  function createWatch() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute('width', baseRadius);
    svg.setAttribute('height', baseRadius);
    let base = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    base.style = 'cx:155; cy:155; r:150; fill:rgb(255,255,255); stroke:gray; stroke-width: 10';
    svg.appendChild(base);
    svg.appendChild(createClockFace());
    svg.appendChild(createDigitalWatch());
    svg.appendChild(createArrow('hours', 80, 5));
    svg.appendChild(createArrow('minutes', 100, 3));
    svg.appendChild(createArrow('seconds', 120, 1));
    svg.appendChild(createCircle((baseRadius / 2), (baseRadius / 2), 8, 'black'));
    return svg;

    function createClockFace() {
      let clockFace = document.createElementNS("http://www.w3.org/2000/svg", 'g');
      for (let number = 1; number <= 12; number++) {
        let angle = number * 30 / 180 * Math.PI;
        let x = ((baseRadius) / 2) + Math.round(Math.sin(angle) * numbersBaseRadius);
        let y = ((baseRadius) / 2) - Math.round(Math.cos(angle) * numbersBaseRadius);
        clockFace.appendChild(createCircle(x, y, (circleRadius / 2), 'gray'));
        clockFace.appendChild(createText(x, y, number));
      }
      return clockFace;
    }

    function createArrow(arrowType, arrowLength, arrowWidth) {
      let arrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
      arrow.classList.add('arrow');
      arrow.classList.add(arrowType);
      arrow.setAttribute('x1', baseRadius / 2);
      arrow.setAttribute('x2', baseRadius / 2 + arrowLength);
      arrow.setAttribute('y1', baseRadius / 2);
      arrow.setAttribute('y2', baseRadius / 2);
      arrow.style = ('stroke:black; stroke-linecap: round; stroke-width:' + arrowWidth);
      return arrow;
    }

    function createCircle(circleX, circleY, r, color) {
      let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.style = 'cx:' + circleX + '; cy:' + circleY + '; r:' + r + '; fill:' + color + ';';
      return circle;
    }

    function createText(circleX, circleY, number) {
      let text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
      text.textContent = number;
      text.setAttribute('y', circleY);
      text.setAttribute('x', circleX);
      text.style = 'text-anchor:middle; dominant-baseline:middle; font-family:Verdana; font-size:' + fontSize;
      return text;
    }

    function createDigitalWatch() {
      let textClock = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      var posX = baseRadius / 2 - (baseRadius / 5);
      var posY = baseRadius / 2 - 50;
      ['hourstext', 'minutestext', 'secondstext'].map(watchDigits => {
        let digits = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        posX += 25; // расстояние между цифрами digitalWatch
        digits.setAttribute('x', (posX));
        digits.setAttribute('y', (posY));
        digits.textContent = 'noTime';
        digits.style = 'font-family:Verdana; font-size:' + fontSize;
        digits.classList.add(watchDigits);
        textClock.appendChild(digits);
      });
      return textClock;
    }
  }

  // Logic
  function tickTimer() {
    requestAnimationFrame(tickTimer);
    let now = new Date();
    let thisSecond = now.getSeconds();
    let thisMilisecond = now.getMilliseconds();
    let thisMinute = now.getMinutes();
    let thisHour = now.getHours();
    updateWatch(thisHour, thisMinute, thisSecond, thisMilisecond);
    updateDigitalWatch(thisHour, thisMinute, thisSecond);

    function updateWatch(hour, minute, second, milisecond) {
      let thisSecondRotate = (second + milisecond / 1000) / 60 * 360 - 90;
      let thisMinuteRotate = (minute) / 60 * 360 - 90;
      let thisHourRotate = (hour + minute / 60) / 12 * 360 - 90;
      rotateHandle('seconds', thisSecondRotate);
      rotateHandle('minutes', thisMinuteRotate);
      rotateHandle('hours', thisHourRotate);

      function rotateHandle(handle, degree) {
        let arrow = document.querySelector(`.${handle}`);
        arrow.style.transform = `rotate(${degree}deg)`;
        arrow.style.transformOrigin = (baseRadius / 2) + 'px ' + (baseRadius / 2) + 'px';
      }
    }

    function updateDigitalWatch(hour, minute, second) {
      let digitalWatchSeconds = document.querySelector('.secondstext');
      let digitalWatchMinutes = document.querySelector('.minutestext');
      let digitalWatchHours = document.querySelector('.hourstext');
      digitalWatchSeconds.textContent = addZeroToNumber(second);
      digitalWatchMinutes.textContent = addZeroToNumber(minute) + ':';
      digitalWatchHours.textContent = addZeroToNumber(hour) + ':';

      function addZeroToNumber(currentTime) {
        return (`${currentTime}`.length < 2) ? (`0${currentTime}`) : currentTime;
      }
    }
  }
})();