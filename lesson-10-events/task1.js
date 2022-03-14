'use strict';
(function () {
  var formArr = [{
      name: 'new-form',
      style: 'display: grid; grid-template-rows: repeat(13, minmax(10px, auto)); grid-template-columns: 200px 500px',
      method: 'POST',
      action: 'http://fe.it-academy.by/TestForm.php',
    },
    {
      elemType: 'header',
      style: 'grid-column: 1 / 3; font-weight: normal',
      textContent: 'Для внесения вашего сайта в каталог, заполните форму:',
    },
    {
      elemType: 'text1line',
      textContent: 'Разработчики:',
      htmlFor: 'developer',
    },
    {
      id: 'developer',
      type: 'text',
      name: 'developer',
      maxlength: '300',
      style: 'width: 453px',
    },
    {
      elemType: 'text2line',
      textContent: 'Название сайта: ',
      htmlFor: 'website-name',
    },
    {
      id: 'website-name',
      type: 'text',
      name: 'developer',
      maxlength: '100',
      style: 'width: 453px',
    },
    {
      elemType: 'text3line',
      textContent: 'URL сайта: ',
      htmlFor: 'website-url',
    },
    {
      id: 'website-url',
      type: 'text',
      name: 'url',
      maxlength: '200',
      style: 'width: 300px',
    },
    {
      elemType: 'text4line',
      textContent: 'Дата запуска сайта: ',
      htmlFor: 'launch-date',
    },
    {
      id: 'launch-date',
      type: 'text',
      name: 'launch-date',
      maxlength: '4',
      style: 'width: 80px',
    },
    {
      elemType: 'text5line',
      textContent: 'Посетителей в сутки: ',
      htmlFor: 'visitors',
    },
    {
      id: 'visitors',
      type: 'text',
      name: 'visitors',
      maxlength: '10',
      style: 'width: 80px',
    },
    {
      elemType: 'text6line',
      textContent: 'E-mail для связи: ',
      htmlFor: 'email',
    },
    {
      id: 'email',
      type: 'text',
      name: 'email',
      maxlength: '20',
      style: 'width: 200px',
    },
    {
      elemType: 'select7line',
      textContent: 'Рубрика каталога: ',
      htmlFor: 'rubric',
    },
    {
      id: 'rubric',
      name: 'select',
      style: 'width: 204px',
      option: ['здоровье', 'домашний уют', 'бытовая техника'],
    },
    {
      elemType: 'radio8line',
      textContent: 'Размещение: ',
      htmlFor: 'placement',
    },
    {
      id: 'placement',
      type: 'radio',
      name: 'placement',
      textContent: ['бесплатное', 'платное', 'VIP'],
    },
    {
      elemType: 'checkbox9line',
      textContent: 'Разрешить отзывы: ',
      htmlFor: 'reviews',
    },
    {
      id: 'reviews',
      type: 'checkbox',
      name: 'reviews',
    },
    {
      elemType: 'textarea10line',
      textContent: 'Описание сайта: ',
      htmlFor: 'description',
    },
    {
      elemType: 'textarea10line',
      textContent: 'Описание сайта: ',
      htmlFor: 'description',
    },
    {
      elemType: 'textarea',
      id: 'description',
      style: 'grid-column: 1 / 3; margin: 0 0 0.25rem; width: 650px; height: 70px',
      name: 'description',
    },
    {
      type: 'submit',
      value: 'Опубликовать',
      style: 'width: 110px;',
    },
  ];

  function Form(arr) {
    this.arr = arr;
    this.htmlForm = document.querySelector('form');
    this.formClone = this.htmlForm.cloneNode(true);
  }
  //находим нужный объект в массиве formArr 
  Form.prototype.findCurrentObj = function (attrVal) {
    var result;
    this.arr.forEach(elem => {
      for (var key in elem) {
        if (elem[key] === attrVal) {
          result = elem;
        }
      }
    });
    return result;
  };
  //если в объекте есть массив - получаем его
  Form.prototype.iterateCurrentObj = function (obj) {
    var keys = Object.keys(obj);
    var result;
    keys.forEach(item => {
      if (typeof obj[item] === "object") {
        result = obj[item];
      }
    });
    return result;
  };
  // записываем аттрибуты из formArr в созданный элемент
  Form.prototype.setAttrByValue = function (elem, attrVal) {
    var currentObj = this.findCurrentObj(attrVal);
    var keys = Object.keys(currentObj);
    keys.forEach(item => {
      if (typeof currentObj[item] !== 'object') {
        elem[item] = currentObj[item];
      }
    });
  };
  //рендерим всю форму на страницу
  Form.prototype.render = function () {
    this.htmlForm.replaceWith(this.formClone);
  };

  var form = new Form(formArr);
  var formClone = form.formClone;

  function ChildElem(arr) {
    Form.call(this, arr);
  }

  function Select(arr) {
    Form.call(this, arr);
  }

  function Radio(arr) {
    Form.call(this, arr);
  }
  // наследуемся и для каждого типа элементов задаем свою функцию render, которая рендерит элемент в formClone
  inherit(ChildElem, Form, function (elem, parent, attrVal) {
    var element = document.createElement(elem);
    this.setAttrByValue(element, attrVal);
    parent.appendChild(element);
  });

  inherit(Select, Form, function (elem, parent, attrVal) {
    var currentObj = this.findCurrentObj(attrVal);
    var textArr = this.iterateCurrentObj(currentObj);
    var element = document.createElement(elem);
    this.setAttrByValue(element, attrVal);
    var childElemsArr = [];
    textArr.forEach((item, i) => {
      var childElem = document.createElement('option');
      childElem.textContent = item;
      childElemsArr[i] = childElem;
      element.appendChild(childElem);
    });
    childElemsArr[(childElemsArr.length) - 1].selected = true;
    parent.appendChild(element);
  });

  inherit(Radio, Form, function (elem, parent, attrVal) {
    var currentObj = this.findCurrentObj(attrVal);
    var textArr = this.iterateCurrentObj(currentObj);
    var element = document.createElement(elem);
    textArr.forEach(item => {
      childElem.render('input', element, 'radio');
      var span = document.createElement('span');
      span.textContent = item;
      element.appendChild(span);
    });
    parent.appendChild(element);
  });

  var select = new Select(formArr);
  var radio = new Radio(formArr);
  var childElem = new ChildElem(formArr);

  form.setAttrByValue(formClone, 'POST'); // задаем аттрибуты тегу form
  //задаем параметры элементов формы
  var formElems = [
    [childElem, 'h4', formClone, 'header'],
    [childElem, 'label', formClone, 'text1line'],
    [childElem, 'input', formClone, '300'],
    [childElem, 'label', formClone, 'text2line'],
    [childElem, 'input', formClone, '100'],
    [childElem, 'label', formClone, 'text3line'],
    [childElem, 'input', formClone, '200'],
    [childElem, 'label', formClone, 'text4line'],
    [childElem, 'input', formClone, '4'],
    [childElem, 'label', formClone, 'text5line'],
    [childElem, 'input', formClone, '10'],
    [childElem, 'label', formClone, 'text6line'],
    [childElem, 'input', formClone, '20'],
    [childElem, 'label', formClone, 'select7line'],
    [select, 'select', formClone, 'select'],
    [childElem, 'label', formClone, 'radio8line'],
    [radio, 'div', formClone, 'radio'],
    [childElem, 'label', formClone, 'checkbox9line'],
    [childElem, 'input', formClone, 'checkbox'],
    [childElem, 'label', formClone, 'textarea10line'],
    [childElem, 'textarea', formClone, 'textarea'],
    [childElem, 'input', formClone, 'submit']
  ];
  //создаем все элементы и рендерим в formClone
  formElems.forEach(item => {
    item[0].render(item[1], item[2], item[3]);
  });
  form.render(); // рендерим form  на страницу

  function inherit(child, parent, func) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
    child.prototype.render = func;
  }
})();