
/// HTML bar
var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 90) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "% HTML";
            }
        }
    }
}

/// JavaScript bar

var i = 0;
function moveJ() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBarJ");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 82) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "% JavaScript";
            }
        }
    }
}

/// CSS bar


var i = 0;
function moveC() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBarC");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 72) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "% CSS";
            }
        }
    }
}
