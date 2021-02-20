//variables

let youScore = 0;
let computerScore = 0;
const youResult = document.getElementById('you-score');
const computerResult = document.getElementById('computer-score');
const resultBoard = document.querySelector('.result-board');
const result = document.querySelector('.result');
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');


//event listeners

function main() {
    rock.addEventListener('click', () => game('rock'));
    paper.addEventListener('click', () => game('paper'));
    scissors.addEventListener('click', () => game('scissors'));
}

//COMPUTER CHOICE

function computerOption() {
    const options = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return options[randomNumber];
}

//USER CHOICE

function youOption(youInput) {
    if (youInput === 'paper') return 'Paper';
    if (youInput === 'scissors') return 'Scissors';
    return 'Rock';
}

// USER WIN
function win(user, computer) {
    youScore++;

    youResult.innerHTML = youScore;
    const userName = ' (you)'.fontcolor('black').fontsize('6px').sup();
    const compName = ' (computer)'.fontcolor('black').fontsize('6px').sup();
    result.innerHTML = `<p>${youOption(user)}${userName} beats ${youOption(computer)}${compName}. You win!</p>`;
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('winStyle');
    setTimeout(() => roundStatus.classList.remove('winStyle'), 300);
}

//COMPUTER WIN

function lose(user, computer) {
    computerScore++;

    computerResult.innerHTML = computerScore;
    const userName = ' (you)'.fontcolor('black').fontsize('6px').sup();
    const compName = ' (computer)'.fontcolor('black').fontsize('6px').sup();
    result.innerHTML = `<p>${youOption(computer)}${compName} beats ${youOption(user)}${userName}. You lose!</p>`;
    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('loseStyle');
    setTimeout(() => roundStatus.classList.remove('loseStyle'), 300);
}

//DRAW

function draw(user, computer) {
    const userName = ' (you)'.fontcolor('black').fontsize('6px').sup();
    const compName = ' (computer)'.fontcolor('black').fontsize('6px').sup();
    result.innerHTML = `<p>It was a draw! You both chose ${youOption(user)}</p>`;

    const roundStatus = document.getElementById(user);
    roundStatus.classList.add('drawStyle');
    setTimeout(() => roundStatus.classList.remove('drawStyle'), 300);
}

// NEW GAME

function game(youOption) {
    const compInput = computerOption();


    switch (youOption + compInput) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            win(youOption, compInput);

            break;
        case 'rockpaper':
        case 'scissorsrock':
        case 'paperscissors':
            lose(youOption, compInput);

            break;
        case 'rockrock':
        case 'scissorsscissors':
        case 'paperpaper':
            draw(youOption, compInput);

            break;
    }
}

main();
