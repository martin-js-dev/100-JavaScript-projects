let scores, roundScore, activePlayer, gamePlaying;

// START GAME
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    playerOne = prompt("Enter Player's 1 name your name");
    playerTwo = prompt("Enter Player's 2 name your name");

    span0 = document.querySelector("#name-0");
    span1 = document.querySelector("#name-1");

    if (playerOne && playerTwo) {
        span0.innerHTML = playerOne;
        span1.innerHTML = playerTwo;
    }

    gamePlaying = true;
}

init();

// CHANGE OF PLAYERS
function nextPlayer() {
    activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
};

// ROLL DICE BUTTON
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6 + 1);

        //change image dice
        var diceImage = document.querySelector('.dice');
        diceImage.style.display = 'block';
        diceImage.src = 'img/dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

//HOLD SCORE BUTTON
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'You Won!!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }
});

// RULES BUTTON
const openRulesBtn = document.querySelectorAll('[data-modal-target]')
const closeRulesBtn = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

//open popup
openRulesBtn.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.modalTarget)
        openRules(popup)
    })
})

function openRules(popup) {
    if (popup == null) return
    popup.classList.add('active')
    overlay.classList.add('active')
}


//background overlay
overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.rules.active')
    popups.forEach(popup => {
        closeRules(popup)
    })
})

//close popup
closeRulesBtn.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.rules')
        closeRules(popup)
    })
})


function closeRules(popup) {
    if (popup == null) return
    popup.classList.remove('active')
    overlay.classList.remove('active')
}

//NEW GAME BUTTON
document.querySelector('.btn-new').addEventListener('click', init);
