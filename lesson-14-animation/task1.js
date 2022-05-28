'use strict';

const game = {
  width: 700,
  height: 400,
  leftPlayerScore: 0,
  rightPlayerScore: 0,
  interval: null,
  init() {
    var wrapper = document.body.appendChild(this.wrapperRender());
    wrapper.appendChild(this.headerRender());
    wrapper.appendChild(this.gameAreaRender());
  },
  wrapperRender() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('game');
    wrapper.style.width = this.width + 'px';
    return wrapper;
  },
  gameAreaRender() {
    const gameArea = document.createElement('div');
    gameArea.classList.add("game__area");
    gameArea.style.height = this.height + 'px';
    gameArea.innerHTML = `
      <div class="game__rocket game__rocket_side_left"></div>
      <div class="game__rocket game__rocket_side_right"></div>
      <div class="game__ball"></div>
    `;
    return gameArea;
  },
  headerRender() {
    const header = document.createElement('header');
    header.classList.add("game__header");
    header.innerHTML = `
      <button class="game__button">start!</button>
      <div class="game__scores">
        <p class="game__score game__score_player_left">${this.leftPlayerScore}</p> 
        <span>:</span>
        <p class ="game__score game__score_player_right"> ${this.rightPlayerScore}</p>
      </div>
      <div class="game__score-pos"></div>
    `;
    return header;
  },
  updateScore() {
    document.querySelector('.game__score_player_right').textContent = this.rightPlayerScore;
    document.querySelector('.game__score_player_left').textContent = this.leftPlayerScore;
  },
  makeInterval(func) {
    this.interval = setInterval(func, 20);
  },
  stopInterval(func) {
    clearInterval(func);
  }
};

game.init();

function Racket() {
  this.posY = 0;
  this.speedY = 0;
  this.width = 16;
  this.height = 100;
}

Racket.prototype.moveRacket = function (selector) {
  game.makeInterval(() => {
    this.tick(this, selector);
  });
};
Racket.prototype.tick = function (self, selector) {
  self.posY += self.speedY;
  self.update(selector);
};
Racket.prototype.update = function (selector) {
  const rocketObj = document.querySelector(selector);
  if (this.posY >= (game.height - this.height)) {
    this.posY = (game.height - this.height - 1);
  } else if (this.posY <= 0) {
    this.posY = 0;
  }
  rocketObj.style.height = this.height + 'px';
  rocketObj.style.top = this.posY + "px";
};
Racket.prototype.addEventHandler = function (event, keycode, speed) {
  document.addEventListener(event, callback(this));

  function callback(self) {
    return function (e) {
      if (e.keyCode === keycode) {
        self.speedY = speed;
      }
    };
  }
};

const leftRocket = new Racket();
const rightRocket = new Racket();
leftRocket.moveRacket('.game__rocket_side_right');
rightRocket.moveRacket('.game__rocket_side_left');
leftRocket.addEventHandler('keydown', 38, -7);
leftRocket.addEventHandler('keyup', 38, 0);
leftRocket.addEventHandler('keydown', 40, 7);
leftRocket.addEventHandler('keyup', 40, 0);
rightRocket.addEventHandler('keydown', 16, -7);
rightRocket.addEventHandler('keyup', 16, 0);
rightRocket.addEventHandler('keydown', 17, 7);
rightRocket.addEventHandler('keyup', 17, 0);

const ball = {
  posX: 0,
  posY: 0,
  speedX: 0,
  speedY: 0,
  width: 30,
  height: 30,
  ballObj: document.querySelector('.game__ball'),
  startBtnObj: document.querySelector('.game__button'),
  side: 0,
  gamePlaying: false,

  setBallProps() {
    this.posX = game.width / 2 - this.width;
    this.posY = game.height / 2 - this.height;
    this.ballObj.style.width = this.width + 'px';
    this.ballObj.style.height = this.height + 'px';
    this.startBtnObj.addEventListener('click', this.onClick);
  },
  onClick() {
    if (!ball.gamePlaying) {
      ball.gamePlaying = true;
      ball.posX = game.width / 2 - ball.width;
      ball.posY = game.height / 2 - ball.height;
      (Math.random() < 0.5) ? ball.side = 1: ball.side = -1;
      ball.speedX = ball.side * (Math.random() * 4 + 3);
      ball.speedY = ball.side * (Math.random() * 4 + 3);
      game.makeInterval(ball.tick);
    }
  },
  update() {
    this.ballObj.style.left = this.posX + 'px';
    this.ballObj.style.top = this.posY + 'px';
  },
  tick() {
    ball.update();
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;
    const ballBorderPos = ball.posX + ball.width / 2;
    const gameRBorderPos = game.width;
    const rightCond = (ballBorderPos >= gameRBorderPos);
    const ballRFinishPos = game.width - ball.width / 2;
    const ballLFinishPos = ball.width / 2;
    const leftCond = ball.posX <= ball.width / 2;

    function goal(condition, ballFinPos, player) {
      if (condition) {
        ball.gamePlaying = false;
        ball.speedX = 0;
        ball.speedY = 0;
        ball.posX = ballFinPos;
        game[player]++;
        game.stopInterval(game.interval);
        game.updateScore();
      }
    }
    goal(rightCond, ballRFinishPos, 'rightPlayerScore');
    goal(leftCond, ballLFinishPos, 'leftPlayerScore');

    if (ball.posY + ball.height / 2 > game.height) {
      ball.speedY = -ball.speedY;
      ball.posY = game.height - ball.height / 2;
    }
    if (ball.posY < ball.height / 2) {
      ball.speedY = -ball.speedY;
      ball.posY = ball.height / 2;
    }

    if ((ball.posY > leftRocket.posY && ball.posY < leftRocket.posY + leftRocket.height) && (ball.posX + ball.width / 2) >= game.width - leftRocket.width) {
      ball.speedX = -ball.speedX;
    }

    if ((ball.posY > rightRocket.posY && ball.posY < rightRocket.posY + rightRocket.height) && (ball.posX - ball.width / 2) <= rightRocket.width) {
      ball.speedX = -ball.speedX;
    }
  },
};

ball.setBallProps();