import { saveOperation } from "./saveOperation.js"

const display = document.querySelector('.display');
let isPositive = true
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let operatorKeys = ['+', '-', '*', '/', '%'];
let equalKey = '=';

export function checkKey(key) {
    if (key == 'c') {
        window.location.href = '/calculadora'
        return
    }

    if (key === '±') {
        let content = display.innerText
        if (isPositive) {
            isPositive = false
            display.innerText = `-${content}`
        } else {
            isPositive = true
            display.innerText = content.slice(1, content.length)
        }
        return
    }

    if (key === 'Backspace') {
        display.innerText = display.innerText.slice(0, -1);
        return
    }

    if (key === equalKey || key === 'Enter') {
        let expression = display.innerText.replace(/ /g, '')
        /* 
        “Embora .2 seja tecnicamente válido, minha calculadora normaliza entradas para 0.2 para garantir consistência e legibilidade para o usuário.”
         */
        if ((!expression.match(/\d+[+/%*-]\d+/) && !expression.match(/\d+[+/%*][-+]\d+/)) || expression.match(/\d+[+/%*-]\d+[+/%*-]/)) {
            display.innerText = "ERROR"
            return
        }

        if (expression.match(/\d+[/][0]/) && !expression.match(/\d+[/][0]./)) {
            display.innerText = "INDEFINIDO"
            return
        }

        expression = reformExpression(expression)
        display.innerText = eval(expression)
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
    if(number1IsNegative) {
        expression = expression.slice(1)
    }
    const operation = expression.match(/[+*/%-]/)
    let [number1, number2] = expression.split(operation)
    number1 = Number(number1)
    number2 = Number(number2)
    const newExpression = number1IsNegative ? `-${number1}${operation}${number2}` : `${number1}${operation}${number2}`
    return newExpression
}

function addKey(key) {
    const parameters = display.innerText.split(' ')
    const previousParameter = parameters[parameters.length - 1]
    
    if((operatorKeys.includes(key) && operatorKeys.includes(previousParameter)) && !(['*', '/', '%'].includes(previousParameter) && key == "-")) {
        parameters[parameters.length-1] = key
        display.innerText = parameters.join(' ');
        return
    }
    
    display.innerText += ` ${key} `;
}
