
let count = 0;

const number = document.querySelector("#number");
const buttons = document.querySelectorAll(".button");
const body = document.getElementById('body');

buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const styles = e.currentTarget.classList;
        if (styles.contains("decrease")) {
            count--;
        } else if (styles.contains("increase")) {
            count++;
        } else {
            count = 0;
        }

        // warmer backgrounds

        if (count > 0) {

            body.style.background = "#c55d5d";
        }
        if (count > 5) {

            body.style.background = "#bb4747";
        }
        if (count > 10) {

            body.style.background = "#b33636";
        }
        if (count > 15) {
            body.style.color = "#d8d6d6";
            body.style.background = "#b32626";
        }


        // colder backgrounds 

        if (count < 0) {
            body.style.background = '#b5dbe7';
        }
        if (count < -5) {

            body.style.color = "#363636";
            body.style.background = "##c5dae0";
        }
        if (count < -10) {
            body.style.background = '#d5dcdf';
        }
        number.textContent = count;
    });
});
