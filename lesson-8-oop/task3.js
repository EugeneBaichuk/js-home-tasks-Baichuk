'use strict';

var arr = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];

function anClean(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var sorted = arr[i].toLowerCase().split('').sort().join('');
    obj[sorted] = arr[i];
  }
  return Object.values(obj);
}

console.log(anClean(arr));