let numbers = [];
let operations = [];
let currentNumber = '0';
let operationMode = false;

function numberPress(num) {
    currentNumber === '0' ? currentNumber = num : currentNumber += num;
    updateDisplay(currentNumber);
    operationMode = true;
}
function operatorPress(op) {
    if (!operationMode) {
        return;
    }

    operations.push(op);
    numbers.push(currentNumber);

    if (op === 'equal') {
        currentNumber = calculate();
        updateDisplay(currentNumber);
        reset(currentNumber);
    } else {
        currentNumber = '0';
        updateDisplay();
        operationMode = false;
    }
}

function calculate() {
    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (i === 0) {
            total = Number.parseFloat(numbers[i]);
        } else {
            total = operate(total, Number.parseFloat(numbers[i]), operations[i - 1]);
        }
    }

    return `${total}`;
}

function operate(val1, val2, op) {
    switch (op) {
        case 'add':
            return val1 + val2;

        case 'subtract':
            return val1 - val2;

        case 'multiply':
            return val1 * val2;

        case 'divide':
            return val1 / val2;

        default:
            return '0';
    }
}

function reset(num = '0') {
    numbers = [];
    operations = [];
    currentNumber = num;
}

function updateDisplay(num = '0') {
    const digitCount = num.length;
    const displayEl = document.getElementById('display');

    if (digitCount >= 11 && digitCount < 15) {
        displayEl.style.fontSize = '20px';
    } else if (digitCount >= 15) {
        displayEl.style.fontSize = '15px';
    } else {
        displayEl.style.fontSize = '28px';
    }

    displayEl.innerText = num;
}

function handleButtonPress(btnId) {
    if (btnId === 'dot') {
        currentNumber = currentNumber + '.';
        updateDisplay(currentNumber);
    } else if (btnId === 'clear') {
        reset();
        updateDisplay();
    } else if (!isNaN(Number.parseInt(btnId))) {
        numberPress(btnId);
    } else {
        operatorPress(btnId);
    }
}

function init() {
    Array.from(document.getElementsByClassName('btn'))
        .forEach(btn => {
            btn.addEventListener('click', () => handleButtonPress(btn.id))
        });
}

window.addEventListener('DOMContentLoaded', init);
