let secretNumber = 30;
let score = 30;
let highestRecord = 0;

//variables

const scoreV = document.getElementById('score')
const message = document.getElementById('message')
const number = document.getElementById('number')
const record = document.getElementById('record')
const checkBtn = document.getElementById('check-btn')
const guessNumber = document.getElementById('guess-number')
const body = document.getElementById('body')
const playAgain = document.getElementById('play-again')


// on load
document.addEventListener('DOMContentLoaded', function (event) {
  scoreV.textContent = 'Score: ' + score;
  message.textContent = 'Pick a number between 1 and 30!';
  secretNumber = Math.floor(Math.random() * 30 + 1);
  number.textContent = '?';
  record.textContent = 'Highest Record: ' + 0;
  
});

// check button 
checkBtn.addEventListener('click', function () {
  let inputNumber = guessNumber.value;
  
  if (inputNumber == secretNumber) {
    message.textContent = 'Congratulations, you won!';
    number.textContent = secretNumber;
    body.style.backgroundColor = '#59139b';
    if (score > highestRecord) {
      record.textContent =
        'Highest Record: ' + score;
    }
    return;
  } else if (inputNumber < secretNumber) {
    message.textContent = 'You guess is too small!';
    score--;
  } else {
    message.textContent = 'You guess is too large!';
    score--;
  }
  scoreV.textContent = 'Score: ' + score;
});

//play again button

playAgain.addEventListener('click', function () {
  score = 30;
  secretNumber = Math.floor(Math.random() * 30 + 1);
  scoreV.textContent = 'Score: ' + score;
  message.textContent = 'Guess the number!';
  number.textContent = '?';
  body.style.backgroundColor = '#7c35be';

});
