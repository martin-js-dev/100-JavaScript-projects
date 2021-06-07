document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('circle-btn').addEventListener('click', createCircle);
    document.getElementById('rectangle-btn').addEventListener('click', createRectangle);
    document.getElementById('square-btn').addEventListener('click', createSquare);
    document.getElementById('triangle-btn').addEventListener('click', createTriangle);

    var canvas = document.getElementById('wrapper-shapes');
    var circleRadius = document.getElementById('CircleRadius');
    var rectangleWidth = document.getElementById('recWidth');
    var rectangleHeight = document.getElementById('recHeight');
    var squareSide = document.getElementById('squareSide');
    var triangleHeight = document.getElementById('triangleHeight');


    //CREATE THE SHAPES
    var Shape = function (width, height) {
        this.width = width;
        this.height = height;
    }

    Shape.prototype.drawShape = function () {
        this.div = document.createElement('div');
        this.div.classList.add(this.cssClass);
        this.div.style.height = `${this.height}px`;
        this.div.style.width = `${this.width}px`;

        //remove shape
        this.div.addEventListener('dblclick', this.remove.bind(this));

        document.getElementById('wrapper-shapes').appendChild(this.div);
    }

    // CREATE CIRCLE 
    var Circle = function (radius) {
        Shape.call(this, radius * 2, radius * 2);
        this.cssClass = 'circle';
        this.drawShape();
    }

    Circle.prototype = Object.create(Shape.prototype);
    Circle.prototype.constructor = Circle;

    function createCircle() {
        new Circle(circleRadius.value);
    }

    // CREATE RECTANGLE
    var Rectangle = function (width, height) {
        Shape.call(this, width, height);
        this.cssClass = 'rectangle';
        this.drawShape();
    }

    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    function createRectangle() {
        new Rectangle(rectangleHeight.value, rectangleWidth.value);
    }

    // CREATE SQUARE
    var Square = function (side) {
        Shape.call(this, side, side);
        this.cssClass = 'square';
        this.drawShape();
    }

    Square.prototype = Object.create(Shape.prototype);
    Square.prototype.constructor = Square;

    function createSquare() {
        new Square(squareSide.value);
    }

    // CREATE TRIANGLE
    var Triangle = function (triangleHeight) {
        Shape.call(this, 0, 0);
        this.cssClass = 'triangle';
        this.drawShape();

        var isoPx = triangleHeight + "px";
        this.div.style.borderTopWidth = isoPx;
        this.div.style.borderRightWidth = 0;
        this.div.style.borderBottomWidth = 0;
        this.div.style.borderLeftWidth = isoPx;
    }

    Triangle.prototype = Object.create(Shape.prototype);
    Triangle.prototype.constructor = Triangle;

    function createTriangle() {
        new Triangle(triangleHeight.value);
    }

    Shape.prototype.remove = function () {
        this.div.remove();
    }


});
