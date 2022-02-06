'use strict';

var msgs = ['Пожалуйста, ведите вашу фамилию корректно', 'Петренко', 'Пожалуйста, введите ваше имя корректно', 'Петр', 'Пожалуйста, введите ваше отчество корректно', 'Петрович', 'Пожалуйста, введите ваш возраст (лет) корректно', '20'];

var surname = prompt('Введите вашу фамилию', msgs[1]);
surname = checkTextForm(surname, msgs[0], msgs[1]);

var userName = prompt('Введите ваше имя', msgs[3]);
userName = checkTextForm(userName, msgs[2], msgs[3]);

var patronymic = prompt('Введите ваше отчество', msgs[5]);
patronymic = checkTextForm(patronymic, msgs[4], msgs[5]);

var age = +prompt('Введите ваш возраст (лет)', msgs[7]);
age = checkNumForm(age, msgs[6], msgs[7]);

var gender = confirm('Ваш пол мужской?');
var pension;

if (gender) {
  gender = 'мужской';
} else {
  gender = 'женский';
}

(age > 60) ? pension = "да": pension = "нет";

alert('ваше ФИО: ' + surname + ' ' + userName + ' ' + patronymic +
  '\nваш возраст в годах: ' + age +
  '\nваш возраст в днях: ' + (age * 365) +
  '\nчерез 5 лет вам будет: ' + (age + 5) +
  '\nваш пол: ' + gender +
  '\nвы на пенсии: ' + pension);

function checkTextForm(data, msg, msgDefault) {
  while (!isNaN(data) || data == null) {
    data = prompt(msg, msgDefault);
  }
  return data;
}

function checkNumForm(data, msg, msgDefault) {
  while (isNaN(data) || data == 0) {
    data = +prompt(msg, msgDefault);
  }
  return data;
}