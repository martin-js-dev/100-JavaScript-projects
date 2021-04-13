
var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var result1 = document.getElementById('result');



var form = document.getElementById('calculate');

form.addEventListener('submit', function (event) {
    var x = parseFloat(num1.value);
    var y = parseFloat(num2.value);

    var result = x / y;
    var percent = result * 100;

    result1.innerText = "Answer: " + percent + "%";
    event.preventDefault();
});






