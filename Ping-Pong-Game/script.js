
const canvas = document.getElementById("pong");

const ctx = canvas.getContext('2d');


// Ball 
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: "WHITE"
}

// PADDLES
const user = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 12,
    height: 100,
    score: 0,
    color: "WHITE",

}


const computer = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 12,
    height: 100,
    score: 0,
    color: "WHITE"
}

// ----NET
const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "#747474"
}

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// listening to the cursor movement
canvas.addEventListener("mousemove", cursor);

function cursor(evt) {
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height / 2;
}

// when computer or USER scores, we reset the ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 10;
}

// draw the net
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 1) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
function drawText(text, x, y) {
    ctx.fillStyle = "#FFF";
    ctx.font = "75px Roboto";
    ctx.fillText(text, x, y);
}

// collision detection
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function update() {

    if (ball.x - ball.radius < 0) {
        computer.score++;

        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;

        resetBall();
    }

    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;


    computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.1;


    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;

    }

    // we check if the paddle hit the user or the computer paddle
    let player = (ball.x + ball.radius < canvas.width / 2) ? user : computer;

    // if the ball hits a paddle
    if (collision(ball, player)) {



        let collidePoint = (ball.y - (player.y + player.height / 2));

        collidePoint = collidePoint / (player.height / 2);

        let angleRad = (Math.PI / 4) * collidePoint;


        let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);


        ball.speed += 0.1;
    }
}

// render function
function render() {


    drawRect(0, 0, canvas.width, canvas.height, "#2caaaa");


    drawText(user.score, canvas.width / 4, canvas.height / 5);


    drawText(computer.score, 3 * canvas.width / 4, canvas.height / 5);


    drawNet();


    drawRect(user.x, user.y, user.width, user.height, user.color);


    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);


    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
}

let framePerSecond = 50;


let loop = setInterval(game, 1000 / framePerSecond);
