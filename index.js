const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let randomColor;

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

  x += dx;
  y += dy;

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    generateRandomColor();
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
    generateRandomColor();
  }
}

function generateRandomColor() {
  randomColor = Math.floor(Math.random() * 16777215).toString(16);
}

setInterval(draw, 10);
