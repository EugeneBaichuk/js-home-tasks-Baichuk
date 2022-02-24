'use strict';

function Question(question, answers, correctAnswer) {
  var self = this;
  self.question = question;
  self.answers = answers;
  self.correctAnswer = correctAnswer;
  self.userAnswer = null;
  self.getQuestion = function () {
    console.log('Question:',
      self.question
    );
    self.answers.forEach((key, i) => {
      console.log((i + 1) + ') ' + key);
    });
  };
  self.checkAnswer = function () {
    var correctAnswerNum;
    self.answers.forEach((key, i) => {
      if (key === self.correctAnswer) {
        correctAnswerNum = i + 1;
      }
    });
    if (self.userAnswer === correctAnswerNum) {
      return true;
    }
    return false;
  };
}

var firstQuestion = new Question(
  'How many letters in the Hawaiian alphabet?',
  [11, 18, 47, 135],
  18);

var secondQuestion = new Question(
  'How many characters are killed in the "Game of Thrones" series?',
  [48, 112, 205, 338],
  338);

var thirdQuestion = new Question(
  'How many hours of video are uploaded to "YouTube" each minute?',
  [5, 10, 20, 50],
  20);

var questions = [firstQuestion, secondQuestion, thirdQuestion];
var randomQuestion = questions[randomNum(0, questions.length - 1)];
randomQuestion.getQuestion();
randomQuestion.userAnswer = +prompt('Enter your answer number', 'Your answer number');
if (randomQuestion.checkAnswer()) {
  console.log('Congratulations, You are right!');
} else {
  console.log('Sorry, your answer is not correct!');
}

function randomNum(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}