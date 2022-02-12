'use strict';

var obj = {
  className: 'open menu menu'
};

removeClassName(obj, 'menu');

function removeClassName(obj, cls) {
  while (obj.className.indexOf(cls) !== -1) {
    obj.className = obj.className.replace(cls, '').trim();
  }
}

console.log(obj);