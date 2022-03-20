'use strict';

console.log(isPal('Анна'));
console.log(isPal('А роза упала на лапу азора'));
console.log(isPal('Вася'));
console.log(isPal(12321));
console.log(isPal(123212));

function isPal(value) {
  var string = value.toString().toLowerCase().split(" ").join("");
  var reverce = string.split("").reverse().join("");
  var result;

  (string === reverce) ? result = true: result = false;
  return result;
}