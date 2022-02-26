'use strict';
//Вариант 1 - исправил свой код через while
var arr = [];
var num = 0;
var summ = 0;

while (true) {
  arr[num] = prompt('\nКалькулятор \n\nВводите числа по одному \n\nДля вывода суммы всех чисел введите любое нечисловое значение, пустую строку или нажмите "отмена"\n', 'Введите число');
  if (isNaN(parseFloat(arr[num]))) {
    var length = arr.length - 2;
    for (var i = 0; i <= length; i++) {
      summ += +arr[i];
    }
    break;
  }
  num++;
}

console.log('Сумма введённых вами чисел: ' + summ);

// вариант 2 через - do-while

// var arr = [];
// var summ = 0;

// do {
//   var num = prompt('\nКалькулятор \n\nВводите числа по одному \n\nДля вывода суммы всех чисел введите любое нечисловое значение, пустую строку или нажмите "отмена"\n', 'Введите число');
//   arr.push(+num);
// }
// while (!isNaN(parseFloat(num)));
// arr.length = arr.length - 1;

// for (var i = 0; i < arr.length; i++) {
//   summ += arr[i];
// }

// if (arr.length === 0) {
//   alert('Вы не ввели ни одного числа.');
// } else {
//   alert('Сумма введённых вами чисел: ' + summ + '\n' + 'Вы ввели следующие числа: ' + arr);
// }