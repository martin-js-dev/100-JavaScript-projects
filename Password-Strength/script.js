var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// SHOW MESSAGE BOX
myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
}

// HIDE MESSAGE BOX
myInput.onblur = function () {
    document.getElementById("message").style.display = "none";
}

// WHEN USER START TYPING
myInput.onkeyup = function () {

    // validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
        letter.classList.remove("upper");
        letter.classList.add("uppercase");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
        letter.classList.remove("uppercase");
        letter.classList.add("upper");

    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        capital.classList.remove("upper");
        capital.classList.add("uppercase");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        capital.classList.remove("uppercase");
        capital.classList.add("upper");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
        number.classList.remove("upper");
        number.classList.add("uppercase");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        number.classList.remove("uppercase");
        number.classList.add("upper");
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        length.classList.remove("upper");
        length.classList.add("uppercase");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        length.classList.remove("uppercase");
        length.classList.add("upper");
    }
}
