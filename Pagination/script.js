var currentPage = 1;
var showContent = 3;

var objJson = [
    { content: "content  page 1" },
    { content: "content page 1" },
    { content: "content page 1" },
    { content: "content page 2" },
    { content: "content page 2" },
    { content: "content page 2" },
    { content: "content page 3" },
    { content: "content page 3" },
    { content: "content page 3" },
    { content: "content page 4" },
    { content: "content page 4" },
    { content: "content page 4" }
];

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }


}

function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        changePage(currentPage);
    }

}



function changePage(page) {
    var btnNext = document.getElementById("btnNext");
    var btnPrev = document.getElementById("btnPrev");
    var container = document.getElementById("container");
    var newPage = document.getElementById("page");


    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    container.innerHTML = "";

    for (var i = (page - 1) * showContent; i < (page * showContent) && i < objJson.length; i++) {
        container.innerHTML += objJson[i].content + "<br>";
    }
    newPage.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btnPrev.style.visibility = "hidden";

    } else {
        btnPrev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btnNext.style.visibility = "hidden";
    } else {
        btnNext.style.visibility = "visible";
    }
    backgroundColor();

}

function numPages() {
    return Math.ceil(objJson.length / showContent);
}

window.onload = function () {
    changePage(1);

};

function backgroundColor() {

    if (currentPage == 1) {
        body.style.backgroundColor = "#bbeedd";
        var title = document.createElement("h1");
        title.innerText = "PAGINATION";
        document.body.appendChild(title);


    }
    else if (currentPage == 2) {
        body.style.backgroundColor = "#92ddc4";

    }
    else if (currentPage == 3) {
        body.style.backgroundColor = "#67cfac";

    }
    else {
        body.style.backgroundColor = "#38b38a";

    }
}
