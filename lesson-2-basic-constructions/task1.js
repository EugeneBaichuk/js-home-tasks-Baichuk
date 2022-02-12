'use strict';

var userMessage = prompt('Напишите ваше сообщение', 'Мое сообщение');

function countVowels(message) {
  var vowelsNumber = 0;
  var vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
  message.split('').map(item => {
    if (vowels.includes(item.toLowerCase())) {
      vowelsNumber++;
    }
  });
  return vowelsNumber;
}

console.log(countVowels(userMessage));