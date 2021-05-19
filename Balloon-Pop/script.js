let popped = 0;

// POP ON MOUSEOVER
document.addEventListener('mouseover', function (e) {

    if (e.target.className === "balloon") {

        e.target.style.backgroundColor = "#ededed";
        e.target.textContent = " * ";

        popped++;
        removeEvent(e);
        checkAllPopped();
    }
});

//REMOVE BALLOON
function removeEvent(e) {
    e.target.removeEventListener('mouseover', function () {

    })
};

// CHECK IF ALL ARE POPPED
function checkAllPopped() {
    if (popped === 13) {
        console.log('all popped!');
        let container = document.querySelector('#balloon-container');
        let message = document.querySelector('#no-balloons');
        container.innerHTML = '';
        message.style.display = 'block';
    }
};

// PLAY AUDIO ON POP
function play() {
    var audio = new Audio('audio/pop.mp3');
    audio.play();
}
