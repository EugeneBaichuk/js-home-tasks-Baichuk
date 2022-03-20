'use strict';

var R = 200; // радиус
var clockCenter = R; // центр циферблата
var elemWidth = 40; // ширина кружочков
var elemAng = 30; // угол между цифрами в градусах

var clock = document.getElementById('clock');
var cloneClock = clock.cloneNode(true);
cloneClock.id = 'clone-clock';
cloneClock.style.width = 2 * R + 'px';
cloneClock.style.height = 2 * R + 'px';

var hours = document.createElement('div'); // создаем стрелки
hours.id = 'hours';
cloneClock.appendChild(hours);

var minutes = document.createElement('div');
minutes.id = 'minutes';
cloneClock.appendChild(minutes);

var seconds = document.createElement('div');
seconds.id = 'seconds';
cloneClock.appendChild(seconds);

var time = document.createElement('div'); // создаем цифровой таймер
time.id = 'time';
cloneClock.appendChild(time);

startArrowsPos(hours, 0.94); // 0.94 - смещение хвоста стрелок
startArrowsPos(minutes, 0.93);
startArrowsPos(seconds, 0.90);

// создаем цифры на циферблате
for (var num = 1; num <= 12; num++) {
  var green = document.createElement('div');
  green.classList.add('green');
  green.innerHTML = '<p class="num">' + num + '</p>';
  createNums(num, green, cloneClock, elemWidth, elemAng);
}

clock.replaceWith(cloneClock);

function startArrowsPos(arrow, orig) {
  arrow.style.top = R - (arrow.offsetHeight / 2) + 'px';
  arrow.style.left = (R * orig) + 'px';
  arrow.style.zIndex = 2;
}

function createNums(num, elem, parent, elemWidth, elemAng) {
  var Angle = num * elemAng / 360 * 2 * Math.PI;
  var elemCenterX = clockCenter + (0.75 * R) * Math.sin(Angle); // 0.75 * R - расстояние от центра до цифр
  var elemCenterY = clockCenter - (0.75 * R) * Math.cos(Angle);
  parent.appendChild(elem);
  elem.style.left = Math.round(elemCenterX - elemWidth / 2) + 'px';
  elem.style.top = Math.round(elemCenterY - elemWidth / 2) + 'px';
}

function changeSeconds() {
  var currentRotation = new Date().getSeconds();
  currentRotation -= 15; // изначально стрелки указывают на 3 (90 град) - возвращаем на 0
  currentRotation *= 6; // градус смещения стрелки
  seconds.style.transform = 'rotate(' + currentRotation + 'deg)';
}

function changeMinutes() {
  var currentRotation = new Date().getMinutes();
  currentRotation -= 15;
  currentRotation *= 6;
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
  hours.style.transform = 'rotate(' + currentRotation + 'deg)';
}

function UpdateTime() {
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

changeSeconds();
changeMinutes();
changeHours();
UpdateTime();
timer(changeSeconds, 1000);
timer(changeMinutes, 60000);
timer(changeHours, 60000);
timer(UpdateTime, 1000);

function timer(func, interval) {
  setInterval(func, interval);
}