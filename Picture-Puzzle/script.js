var timerFunction;

var imagePuzzle = {
    stepCount: 0,
    startTime: new Date().getTime(),
    startGame: function (images, gridSize) {
        this.setImage(images, gridSize);
        $('#puzzle-wrapper').show();
        $('#sortable').randomize();
        this.swapImages('#sortable li');
        this.stepCount = 0;
        this.startTime = new Date().getTime();
        this.timer();
    },

    //TIMER
    timer: function () {
        var now = new Date().getTime();
        var elapsedTime = parseInt((now - imagePuzzle.startTime) / 1000, 10);
        $('#timerPanel').text(elapsedTime);
        timerFunction = setTimeout(imagePuzzle.timer, 1000);
    },

    //DRAG THE PARTS OF IMAGE
    swapImages: function (elem) {
        $(elem).draggable({
            snap: '#droppable',
            snapMode: 'outer',
            revert: "invalid",
            helper: "clone"
        });

        //DROP PARTS OF IMAGE
        $(elem).droppable({
            drop: function (event, ui) {
                var $dragElem = $(ui.draggable).clone().replaceAll(this);
                $(this).replaceAll(ui.draggable);

                currentList = $('#sortable > li').map(function (i, el) { return $(el).attr('data-value'); });
                if (isSorted(currentList))
                    $('#done-image').empty().html($('#gameOver').html());
                else {
                    var now = new Date().getTime();
                    imagePuzzle.stepCount++;
                    $('.stepCount').text(imagePuzzle.stepCount);
                    $('.timeCount').text(parseInt((now - imagePuzzle.startTime) / 1000, 10));
                }

                imagePuzzle.swapImages(this);
                imagePuzzle.swapImages($dragElem);
            }
        });
    },

    // PREPARE IMAGE TO SOLVE
    setImage: function (images, gridSize) {

        gridSize = gridSize || 4;
        var percentage = 100 / (gridSize - 1);
        var image = images[Math.floor(Math.random() * images.length)];
        $('#imgTitle').html(image.title);
        $('#doneImage').attr('src', image.src);
        $('#sortable').empty();

        for (var i = 0; i < gridSize * gridSize; i++) {
            var xpos = (percentage * (i % gridSize)) + '%';
            var ypos = (percentage * Math.floor(i / gridSize)) + '%';
            var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
                'background-image': 'url(' + image.src + ')',
                'background-size': (gridSize * 100) + '%',
                'background-position': xpos + ' ' + ypos,
                'width': 400 / gridSize,
                'height': 400 / gridSize
            });

            $('#sortable').append(li);
        }
        $('#sortable').randomize();
    }
};

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}

//RANDOM IMAGE AND PARTS
$.fn.randomize = function (selector) {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
        $(this).children(selector).sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });
    return this;
};

//CREATE PUZZLE FROM IMAGES 
var images = [
    { src: 'img/statue.jpg', title: 'Statue of Liberty' },
    { src: 'img/louvre.jpg', title: 'Louvre Museum' },
    { src: 'img/paris.jpg', title: 'Effiel Tower' },
    { src: 'img/city.jpg', title: 'City Buildings' },
    { src: 'img/big-ben1.jpg', title: 'Big Ben Clock' }
];

// LEVELS DIFFICULTY
$(function () {
    var gridSize = $('#levels :radio:checked').val();
    imagePuzzle.startGame(images, gridSize);
    $('#newPhoto').click(function () {
        var gridSize = $('#levels :radio:checked').val();
        imagePuzzle.startGame(images, gridSize);
    });

    $('#levels :radio').change(function (e) {
        var gridSize = $(this).val();
        imagePuzzle.startGame(images, gridSize);
    });
});
