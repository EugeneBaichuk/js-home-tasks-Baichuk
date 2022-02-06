'use strict';
//варинт 2

var userData = {
  msgs: ['Пожалуйста, ведите вашу фамилию корректно', 'Петренко', 'Пожалуйста, введите ваше имя корректно', 'Петр', 'Пожалуйста, введите ваше отчество корректно', 'Петрович', 'Пожалуйста, введите ваш возраст (лет) корректно', '20'],
  surname: '',
  userName: '',
  patronymic: '',
  age: '',
  gender: '',
  pension: '',
  chooseGender: function () {
    if (this.gender) {
      this.gender = 'мужской';
    } else {
      this.gender = 'женский';
    }
  },
  isPension: function () {
    if (this.age > 60) {
      this.pension = "да";
    } else {
      this.pension = "нет";
    }
  },
  checkTextForm: function (data, msg, msgDefault) {
    while (!isNaN(data) || data == null) {
      data = prompt(msg, msgDefault);
    }
    return data;
  },
  checkAge: function (data) {
    while (isNaN(data) || data == 0) {
      data = +prompt('Введите ваш возраст (лет)', '20');
    }
    return data;
  }
};

userData.surname = prompt('Введите вашу фамилию', 'Петренко');
userData.surname = userData.checkTextForm(userData.surname, userData.msgs[0], userData.msgs[1]);

userData.userName = prompt('Введите ваше имя', 'Петр');
userData.userName = userData.checkTextForm(userData.userName, userData.msgs[2], userData.msgs[3]);

userData.patronymic = prompt('Введите ваше отчество', 'Петрович');
userData.patronymic = userData.checkTextForm(userData.patronymic, userData.msgs[4], userData.msgs[5]);

userData.age = +prompt('Введите ваш возраст (лет)', '20');
userData.age = userData.checkAge(userData.age);

userData.gender = confirm('Ваш пол мужской?');
userData.chooseGender();
userData.isPension();

alert('ваше ФИО: ' + userData.surname + ' ' + userData.userName + ' ' + userData.patronymic +
  '\nваш возраст в годах: ' + userData.age +
  '\nваш возраст в днях: ' + (userData.age * 365) +
  '\nчерез 5 лет вам будет: ' + (userData.age + 5) +
  '\nваш пол: ' + userData.gender +
  '\nвы на пенсии: ' + userData.pension);