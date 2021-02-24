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

function operate() {
   
}

function reset() {
    
}

function updateDisplay() {
    
}

function handleButtonPress() {
    
}
