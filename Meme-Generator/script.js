var c = document.querySelector('#c');
var ctx = c.getContext('2d');
var maxWidth = 400;
var lineHeight = 50;
var image = new Image();

image.src = "meme.jpg"

// ON PAGE LOAD
image.onload = function () {
    ctx.drawImage(image, 0, 0, c.width, c.height);
    redrawImage();
}

document.getElementById('submit').onclick = redrawImage;

//REDRAW IMAGE
function redrawImage() {
    var topText = document.getElementById('toptext').value;
    var bottomText = document.getElementById('bottomtext').value;

    ctx.drawImage(image, 0, 0, c.width, c.height);

    ctx.font = "36pt Impact";
    ctx.textAlign = "center"; ctx.fillStyle = "white";

    ctx.strokeStyle = "black";
    ctx.lineWidth = "2";

    wrapText(ctx, topText, c.width / 2, 50, maxWidth, lineHeight);

    ctx.font = "28pt Impact";

    wrapText(ctx, bottomText, c.width / 2, 400, maxWidth, lineHeight);
}

//WRAP TEXT IN IMAGE
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            context.strokeText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
}

var textbox = document.querySelectorAll('.highlight');

textbox[0].addEventListener('click', function () {
    this.select();
});
textbox[1].addEventListener('click', function () {
    this.select();
});
