window.addEventListener('load', startGame);

//game difficulty
const difficulty = {
    easy: 5,
    medium: 3,
    hard: 1
};


const currentDifficulty = difficulty.medium;

let time = currentDifficulty;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
    'edition','contradiction','share','twin',
    'conglomerate','key','demonstrate','performance',
    'package','audience','drawer','execute',
    'month','conscious','fail','full','society',
    'shake','place','contraction'

];

// start Game
function startGame() {

    seconds.innerHTML = currentDifficulty;

    showWord(words);

    wordInput.addEventListener('input', startMatch);

    setInterval(countdown, 1000);

    setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentDifficulty + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // Highscore in storage
    if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
        sessionStorage['highscore'] = score;
    } else {
        sessionStorage['highscore'] = sessionStorage['highscore'];
    }

    
    if (sessionStorage['highscore'] >= 0) {
        highscoreDisplay.innerHTML = sessionStorage['highscore'];
    }

    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// Match words
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

// display random word
function showWord(words) {

    const randIndex = Math.floor(Math.random() * words.length);

    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {

    if (time > 0) {

        time--;
    } else if (time === 0) {

        isPlaying = false;
    }

    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}


