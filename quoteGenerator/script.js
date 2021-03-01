const api = "https://api.quotable.io/random";

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const button = document.getElementById("button");

button.addEventListener("click", getQuote);

function getQuote() {
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            quote.innerHTML = `<i class="fas fa-quote-left"></i>${data.content}<i class="fas fa-quote-right"></i>`;
            author.innerHTML = `by ${data.author}`;
        });
}
