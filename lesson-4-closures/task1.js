'use strict';

do {
  var rowNum = prompt('Введите количество ячеек в строке', 8);
}
while (rowNum !== null && isNaN(parseFloat(rowNum)));
rowNum !== null || alert('действие отменено!');

if (rowNum) {
  do {
    var colNum = +prompt('Введите количество столбцов', 8);
  }
  while (colNum !== null && isNaN(parseFloat(rowNum)));
  colNum !== null || alert('действие отменено!');
}

var string = "";
var length = (rowNum * colNum);

for (var i = 0; i < length; i++) {
  if ((rowNum % 2 === 0) && (i % rowNum === 0) && (i / rowNum % 2 !== 0)) {
    string += '\n ';
  } else if (i % rowNum === 0 && i) {
    string += '\n';
  }
  (i % 2 === 0) ? string += '#': string += ' ';
}

console.log(string);