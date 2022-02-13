'use strict';

var rowNum = prompt('Введите количество ячеек в строке', 8);
rowNum = validateForms(rowNum, 'Введите количество ячеек в строке');

if (rowNum) {
  var colNum = prompt('Введите количество столбцов', 8);
  colNum = validateForms(colNum, 'Введите количество столбцов');

  rowNum -= 1;
  colNum = (colNum * 2) - 1;
}

var rowArr = [];
var colArr = [];

var string = createRowsCols(rowNum, rowArr, '#', ' '); //создаем строку
var grid = createRowsCols(colNum, colArr, string, '\n'); //создаем сетку 

function validateForms(value, msg) {
  while (isNaN(parseFloat(value))) {
    if (value === null) {
      alert('действие отменено!');
      return;
    }
    alert('Требуется ввести числовое значение');
    value = prompt(msg, 8);
  }
  return value;
}

function createRowsCols(elemNum, arr, elem, separator) {
  for (var i = 0; i <= elemNum; i++) {
    if (i % 2 === 0) addElem(arr, elem);
  }

  function addElem(arr, elem) {
    arr.push(elem);
  }
  return arr.join(separator);
}

console.log(grid);