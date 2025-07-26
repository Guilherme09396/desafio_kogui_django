import { saveOperation } from "./saveOperation.js"
import { addKey } from "./addKey.js"
import { reformExpression } from "./reformExpression.js"

const display = document.querySelector('.display');
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let operatorKeys = ['+', '-', '*', '/', '%'];


export function keyC() {
    window.location.href = '/calculadora'
    return
}

export function keyMore() {
    let content = display.innerText.trim();

    let operatorMatch = content.slice(1).match(/[+/%*-]/);
    if (!operatorMatch) return;

    if(!content.replace(/ /g, '').match(/[+/%*-]\d+/)) {
        return
    }

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

export function keyBackspace() {
    display.innerText = display.innerText.slice(0, -1);
    return
}

export function keyEqual() {
    let expression = display.innerText.replace(/ /g, '')
    /* 
    “Embora .2 seja tecnicamente válido, minha calculadora normaliza entradas para 0.2 para garantir consistência e legibilidade para o usuário.”
    */
    if (!expression.match(/^(-?\d+(\.\d+)?)[+*/%-]\(?-?\d+(\.\d+)?\)?$/)) {
        display.setAttribute('data-result', 'true')
        display.innerText = "ERROR"
        return;
    }

    if (expression.match(/\d+[/][0]/) && !expression.match(/\d+[/][0]./)) {
        display.innerText = "INDEFINIDO"
        display.setAttribute('data-result', 'true')
        return
    }

    expression = reformExpression(expression)
    const result = eval(expression)
    const [_, parteDecimal] = String(result).split('.')
    
    if(parteDecimal && parteDecimal.length > 15) {
        display.innerText = result.toFixed(15)
    } else {
        display.innerText =  result
    }
    //saveOperation(expression, display.innerText)
    display.setAttribute('data-result', 'true')
    return;
}

export function keyNumbers(key) {
    addKey(display, numbers, operatorKeys, key);
}