
videoPlayer = document.getElementById('video-element');
btnPlayPause = document.getElementById('btn-pause');
btnMute = document.getElementById('btn-mute');
progressBar = document.getElementById('progress-bar');
volumeBar = document.getElementById('volume-bar');


//=========== PROGRESS BAR===============
function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    videoPlayer.currentTime = percent * videoPlayer.duration;
    e.target.value = Math.floor(percent / 100);
    e.target.innerHTML = progressBar.value + '% played';
}
progressBar.addEventListener("click", seek);


// ==========Update the progress bar=============
videoPlayer.addEventListener('timeupdate', updateProgressBar, false);
function updateProgressBar() {

    var percentage = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);

    progressBar.value = percentage;

    progressBar.innerHTML = percentage + '% played';
}


// =============PLAY PAUSE VIDEO PLAYER=============

videoPlayer.addEventListener('play', function () {

    changeButtonType(btnPlayPause, 'pause');
}, false);

videoPlayer.addEventListener('pause', function () {

    changeButtonType(btnPlayPause, 'play');
}, false);

videoPlayer.addEventListener('ended', function () { this.pause(); }, false);

//------------play/pause------------
function playPauseVideo() {
    if (videoPlayer.paused || videoPlayer.ended) {

        changeButtonType(btnPlayPause, 'pause');
        videoPlayer.play();
    }
    else {

        changeButtonType(btnPlayPause, 'play');
        videoPlayer.pause();
    }
}

//=======STOP VIDEO============
function stopVideo() {
    videoPlayer.pause();
    if (videoPlayer.currentTime) videoPlayer.currentTime = 0;
}

//========= REPLAY VIDEO==========
function replayVideo() {
    resetPlayer();
    videoPlayer.play();
}

// =======VOLUME CONTROLS MUTE/UNMUTE=============
videoPlayer.addEventListener('volumechange', function (e) {

    if (videoPlayer.muted) changeButtonType(btnMute, 'unmute');
    else changeButtonType(btnMute, 'mute');
}, false);

volumeBar.addEventListener("change", function (evt) {
    videoPlayer.volume = evt.target.value;
});


function muteVolume() {
    if (videoPlayer.muted) {

        changeButtonType(btnMute, 'mute');
        videoPlayer.muted = false;
    }
    else {

        changeButtonType(btnMute, 'unmute');
        videoPlayer.muted = true;
    }
}

//=========== CHANGE BUTTON VALUE===========
function changeButtonType(btn, value) {
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
}

//==============RESET PLAYER=========
function resetPlayer() {

    progressBar.value = 0;

    videoPlayer.currentTime = 0;

    changeButtonType(btnPlayPause, 'play');
}

// ==========FULL SCREEN===========

//========exit======= 
function exitFullScreen() {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// =======toogle======== 
function toggleFullScreen() {
    document.getElementById('btn-full').disabled = false;

    if (videoPlayer.requestFullscreen)
        if (document.fullScreenElement) {
            document.cancelFullScreen();
        } else {
            videoPlayer.requestFullscreen();
        }

}
