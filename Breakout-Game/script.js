
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
