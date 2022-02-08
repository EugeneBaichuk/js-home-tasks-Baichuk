'use strict';

var taskCompleted = {
  'Anna': 29,
  'Serg': 35,
  'Elena': 1,
  'Anton': 99
};

function countBestScore(competitors) {
  var scores = Object.values(competitors);
  var bestScore;
  for (var i = 0; i < scores.length; i++) {
    bestScore = scores[i];
    if (scores[i] < scores[i + 1]) {
      bestScore = scores[i + 1];
    }
  }

  for (var person in competitors) {
    if (competitors[person] === bestScore) {
      var winner = {};
      winner[person] = competitors[person];
      return winner;
    }
  }
}

var winner = countBestScore(taskCompleted);
for (var key in winner) {
  console.log('Больше всего задач выполнил сотрудник: ' + key + '\nЗадач выполнено: ' + winner[key]);
}