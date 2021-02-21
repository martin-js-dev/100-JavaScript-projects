
//variables

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

//event listener

form.addEventListener('submit', e => {
    e.preventDefault();

    inspectInput();
});


//CHECK INPUT

function inspectInput() {

    const usernameField = username.value.trim();
    const emailField = email.value.trim();
    const passwordField = password.value.trim();


    if (usernameField === '') {
        displayError(username, 'Username cannot be blank');
    } else {
        displaySucess(username);
    }

    if (emailField === '') {
        displayError(email, 'Email cannot be blank');
    } else if (!isEmail(emailField)) {
        displayError(email, 'Not a valid email');
    } else {
        displaySucess(email);
    }

    if (passwordField === '') {
        displayError(password, 'Password cannot be blank');
    } else {
        displaySucess(password);
    }


}

//EROR MESSAGE

function displayError(input, message) {
    const formInput = input.parentElement;
    const span = formInput.querySelector('span');
    formInput.className = 'form-input error';
    span.innerText = message;
}

//SUCESS MESSAGE

function displaySucess(input) {
    const formInput = input.parentElement;
    formInput.className = 'form-input success';
}

//email validation

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
