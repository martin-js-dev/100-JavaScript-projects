
var time, alarm, currentHour, currentMinute,
    activeAlarm = false,
    sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");




sound.loop = true;

// DISPLAY CURRENT TIME ON SCREEN
function displayTime() {
    var now = new Date();
    time = now.toLocaleTimeString();
    clock.textContent = time;

    if (time === alarm) {
        sound.play();


        snooze.className = "";
    }
    setTimeout(displayTime, 1000);
}
displayTime();

// SELECT VALUES FOR ALARM
function addValues(id) {
    var select = id;
    var min = 59;

    for (i = 0; i <= min; i++) {

        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
    }
}
function addHours(id) {
    var select = id;
    var hour = 12;

    for (i = 1; i <= hour; i++) {

        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
addValues(minutes);
addValues(seconds);
addHours(hours);

// SET AND CLEAR ALARM
set.onclick = function () {

    //set
    if (activeAlarm === false) {
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
        ampm.disabled = true;

        alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
        this.textContent = "Clear Alarm";
        activeAlarm = true;
    } else {
        // clear
        hours.disabled = false;
        minutes.disabled = false;
        seconds.disabled = false;
        ampm.disabled = false;

        sound.pause();
        alarm = "00:00:00 AM";
        this.textContent = "Set Alarm";

        snooze.className = "hide";
        activeAlarm = false;
    }
};

// SNOOZE ALARM 5 MINUTES
snooze.onclick = function () {
    if (activeAlarm === true) {

        currentHour = time.substr(0, time.length - 9);
        currentMinute = time.substr(currentHour.length + 1, time.length - 8);

        if (currentMinute >= "55") {
            minutes.value = "00";
            hours.value = parseInt(currentHour) + 1;
        } else {
            if (parseInt(currentMinute) + 5 <= 9) {
                minutes.value = "0" + parseInt(currentMinute + 5);
            } else {
                minutes.value = parseInt(currentMinute) + 5;
            }
        }


        snooze.className = "hide";

        // reset alarm
        set.click();
        set.click();
    } else {
        return false;
    }
};
