const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx;
let dy = -2;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const paddleBottomMargin = 5;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let randomColor;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 40;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (
    relativeX > paddleWidth / 2 &&
    relativeX < canvas.width - paddleWidth / 2
  ) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

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

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickColumnCount * brickRowCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
          generateRandomColor();
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 69, 20);
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
  drawBricks();

  drawBall(ballColor);

  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  x += dx;
  y += dy;

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    generateRandomColor();
  }

  if (y + dy < ballRadius) {
    dy = -dy;
    // added paddleHeight and paddleBottomMargin so that the ball doesn't halfway go into the paddle
  } else if (
    y + dy >
    canvas.height - ballRadius - paddleHeight - paddleBottomMargin
  ) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      generateBallAngle();

      //increase the speed of the ball by 0.5 each time it touches the paddle
      dy += 0.5;
      dy = -dy;
      generateRandomColor();
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        generateBallAngle();
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
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

  requestAnimationFrame(draw);
}

function generateRandomColor() {
  randomColor = Math.floor(Math.random() * 16777215).toString(16);
}

function generateBallAngle() {
  let randomBallAngle = [-2, 2];
  dx = randomBallAngle[Math.floor(Math.random() * randomBallAngle.length)];
}
generateBallAngle();

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleX,
    canvas.height - paddleBottomMargin - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

draw();
