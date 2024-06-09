let displayValue = Number();
const button = document.querySelectorAll('button');
const keys = document.querySelectorAll('#key');
const output = document.querySelector('.output');
const allKeys = document.querySelectorAll('.keys');
const clearAllKey = document.querySelector('.clearAll');
const backKey = document.querySelector('.back');
const percentageKey = document.querySelector('.percentage');
const equalKey = document.querySelector('.equal');
const zeroKey  = document.querySelector('.zero');
const sqrtKey = document.querySelector('.sqrt');
const decimalKey = document.querySelector('.decimal')
const plusKey = document.querySelector('.plus')
const oneKey  = document.querySelector('.one');
const twoKey  = document.querySelector('.two');
const threeKey  = document.querySelector('.three');
const minusKey = document.querySelector('.minus')
const fourKey  = document.querySelector('.four');
const fiveKey  = document.querySelector('.five');
const sixKey  = document.querySelector('.six');
const multiplyKey  = document.querySelector('.asterick');
const sevenKey = document.querySelector('.seven');
const eightKey  = document.querySelector('.eight');
const nineKey  = document.querySelector('.nine');
const dividekey  = document.querySelector('.forwardSlash');
const numKeys = [zeroKey, oneKey, twoKey, threeKey, fourKey, fiveKey, sixKey, sevenKey, eightKey, nineKey, decimalKey];
const operators = [plusKey, minusKey, multiplyKey, dividekey, percentageKey, sqrtKey];
let signs = '+-/%*÷×√'
function add(a, b) {
    return a + b;
};
function substract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
};
function divide(a, b) {
    if(decimalExistance) {
        return (a / b).toFixed(2);
    } else {
        return (a / b);
    };
};
function percentage(a, b) {
    return (a * b)/100;
};
function sqrt(a) {
    return Math.sqrt(a).toFixed(2);
}

let firstNumber = Number();
let secondNumber = Number();
let operator = '';

function operate(firstNum,op, secondNum) {
    switch (op) {
        case '+':
         return add(firstNum, secondNum);
        case '-':
         return substract(firstNum, secondNum);
        case '×':
         return multiply(firstNum, secondNum);
        case '÷':
         return divide(firstNum, secondNum);
        case '%':
         return percentage(firstNum, secondNum);
        case '√':
         return sqrt(getNumForSqrt());
    };
};

numKeys.forEach(function(key) {
    key.addEventListener('click', (event) => {
        switch (key) {
            case zeroKey:
                displayValue = '0';
                break;
            case oneKey:
                displayValue = '1';
                break;
            case twoKey:
                displayValue = '2';
                break;
            case threeKey:
                displayValue = '3';
                break;
            case fourKey:
                displayValue = '4';
                break;
            case fiveKey:
                displayValue = '5';
                break;
            case sixKey:
                displayValue = '6';
                break;
            case sevenKey:
                displayValue = '7';
                break;
            case eightKey:
                displayValue = '8';
                break;
            case nineKey:
                displayValue = '9';
                break;
            case decimalKey:
                if (!decimalExistance()) {
                    displayValue = '.';
                } else {
                    displayValue = '';
                };
        };
        output.textContent += displayValue;
    })
})

operators.forEach(function(sign) {
    sign.addEventListener('click', (e) => {
        let opExist = operatorExistance().includes(true);
        if (opExist === true && (!signs.includes(lastDigitOfOutput()))) {
            secondNumber = getSecNum();
            output.textContent = operate(firstNumber, operator, secondNumber);
        };
        if (!signs.includes(lastDigitOfOutput())) {
            firstNumber = Number(output.textContent);
            if (output.textContent !== '') {
                switch(sign) {
                    case plusKey:
                        operator = '+';
                        break;
                    case minusKey:
                        operator = '-';
                        break;
                    case multiplyKey:
                        operator = '×';
                        break;
                    case dividekey:
                        operator = '÷'
                        break;
                    case percentageKey:
                        operator = '%';
                        break;
                }
                output.textContent += operator;
            } else if (output.textContent === '') {
                if (sign === sqrtKey) {
                    operator = '√';
                    output.textContent += operator;
                };
            }
        }
    });
});

clearAllKey.addEventListener('click', () => {
    output.textContent = '';
})

backKey.addEventListener('click', () => {
    let splited = output.textContent.split('');
    let removeLast = splited.pop();
    return output.textContent = splited.join('');
});

equalKey.addEventListener('click', () => {
    let opExist = operatorExistance().includes(true);
    if (opExist === true) {
            secondNumber = getSecNum();
        if (!signs.includes(lastDigitOfOutput())) {
            output.textContent = operate(firstNumber, operator, secondNumber);
        };
    };
});

function getSecNum() {
    let outPut = output.textContent;
    let splited = outPut.split('');
    let mapped = splited.map(function(num) {
        if (signs.includes(num)) {
            return true;
        } else {
            return false;
        }
    });
    let indexOfOperator = mapped.indexOf(true);
    let secNumArray = splited.slice(indexOfOperator+1, splited.length);
    let secNum = Number(secNumArray.join(''));
    return secNum;
}
function operatorExistance() {
    let outPut = output.textContent;
    let splitted = outPut.split('');
    let mapped = splitted.map(function(num) {
        if (signs.includes(num)) {
            return true;
        } else {
            return false;
        }
    });
    return mapped;
    // this will return array of true and false like
    // [false, false, true]
};

function decimalExistance() {
    let outPut = output.textContent;
    let splitted = outPut.split('');
    let mapped = splitted.map((num) => '.' === num);
    let decExist = mapped.includes(true);
    return decExist;
};

function lastDigitOfOutput() {
    let outPut = output.textContent;
    let splitted = outPut.split('');
    let lastElement = splitted[splitted.length - 1]
    return lastElement;
}

function getNumForSqrt() {
 let outPut = output.textContent;
 let splited = outPut.split('');
 if (splited[0] === '√') {
    let sliced = splited.slice(1, splited.length)
    let sqrtNum = Number(sliced.join(''));
    return sqrtNum;
 }
}