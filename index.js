const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let randomColor;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function drawBall(ballColor) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#" + ballColor;
  ctx.fill();
  ctx.closePath();
}
function draw(ballColor) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  randomColor ? (ballColor = randomColor) : (ballColor = "0095DD");
  drawBall(ballColor);
  drawPaddle();

  x += dx;
  y += dy;
  console.log("dx is:" + "" + dx + "  and dy is:" + dy);

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    generateRandomColor();
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      //increase the speed of the ball by 0.5 each time it touches the paddle
      dy += 0.5;
      dy = -dy;
      generateRandomColor();
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width)
      paddleX = canvas.width - paddleWidth;
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) paddleX = 0;
  }
}

function generateRandomColor() {
  randomColor = Math.floor(Math.random() * 16777215).toString(16);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

let interval = setInterval(draw, 10);
