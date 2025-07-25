import {saveOperation} from "./saveOperation.js"

const display = document.querySelector('.display');
let isPositive = true

export function checkKey(key) {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    let operatorKeys = ['+', '-', '*', '/', '%'];
    let equalKey = '=';

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
        display.innerText = eval(expression)
        saveOperation(expression, display.innerText)
        return;
    }

    if (!numbers.includes(key) && !operatorKeys.includes(key) && key !== equalKey) {
        return;
    }

    addKey(key);

}

function addKey(key) {
    display.innerText += ` ${key} `;
}
