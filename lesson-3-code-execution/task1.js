'use strict';

var taskCompleted = {
  'Anna': 29,
  'Serg': 35,
  'Elena': 1,
  'Anton': 99
};

function getWinner(obj) {
  var bestScore = 0;
  var winnerName = '';

  for (var person in obj) {
    if (obj[person] > bestScore) {
      bestScore = obj[person];
      winnerName = person;
    }
  }

  return {
    [winnerName]: bestScore
  };
}

var winner = getWinner(taskCompleted);

for (var person in winner) {
  console.log('Больше всего задач выполнил сотрудник: ' + person + '\nЗадач выполнено: ' + winner[person]);
}