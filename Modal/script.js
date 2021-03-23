const open = document.querySelectorAll("[data-open]");
const close = document.querySelectorAll("[data-close]");
const visible = "is-visible";

//OPEN MODAL

for (const el of open) {
    el.addEventListener("click", function () {
        const modal = this.dataset.open;
        document.getElementById(modal).classList.add(visible);
    });
}

//CLOSE MODAL

for (const el of close) {
    el.addEventListener("click", function () {
        this.parentElement.parentElement.parentElement.classList.remove(visible);
    });
}

//CLOSE ON CLICK OUTSIDE MODAL

document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(visible);
    }
});

//CLOSE ON ESCAPE KEY

document.addEventListener("keyup", e => {

    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(visible);
    }
});
