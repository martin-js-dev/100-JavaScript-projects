var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".color-box");
var pickedColor = colorGenerated();
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easy-btn");
var hardBtn = document.querySelector("#hard-btn");

//EASY BUTTON
easyBtn.addEventListener("click", function () {

    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");

    numSquares = 3;

    colors = generateRandomColors(numSquares);

    //reset winning color
    pickedColor = colorGenerated();

    colorDisplay.textContent = pickedColor;

    //loop through 3 squares and reset colors 
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

//HARD BUTTON
hardBtn.addEventListener("click", function () {
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = colorGenerated();
    colorDisplay.textContent = pickedColor;

    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
});

//RESET BUTTON
resetButton.addEventListener("click", function () {

    colors = generateRandomColors(numSquares);

    pickedColor = colorGenerated();

    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
    //set winning color back to default
    h1.style.background = "purple";
})

colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function () {

        var clickedColor = this.style.backgroundColor;


        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again";
            changeColors(clickedColor);
            h1.style.background = clickedColor;

        } else {
            this.style.backgroundColor = "#333";
            messageDisplay.textContent = "Try Again";
        }
    });
}

//CHANGE COLORS
function changeColors(colorz) {

    for (var i = 0; i < squares.length; i++) {

        squares[i].style.background = colorz;
    }
}

function colorGenerated() {

    var random = Math.floor(Math.random() * colors.length)
    return colors[random];
}

function generateRandomColors(genColor) {

    var arr = []

    for (var i = 0; i < genColor; i++) {
        arr.push(randomColor())
    }

    return arr;
}

//MAKE RANDOM COLOR
function randomColor() {

    var red = Math.floor(Math.random() * 256);

    var green = Math.floor(Math.random() * 256);

    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}
