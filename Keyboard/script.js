const Keyboard = {
    elements: {
        main: null,
        keysWrapper: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    showKeyboard() {

        // CREATE MAIN ELEMENTS IN KEYBOARD
        this.elements.main = document.createElement("div");
        this.elements.keysWrapper = document.createElement("div");


        this.elements.main.classList.add("keyboard", "keyboard-hidden");
        this.elements.keysWrapper.classList.add("keyboard-keys");
        this.elements.keysWrapper.appendChild(this.createKeys());

        this.elements.keys = this.elements.keysWrapper.querySelectorAll(".keyboard-key");


        this.elements.main.appendChild(this.elements.keysWrapper);
        document.body.appendChild(this.elements.main);


        document.querySelectorAll(".keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    //CREATE KEYS
    createKeys() {
        const piece = document.createDocumentPiece();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        //icons
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const newRow = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;


            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            //backspace key
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.startEvent("oninput");
                    });

                    break;

                //capslock key
                case "caps":
                    keyElement.classList.add("keyboard-key-wide", "keyboard-key-activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this.toogleCapsLock();
                        keyElement.classList.toggle("keyboard-key-active", this.properties.capsLock);
                    });

                    break;

                //enter key
                case "enter":
                    keyElement.classList.add("keyboard-key-wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this.startEvent("oninput");
                    });

                    break;

                //space key
                case "space":
                    keyElement.classList.add("keyboard-key-extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this.startEvent("oninput");
                    });

                    break;

                //done key
                case "done":
                    keyElement.classList.add("keyboard-key-wide", "keyboard-key-dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this.startEvent("onclose");
                    });

                    break;

                // default typing
                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.startEvent("oninput");
                    });

                    break;
            }

            piece.appendChild(keyElement);

            if (newRow) {
                piece.appendChild(document.createElement("br"));
            }
        });

        return piece;
    },

    startEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    //toogle capslock
    toogleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    // open & close keyboard
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    }
};

// run keyboard
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.showKeyboard();
});
