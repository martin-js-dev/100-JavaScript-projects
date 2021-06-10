const cover = document.getElementById('cover');
const music = document.getElementById('music');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressWrapper = document.getElementById('progress-wrapper');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// SONGS INFO
const songs = [
  {
    title: 'Little Fun',
    artist: 'Jessica Lee',
    imgSrc: 'img/picture1.jpg',
    musicSrc: 'songs/song1.mp3',
    duration: '3:13',
  },
  {
    title: 'Sunshine Day',
    artist: 'Patrick Williams',
    imgSrc: 'img/picture2.jpg',
    musicSrc: 'songs/song2.mp3',
    duration: '2:49',
  },
  {
    title: 'Happy faces',
    artist: 'Jenny Rodriguez',
    imgSrc: 'img/picture3.jpg',
    musicSrc: 'songs/song3.mp3',
    duration: '5:07',
  },
];

loadSong(songs[songIndex]);

// CURRENT SONG
function loadSong(song) {
  cover.src = song.imgSrc;
  music.src = song.musicSrc;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// TOOGLE BUTTON PLAY PAUSE AND ICON
function playPauseToogle() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

play.addEventListener('click', playPauseToogle);

// Update icon
function upadatePlayPause() {
  if (music.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}
music.addEventListener('play', upadatePlayPause);
music.addEventListener('pause', upadatePlayPause);



// UPADATE PROGRESS BAR
function updateProgress() {
  progress.style.width = (music.currentTime / music.duration) * 100 + '%';

  let minutes = Math.floor(music.currentTime / 60);
  let seconds = Math.floor(music.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

music.addEventListener('timeupdate', updateProgress);

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// GO TO PREVIOUS SONG 
function previousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isMusicPlaying = !music.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isMusicPlaying) {
    playPauseToogle();
  }
}
prev.addEventListener('click', previousSong);


//GO TO NEXT SONG
function nextSong(playNow) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isMusicPlaying = !music.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isMusicPlaying || playNow) {
    playPauseToogle();
  }
}
next.addEventListener('click', nextSong.bind(null, false));
music.addEventListener('ended', nextSong.bind(null, true));


// CHANGE SONG PLACE ON CLICK ON PROGRESS
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  music.currentTime = clickWidthRatio * music.duration;
}

progressWrapper.addEventListener('click', setProgress);

