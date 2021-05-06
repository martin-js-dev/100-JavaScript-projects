(function () {

    'use strict';


    var items = document.querySelectorAll(".timeline li");


    function elementVisible(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function displayDiv() {
        for (var i = 0; i < items.length; i++) {
            if (elementVisible(items[i])) {
                items[i].classList.add("in-view");
            }
        }
    }

    // listen for events
    window.addEventListener("load", displayDiv);
    window.addEventListener("resize", displayDiv);
    window.addEventListener("scroll", displayDiv);

})();



