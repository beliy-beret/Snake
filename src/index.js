'use strict';
import {Apple} from './utils/Apple';
import {score, Snake} from './utils/Snake';

const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
export const blockSize = 10;
export const widthInBlocks = width / blockSize;
export const heightInBlocks = height / blockSize;
const directions = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};
const snake = new Snake();
export const apple = new Apple();
const intervalId = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
}, 200);

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

export function gameOver() {
  clearInterval(intervalId);
  ctx.font = '40px Courier';
  ctx.fillStyle = 'Black';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('Game over !', width / 2, height / 2);
}

document.querySelector('body').addEventListener('keydown', (event) => {
  const newDirection = directions[event.keyCode];
  if (newDirection) {
    snake.setDirection(newDirection);
  }
});
