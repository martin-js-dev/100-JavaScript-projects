let icons = document.getElementsByTagName('ion-icon');
let product = document.getElementsByClassName('product')
let carousel = Math.ceil(product.length / 4);
let current = 0;
let move = 24;
let maxMove = 140;


let right = () => {
    current = current + move;
    if (product == 1) { current = 0; }
    for (const i of product) {
        if (current > maxMove) { current = current - move; }
        i.style.left = '-' + current + '%';
    }

}
let left = () => {
    current = current - move;
    if (current <= 0) { current = 0; }
    for (const i of product) {
        if (carousel > 1) {
            i.style.left = '-' + current + '%';
        }
    }
}
icons[1].onclick = () => { right(); }
icons[0].onclick = () => { left(); }
