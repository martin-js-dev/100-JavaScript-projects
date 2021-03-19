
//--------variables

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 4;
const delay = 600;

//---------------BALL-----------------//


const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 12,
    speed: 3,
    dx: 4,
    dy: -4,
    visible: true
};



function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#c750c1' : 'transparent';
    ctx.fill();
    ctx.closePath();
}


function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;


    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }


    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }


    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }


    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h
                ) {
                    ball.dy *= -1;
                    brick.visible = false;

                    increaseScore();
                }
            }
        });
    });

    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

//---------------PADDLE--------------//


const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 40,
    w: 80,
    h: 20,
    speed: 5,
    dx: 0,
    visible: true
};


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#c750c1' : 'transparent';
    ctx.fill();
    ctx.closePath();
}


function movePaddle() {
    paddle.x += paddle.dx;


    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}


//---------------BRICK------------------//


const brickInfo = {
    w: 70,
    h: 30,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};


const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}



function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#c750c1' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

//---------------SCORE------------------//

// Draw score 
function drawScore() {
    ctx.font = '20px Open Sans';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Increase score
function increaseScore() {
    score++;

    if (score % (brickRowCount * brickColumnCount) === 0) {

        ball.visible = false;
        paddle.visible = false;

        setTimeout(function () {
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 40;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        }, delay)
    }
}

//---------------DRAW EVERYTHING-------------//

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => (brick.visible = true));
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}


function update() {
    movePaddle();
    moveBall();

    draw();

    requestAnimationFrame(update);
}

update();

//---------------KEY EVENTS--------------//

function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ) {
        paddle.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

