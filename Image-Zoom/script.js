// IMAGE ZOOM FUNCTION
function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);

    // CREATE LENS
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");


    img.parentElement.insertBefore(lens, img);

    // RATIO BETWEEN DIV RESULT AND LENS
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    // DIV RESULT
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";


    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);


    // MOVE LENS AROUND IMG
    function moveLens(e) {
        var pos, x, y;

        e.preventDefault();

        pos = cursorPosition(e);

        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);

        // PREVENT OUTSIDE IMG
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        // LENS POSITION
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        lens.style.marginTop = "160px";
        lens.style.marginLeft = "150px";

        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    // CURSOR POSITION
    function cursorPosition(e) {
        var a, x = 0, y = 0;
        e = e || window.event;

        a = img.getBoundingClientRect();

        x = e.pageX - a.left;
        y = e.pageY - a.top;

        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

imageZoom("myimage", "myresult");
