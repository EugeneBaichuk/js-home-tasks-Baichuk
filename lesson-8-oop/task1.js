'use strict';

(function () {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
      console.log((i + 1) + ': ' + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function (ans) {
    if (ans === this.correct) {
      console.log('Correct answer!');
      score++;
    } else {
      console.log('Wrong answer. Try again :)');
    }
  };

  Question.prototype.showScore = function () {
    console.log('score: ', score);
  };

  var q1 = new Question('Is JavaScript the coolest programming language in the world?',
    ['Yes', 'No'],
    1);

  var q2 = new Question('What is the name of this course\'s teacher?',
    ['John', 'Micheal', 'Jonas'],
    3);

  var q3 = new Question('What does best describe coding?',
    ['Boring', 'Hard', 'Fun', 'Tediuos'],
    3);

  var q4 = new Question(
    'How many letters in the Hawaiian alphabet?',
    [11, 18, 47, 135],
    2);

  var q5 = new Question(
    'How many characters are killed in the "Game of Thrones" series?',
    [48, 112, 205, 338],
    4);

  var q6 = new Question(
    'How many hours of video are uploaded to "YouTube" each minute?',
    [5, 10, 20, 50],
    3);

  var questions = [q1, q2, q3, q4, q5, q6];
  var score = 0;

  var n = Math.floor(Math.random() * questions.length);
  questions[n].displayQuestion();
  callNewQuestion();

  function callNewQuestion() {
    while (true) {
      var answer = prompt('Please select the correct answer.\nWrite "exit" to stop the game');
      if (answer !== null) {
        answer = answer.toLowerCase();
      } else {
        continue;
      }
      if (answer === 'exit') {
        questions[n].showScore();
        break;
      }

      questions[n].checkAnswer(+answer);
      n = Math.floor(Math.random() * questions.length);
      questions[n].displayQuestion();
    }
  }
})();