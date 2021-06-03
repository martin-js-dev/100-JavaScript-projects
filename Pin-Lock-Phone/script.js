
// PIN LOGIN
class PinLogin {
    constructor({ el, maxNumbers = Infinity }) {
        this.el = {
            main: el,
            numbersLayout: el.querySelector(".pin-login-num"),
            textDisplay: el.querySelector(".pin-login-text")
        };


        this.maxNumbers = maxNumbers;
        this.value = "";

        this.generatePhone();
    }

    // GENERATE PHONE LAYOUT
    generatePhone() {
        const phoneLayout = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "backspace", "0", "done"
        ];

        phoneLayout.forEach(key => {
            const insertBreak = key.search(/[369]/) !== -1;
            const keyEl = document.createElement("div");

            keyEl.classList.add("pin-login-key");
            keyEl.classList.toggle("material-icons", isNaN(key));
            keyEl.textContent = key;
            keyEl.addEventListener("click", () => { this.onKeyPress(key) });
            this.el.numbersLayout.appendChild(keyEl);

            if (insertBreak) {
                this.el.numbersLayout.appendChild(document.createElement("br"));
            }
        });
    }

    // KEY EVENTS DELETE AND DONE
    onKeyPress(key) {
        switch (key) {
            case "backspace":
                this.value = this.value.substring(0, this.value.length - 1);
                break;
            case "done":
                this.tryLogin();
                break;
            default:
                if (this.value.length < this.maxNumbers && !isNaN(key)) {
                    this.value += key;
                }
                break;
        }

        this.updateText();
    }

    updateText() {
        this.el.textDisplay.value = "_".repeat(this.value.length);
        this.el.textDisplay.classList.remove("pin-login-text--error");
    }

    // TRY TO LOG IN
    tryLogin() {
        const pinInput = document.getElementById('pin-input');
        const keyPad = document.getElementById('keypad');
        if (this.value !== '1234') {

            pinInput.style.backgroundColor = "red";
        }
        else {

            pinInput.style.backgroundColor = "green";
            keyPad.innerHTML = " Calls <br> Messages <br> Menu";
            keyPad.style.height = "300px";

        }
    }
}


new PinLogin({
    el: document.getElementById("loginWrapper"),

});
