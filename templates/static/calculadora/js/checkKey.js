import { saveOperation } from "./saveOperation.js"

const display = document.querySelector('.display');
let isPositive = true
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let operatorKeys = ['+', '-', '*', '/', '%'];
let equalKey = '=';

export function checkKey(key) {
    const displayDisabled = display.getAttribute('data-disabled')
    console.log(displayDisabled);

    /* if(displayDisabled == 'true') {
        display.setAttribute('data-disabled', false)
        display.innerText = '0'
    } */


    if (key == 'c') {
        window.location.href = '/calculadora'
        return
    }

    if (key === '±') {
        let content = display.innerText.trim();

        let operatorMatch = content.slice(1).match(/[+/%*-]/);
        if (!operatorMatch) return;
        
        let operatorIndex = content.indexOf(operatorMatch[0], 1);
        let operator = content[operatorIndex];

        let firstNumber = content.slice(0, operatorIndex).trim();
        let secondNumber = content.slice(operatorIndex + 1).trim();

        if (secondNumber.startsWith('(-') && secondNumber.endsWith(')')) {
            secondNumber = secondNumber.slice(2, -1); // remove "(-" e ")"
        } else {
            secondNumber = `(-${secondNumber})`;
        }

        display.innerText = `${firstNumber} ${operator} ${secondNumber}`;
        return;
    }


    if (key === 'Backspace' && displayDisabled == 'false') {
        display.innerText = display.innerText.slice(0, -1);
        return
    }

    if (key === equalKey || key === 'Enter') {
        let expression = display.innerText.replace(/ /g, '')
        /* 
        “Embora .2 seja tecnicamente válido, minha calculadora normaliza entradas para 0.2 para garantir consistência e legibilidade para o usuário.”
         */
        if (!expression.match(/^(-?\d+(\.\d+)?)[+*/%-]\(?-?\d+(\.\d+)?\)?$/)) {
            display.innerText = "ERROR"
            return;
        }

        if (expression.match(/\d+[/][0]/) && !expression.match(/\d+[/][0]./)) {
            display.innerText = "INDEFINIDO"
            return
        }

        expression = reformExpression(expression)
        const result = eval(expression)
        display.innerText = String(result).includes('.') ? result.toFixed(15) : result
        //saveOperation(expression, display.innerText)
        return;
    }

    if (!numbers.includes(key) && !operatorKeys.includes(key) && key !== equalKey) {
        return;
    }

    addKey(key);

}

function reformExpression(expression) {
    const number1IsNegative = expression[0] == '-' ? true : false
    if (number1IsNegative) {
        expression = expression.slice(1)
    }
    const operation = expression.match(/[+*/%-]/)
    let [number1, number2] = expression.split(operation)
    const newExpression = number1IsNegative ? `-${number1}${operation}${number2}` : `${number1}${operation}${number2}`
    return newExpression
}

function addKey(key) {
    const parameters = display.innerText.split(' ')
    const previousParameter = parameters[parameters.length - 1]

    if ((parameters[0] == '0' && parameters.length == 1) && (numbers.includes(key) || key == '-')) {
        parameters[0] = key
        display.innerText = parameters.join(' ');
        return
    }

    if ((operatorKeys.includes(key) && operatorKeys.includes(previousParameter)) && !(['*', '/', '%'].includes(previousParameter) && key == "-")) {
        parameters[parameters.length - 1] = key
        display.innerText = parameters.join(' ');
        return
    }


    display.innerText += ` ${key} `;
}
