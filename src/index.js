'use strict';
import {Block} from './Block';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
export const blockSize = 10;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;
const directions = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};
let score = 0;

function drawBorder() {
  ctx.fillStyle = 'Gray';
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
}

function drawScore() {
  ctx.fillStyle = 'Black';
  ctx.font = '20px Courier';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 15, 15,);
}

function gameOver() {
  clearInterval(intervalId);
  ctx.font = '40px Courier';
  ctx.fillStyle = 'Black';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('Game over !', width / 2, height / 2);
}

class Apple {
  constructor() {
    this.position = new Block(10, 10);
  }

  draw() {
    this.position.drawCircle('LimeGreen');
  }

  move() {
    const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
  }
}

class Snake {
  constructor() {
    this.segments = [
      new Block(7, 5),
      new Block(6, 5),
      new Block(5, 5),
    ];
    this.direction = 'right';
    this.nextDirection = 'right';
  }

  draw() {
    for (const block of this.segments) {
      block.drawSquare('Blue');
    }
  }

  move() {
    const head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection;

    if (this.direction === 'right') {
      newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === 'down') {
      newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === 'left') {
      newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === 'up') {
      newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
      gameOver();
      return;
    }

    this.segments.unshift(newHead);
    if (newHead.isEqual(apple.position)) {
      score++;
      apple.move();
    } else {
      this.segments.pop();
    }
  }

  checkCollision(head) {
    const leftCollision = (head.col === 0);
    const topCollision = (head.row === 0);
    const rightCollision = (head.col === widthInBlocks - 1);
    const bottomCollision = (head.row === heightInBlocks - 1);
    const wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false;

    for (const block of this.segments) {
      if (head.isEqual(block)) {
        selfCollision = true;
      }
    }
    return wallCollision || selfCollision;
  }

  setDirection(newDirection) {
    if (this.direction === 'up' && newDirection === 'down') {
      return;
    } else if (this.direction === 'right' && newDirection === 'left') {
      return;
    } else if (this.direction === 'down' && newDirection === 'up') {
      return;
    } else if (this.direction === 'left' && newDirection === 'right') {
      return;
    }
    this.nextDirection = newDirection;
  }
}

document.querySelector('body').addEventListener('keydown', (event) => {
  const newDirection = directions[event.keyCode];
  if (newDirection) {
    snake.setDirection(newDirection);
  }
});

const snake = new Snake();
const apple = new Apple();
const intervalId = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 200);
