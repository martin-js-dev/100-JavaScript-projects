
displayNotes();

//ADD NOTE
let addButton = document.getElementById("addButton");
addButton.addEventListener("click", function (e) {
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";

    displayNotes();
});

//SHOW NOTES IN SECTION
function displayNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);

    }
    let html = "";
    notesObj.forEach((element, index) => {
        html +=
            `<div class="note">
            <div >
            <h5 >Note ${index + 1}</h5>
            <p >${element}</p>
            <button id="${index}" onclick="removeNotes(this.id)">Delete Note</button>
            </div>
        </div>`;

    });
    let notesEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `Nothing to show! `;
    }
}

//DELETE NOTE
function removeNotes(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    displayNotes();
}

//SEARCH NOTES
let search = document.getElementById('searchText');
search.addEventListener("input", function () {

    let inputValue = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('note');
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if (cardText.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
