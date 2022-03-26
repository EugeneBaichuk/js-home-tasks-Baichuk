'use strict';

var R = 200; // радиус циферблата
var clockCenter = R; // центр циферблата
var elemR = 20; // радиус кружков с цифрами
var arrowChange = [0.94, 0.93, 0.90]; // смещение хвоста стрелок

//UI
createClock();

function createClock() {
  var clock = document.getElementById('clock');
  var cloneClock = createClockBase();
  createArrow('div', 'hours', cloneClock, arrowChange[0]);
  createArrow('div', 'minutes', cloneClock, arrowChange[1]);
  createArrow('div', 'seconds', cloneClock, arrowChange[2]);
  createTimer();
  createClockNumbers();
  clock.replaceWith(cloneClock);

  function createClockBase() {
    var cloneClock = clock.cloneNode(true);
    cloneClock.id = 'clone-clock';
    cloneClock.style.width = 2 * R + 'px';
    cloneClock.style.height = 2 * R + 'px';
    return cloneClock;
  }

  function createArrow(elem, arrowID, parent, coeff) {
    var arrow = document.createElement(elem);
    arrow.id = arrowID;
    parent.appendChild(arrow);
    startArrowsPos(arrow, coeff);
    return arrow;

    function startArrowsPos(arrow, orig) {
      arrow.style.top = R - (arrow.offsetHeight / 2) + 'px';
      arrow.style.left = (R * orig) + 'px';
      arrow.style.zIndex = 2;
    }
  }

  function createTimer() {
    var timer = document.createElement('div'); // создаем цифровой таймер
    timer.id = 'time';
    cloneClock.appendChild(timer);
  }

  function createClockNumbers() {
    for (var num = 1; num <= 12; num++) {
      var green = document.createElement('div');
      green.classList.add('green');
      green.innerHTML = '<p class="num">' + num + '</p>';
      createNum(num, green, cloneClock, elemR);
    }

    function createNum(num, elem, parent, elemR) {
      var Angle = num / 12 * 2 * Math.PI;
      var elemCenterX = clockCenter + (0.75 * R) * Math.sin(Angle); // 0.75 * R - расстояние от центра до цифр
      var elemCenterY = clockCenter - (0.75 * R) * Math.cos(Angle);
      elem.style.left = Math.round(elemCenterX - elemR) + 'px';
      elem.style.top = Math.round(elemCenterY - elemR) + 'px';
      parent.appendChild(elem);
    }
  }
}

//Logic
updateClock();

function updateClock() {
  updateArrows();
  updateDigitalClock();
  timer(updateDigitalClock, 1000);

  function updateArrows() {
    changeSeconds();
    changeMinutes();
    changeHours();
    timer(changeSeconds, 1000);
    timer(changeMinutes, 60000);
    timer(changeHours, 60000);

    function changeSeconds() {
      var currentRotation = new Date().getSeconds();
      currentRotation -= 15; // изначально стрелки указывают на 3 (90 град) - возвращаем на 0
      currentRotation *= 6; // градус смещения стрелки
      var seconds = document.getElementById('seconds');
      seconds.style.transform = 'rotate(' + currentRotation + 'deg)';
    }

    function changeMinutes() {
      var currentRotation = new Date().getMinutes();
      currentRotation -= 15;
      currentRotation *= 6;
      var minutes = document.getElementById('seconds');
      minutes.style.transform = 'rotate(' + currentRotation + 'deg)';
    }

    function changeHours() {
      var hour = new Date().getHours();
      var minutes = new Date().getMinutes();
      if (hour > 12) {
        hour -= 12; //перевод в 12 часовой формат
      }
      hour -= 3;
      var currentRotation = (hour * 60) + minutes; //получаем часы в минутах
      currentRotation *= 0.5; //градус смещения часовой стрелки
      var hours = document.getElementById('hours');
      hours.style.transform = 'rotate(' + currentRotation + 'deg)';
    }
  }

  function updateDigitalClock() {
    var CurrTime = new Date();
    var CurrTimeStr = FormatDateTime(CurrTime);
    document.getElementById('time').innerHTML = CurrTimeStr;

    function FormatDateTime(DT) {
      var Hours = DT.getHours();
      var Minutes = DT.getMinutes();
      var Seconds = DT.getSeconds();
      return Str0L(Hours, 2) + ':' + Str0L(Minutes, 2) + ':' + Str0L(Seconds, 2);
    }

    function Str0L(Val, Len) {
      var StrVal = Val.toString();
      while (StrVal.length < Len) StrVal = '0' + StrVal;
      return StrVal;
    }
  }

  function timer(func, interval) {
    setInterval(func, interval);
  }
}