//BUTTONS
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var reset = document.getElementById('reset');

// MINUTES AND SECOUNDS
var workMinutes = document.getElementById('work-minutes');
var workSeconds = document.getElementById('work-seconds');

var breakMinutes = document.getElementById('break-minutes');
var breakSeconds = document.getElementById('break-seconds');


var startTimer;

//START BUTTON
start.addEventListener('click', function () {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000)
    } else {
        alert("Timer is already running");
    }


})

//RESET BUTTON
reset.addEventListener('click', function () {
    workMinutes.innerText = 25;
    workSeconds.innerText = "00";

    breakMinutes.innerText = 5;
    breakSeconds.innerText = "00";

    document.getElementById('counter').innerText = 0;
    pauseInterval()
    startTimer = undefined;
})

//PAUSE BUTTON
pause.addEventListener('click', function () {
    pauseInterval()
    startTimer = undefined;

})


// TIMER
function timer() {

    if (workSeconds.innerText != 0) {
        workSeconds.innerText--;
    } else if (workMinutes.innerText != 0 && workSeconds.innerText == 0) {
        workSeconds.innerText = 59;
        workMinutes.innerText--;
    }


    if (workMinutes.innerText == 0 && workSeconds.innerText == 0) {
        if (breakSeconds.innerText != 0) {
            breakSeconds.innerText--;
        } else if (breakMinutes.innerText != 0 && breakSeconds.innerText == 0) {
            breakSeconds.innerText = 59;
            breakMinutes.innerText--;
        }
    }


    if (workMinutes.innerText == 0 && workSeconds.innerText == 0 && breakMinutes.innerText == 0 && breakSeconds.innerText == 0) {
        workMinutes.innerText = 25;
        workSeconds.innerText = "00";

        breakMinutes.innerText = 5;
        breakSeconds.innerText = "00";

        document.getElementById('counter').innerText++;
    }
}


function pauseInterval() {
    clearInterval(startTimer);
}
