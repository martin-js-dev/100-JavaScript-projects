const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// box pixel 
const box = 32;

// load images

const ground = new Image();
ground.src = "image/ground.png";

const foodImg = new Image();
foodImg.src = "image/food.png";


// create the snake

let snake = [];

snake[0] = {
	x: 9 * box,
	y: 10 * box,
};

// create the food

let food = {
	x: Math.floor(Math.random() * 17 + 1) * box,
	y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score

let score = 0;
let hit = 0;


//controlling the snake

let dir;

document.addEventListener("keydown", direction);

function direction(event) {
	let key = event.keyCode;
	if (key == 37 && dir != "RIGHT") {
		dir = "LEFT";
	} else if (key == 38 && dir != "DOWN") {
		dir = "UP";
	} else if (key == 39 && dir != "LEFT") {
		dir = "RIGHT";
	} else if (key == 40 && dir != "UP") {
		dir = "DOWN";
	}
}

// checking self touch by snake or not
function collision(head, array) {
	for (let i = 0; i < array.length; i++) {
		if (head.x == array[i].x && head.y == array[i].y) {
			return true;
		}
	}
	return false;
}

// draw everything to the canvas

function draw() {

	ctx.drawImage(ground, 0, 72);

	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = (i == 0) ? "#79559c" : "#79559c";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "black";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	// old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// which direction
	if (dir == "LEFT") snakeX -= box;
	if (dir == "RIGHT") snakeX += box;
	if (dir == "UP") snakeY -= box;
	if (dir == "DOWN") snakeY += box;

	// if the snake eats the food
	if (snakeX == food.x && snakeY == food.y) {
		score = score + 10;
		hit += 1;
		eat.play();
		food = {
			x: Math.floor(Math.random() * 17 + 1) * box,
			y: Math.floor(Math.random() * 15 + 3) * box
		}
		// don't remove the tail
	} else {
		// remove the tail
		snake.pop();
	}

	// add new Head

	let newHead = {
		x: snakeX,
		y: snakeY
	}

	// game over

	if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
		clearInterval(game);
		dead.play();
		showScoreBoard();

		reload();
	}

	snake.unshift(newHead);

	//game speed
	let increaseSpeed = false;

	if (hit && hit % 3 === 0 && movement > 100) {
		hit = 0;
		clearInterval(game);
		movement -= 20;
		game = setInterval(draw, movement);
	}

	document.getElementById('scoring').innerHTML = `Score: ${score}`;
}

//final score

function showScoreBoard() {
	var end = document.getElementById('end');
	end.innerHTML = `Score: ${score} <br> Game over`;
	end.style.display = "block";
}

//page reload
function reload() {
	setTimeout(() => {
		window.location.reload();
	}, 5000)
}

// call draw function every 200 ms / speed
let movement = 300;
let game = setInterval(draw, movement);
