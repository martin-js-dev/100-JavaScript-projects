const places = document.querySelectorAll('.place')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let whacMole
let currentTime = 60
let timer = null

//MOVE MOLE ON RANDOM PLACES
function randomPlace() {
    places.forEach(Place => {
        Place.classList.remove('mole')
    })

    let randomPlace = places[Math.floor(Math.random() * 9)]
    randomPlace.classList.add('mole')

    whacMole = randomPlace.id
}

//CHECK FOR HITS ON MOLE
places.forEach(Place => {
    Place.addEventListener('mousedown', () => {
        if (Place.id == whacMole) {
            result++
            score.textContent = result
            whacMole = null
        }
    })
})

//MOVE MOLE
function moveMole() {
    timer = setInterval(randomPlace, 800)
}

moveMole()

//COUNTDOWN TIMER
function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimer)
        clearInterval(timer)
        alert('GAME OVER! Your final score is ' + result)
    }

}

let countDownTimer = setInterval(countDown, 1000)
