'use strict';
// когда делал задание, не заметил, что должна быть "шахматная сетка", а не просто ряды с решетками. Переделал с учетом сохранения своей логики

var rowNum = prompt('Введите количество ячеек в строке', 8);
validateForms(rowNum, 'Введите количество ячеек в строке');

if (rowNum) {
  var colNum = prompt('Введите количество столбцов', 8);
  validateForms(colNum, 'Введите количество столбцов');

  rowNum -= 1;
  colNum -= 1;
}

var rowArr = [];
var colArr = [];
var string = createRow(rowNum, rowArr, '#', ' '); //создаем строку
var grid = createGrid(colNum, colArr, string, '\n'); //создаем сетку 

function validateForms(value, msg) {
  while (isNaN(parseFloat(value))) {
    if (value === null) {
      alert('действие отменено!');
      return;
    }
    alert('Требуется ввести числовое значение');
    value = prompt(msg, 8);
  }
}

function createRow(elemNum, arr, elem, separator) {
  for (var i = 0; i <= elemNum; i++) {
    if (i % 2 === 0) {
      arr.push(elem);
    }
  }
  return arr.join(separator);
}

function createGrid(elemNum, arr, elem, separator) {
  for (var i = 0; i <= elemNum; i++) {
    var newElem = " " + elem;
    (i % 2 === 0) ? arr.push(elem): arr.push(newElem);
  }
  return arr.join(separator);
}

console.log(grid);