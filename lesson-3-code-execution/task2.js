'use strict';

var image = {
  width: 100,
  height: 400,
  title: 'Cool image'
};

function multiplyValues(obj) {
  for (var key in obj) {
    if (!isNaN(obj[key])) {
      obj[key] *= 2;
    }
  }
  return obj;
}

console.log(multiplyValues(image));