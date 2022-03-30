'use strict';

(function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var width = 500; //ширина области
  var height = 500; //высота области
  var R = ((height / 2) * 0.9); // радиус часов 
  var center = R + 10; //центр 
  var numR = 0.81 * R; // радиус циферблата
  tickTimer();

  function tickTimer() {
    requestAnimationFrame(tickTimer);
    let now = new Date();
    let thisSecond = now.getSeconds();
    let thisMilisecond = now.getMilliseconds();
    let thisMinute = now.getMinutes();
    let thisHour = now.getHours();
    drawStaticClock();
    drawNum();
    updateWatch(thisHour, thisMinute, thisSecond, thisMilisecond);

    function drawStaticClock() {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 10;
      ctx.arc(center, center, R, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    function drawNum() {
      for (var i = 1; i <= 12; i++) {
        let angle = i * 30 / 180 * Math.PI;
        var x = (center + Math.round(Math.sin(angle) * numR));
        var y = (center - Math.round(Math.cos(angle) * numR));
        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.arc(x, y, 15, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, x, y);
      }

      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.arc(center, center, 7, 0, Math.PI * 2, false);
      ctx.fill();
    }

    function updateWatch(hour, minute, second) {
      arrowsRotate();
      changeDigitalClock();

      function arrowsRotate() {
        var secondRotate = (second * (Math.PI / 30));
        var minuteRotate = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        var hourRotate = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
        rotate(1, 175, secondRotate);
        rotate(3, 150, minuteRotate);
        rotate(5, 130, hourRotate);

        function rotate(width, length, rotate) {
          ctx.translate(center, center);
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = width;
          ctx.strokeStyle = 'black';
          ctx.lineCap = 'round';
          ctx.moveTo(0, 0);
          ctx.rotate(rotate);
          ctx.lineTo(0, -length);
          ctx.stroke();
          ctx.restore();
          ctx.translate(-center, -center);
        }
      }

      function changeDigitalClock() {
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((addZeroToNumber(hour) + ':' + addZeroToNumber(minute) + ':' + addZeroToNumber(second)), R, R - 0.4 * R);

        function addZeroToNumber(currentTime) {
          return (`${currentTime}`.length < 2) ? (`0${currentTime}`) : currentTime;
        }
      }
    }
  }
})();