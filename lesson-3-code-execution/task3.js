'use strict';

var calk = [];

function calkNumbers(arr) {
  var num = 1;
  var summ = 0;

  while (num) {
    arr[num - 1] = prompt('\nКалькулятор \n\nВводите числа по одному \n\nДля вывода суммы всех чисел введите любое нечисловое значение, пустую строку или нажмите "отмена"\n', 'Введите число');
    if (!arr[num - 1] || isNaN(arr[num - 1])) {
      for (var i = 0; i <= arr.length - 2; i++) {
        summ += +arr[i];
      }
      return summ;
    }
    num++;
  }
}

console.log(calkNumbers(calk));