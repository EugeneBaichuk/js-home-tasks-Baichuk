'use strict';

var obj = {
  className: 'menu open aaa menu menu ddd menu menu ссс menu'
};

removeClassName(obj, 'menu');

function removeClassName(obj, cls) {
  obj.className = obj.className.split(' ').filter((item) => {
    return cls != item;
  }).join(' ');
}

console.log(obj);