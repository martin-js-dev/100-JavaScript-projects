// SET COUNTDOWN
var countDownDate = new Date("Jun 15, 2021 15:37:25").getTime();

// UPADATE COUNTDOWN
var x = setInterval(function () {

  // GET CURRENT TIME
  var currentTime = new Date().getTime();

  var timer = countDownDate - currentTime;

  //calculate time
  var days = Math.floor(timer / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timer % (1000 * 60)) / 1000);

  //show timer in div
  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";


  if (timer < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "PLEASE COME BACK LATER";
  }
}, 1000);
