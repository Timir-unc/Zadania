const buttons = document.querySelectorAll('.button');
const operators = document.querySelectorAll('.op');
const clearButton = document.getElementById('clear');
const display = document.getElementById('display');

let currentExpression = '';
let currentNumber = '';
let result = "0";
let lastOperator = '';

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonValue = this.textContent;
        currentNumber += buttonValue;
        display.textContent = currentNumber;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', function() {
        const operatorValue = this.textContent;
        
        if (operatorValue === '=') {
          if (lastOperator !== '') {
                result = calculate(result, parseFloat(currentNumber), lastOperator);
            } else {
                result = parseFloat(currentNumber);
            }
            display.textContent = result;
            currentNumber = result.toString();
            return;
        }
        
        if (result !== 0) {
            result = calculate(result, parseFloat(currentNumber), lastOperator);
            display.textContent = result;
        } else {
            result = parseFloat(currentNumber);
        }
        
        lastOperator = operatorValue;
        currentNumber = '';
    });
});

clearButton.addEventListener('click', function() {
    display.textContent = '0';
    currentNumber = '';
    result = 0;
    lastOperator = '';
});

function calculate(a, b, op) {
    switch(op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return 0;
    }
}