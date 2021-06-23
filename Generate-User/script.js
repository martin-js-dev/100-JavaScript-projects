var url = 'https://randomuser.me/api/';
var fullnameDisp = document.querySelector("#fullname");
var avatar = document.querySelector("#avatar");
var city = document.querySelector("#city");
var email = document.querySelector("#email");
var age = document.querySelector("#age");

var btn = document.querySelector("#btn");
btn.addEventListener("click", function () {
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateProfile)

});

function handleErrors(res) {
    if (!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function parseJSON(res) {
    return res.json().then(function (parsedData) {
        return parsedData.results[0];
    })
}

function updateProfile(data) {
    var fullname = data.name.first + " " + data.name.last;
    fullnameDisp.innerText = fullname;
    avatar.src = data.picture.medium;
    city.innerText = data.location.city;
    email.innerText = data.email;
    age.innerText = Math.floor(Math.random() * 40) + 15;
}

