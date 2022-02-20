'use strict';

function summ(a) {
  return function (b) {
    return a + b;
  };
}

console.log(summ(5)(-1));