const previousOperationText = document.getElementById('previous-operation');
const currentOperationText = document.getElementById('current-operation');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operation = undefined;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'Limpar') {
            clearCalculator();
            return;
        }

        if (value === '=') {
            calculate();
            return;
        }

        if ('+-*/'.includes(value)) {
            chooseOperation(value);
            return;
        }

        appendNumber(value);
    });
});

function appendNumber(number) {
    if (currentInput === '0' && number === '0') return;
    if (currentInput.includes('.') && number === '.') return;

    currentInput = currentInput.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }

    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr !== 0 ? prev / curr : 'Erro';
            break;
        default:
            return;
    }

    currentInput = result;
    operation = undefined;
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    currentOperationText.textContent = currentInput;
    if (operation != null) {
        previousOperationText.textContent = `${previousInput} ${operation}`;
    } else {
        previousOperationText.textContent = '';
    }
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operation = undefined;
    updateDisplay();
}
