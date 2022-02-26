'use strict';

do {
  var row = prompt('Введите количество ячеек в строке', 8);
}
while (row !== null && isNaN(parseFloat(row)));
row !== null || alert('действие отменено!');

if (row) {
  do {
    var col = +prompt('Введите количество столбцов', 8);
  }
  while (col !== null && isNaN(parseFloat(row)));
  col !== null || alert('действие отменено!');
  row -= 1;
  col -= 1;
}

var rowArr = [];
var grid = createGrid(row, col, rowArr, '#', ' '); //создаем сетку

function createGrid(row, col, arr, elem, separator) {
  for (var i = 0; i <= row; i++) {
    (i % 2 === 0) ? arr.push(elem): arr.push(separator);
  }
  var string = arr.join('');
  var colArr = [];
  for (var y = 0; y <= col; y++) {
    if (row % 2 === 0 && y % 2 !== 0) {
      colArr.push(' ' + string.slice(0, row)); // минус один элемент в четных рядах при нечетном значении row 
    } else if (y % 2 === 0) {
      colArr.push(string);
    } else {
      colArr.push(' ' + string);
    }
  }
  return colArr.join('\n');
}

console.log(grid);