const like = document.querySelector('.like');
const times = document.querySelector('#times');

let timesLiked = 0;
let clicked = 0;

// ON CLICK DISPLAY LIKE
like.addEventListener('click', (e) => {
    if (clicked === 0) {
        clicked = new Date().getTime();
    } else {
        if (((new Date().getTime()) - clicked) < 800) {
            createLike(e);
            clicked = 0;
        } else {
            clicked = new Date().getTime();
        }
    }
});

//CREATE LIKE
const createLike = (e) => {
    const heart = document.createElement("I");
    heart.classList.add('fa');
    heart.classList.add('fa-heart');

    const x = e.clientX;
    const y = e.clientY;

    const leftOffset = e.target.offsetLeft;
    const topOffset = e.target.offsetTop;

    const xInside = x - leftOffset;
    const yInside = y - topOffset;

    heart.style.top = yInside + 'px';
    heart.style.left = xInside + 'px';

    like.appendChild(heart);

    times.innerHTML = `${++timesLiked}`;

    setTimeout(() => {
        heart.remove();
    }, 1000);
}
