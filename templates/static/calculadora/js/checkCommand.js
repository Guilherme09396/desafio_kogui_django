import { keyC, keyMore, keyBackspace, keyEqual, keyNumbers } from "./checkCommandAndExecute.js"

const display = document.querySelector('.display');
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let operatorKeys = ['+', '-', '*', '/', '%'];

export function checkCommand(key) {
    const showResult = display.getAttribute('data-result')
    if (showResult == 'true') {
        if (operatorKeys.includes(key) && display.innerText !== 'ERROR' && display.innerText !== 'INDEFINIDO') {
            display.setAttribute('data-result', 'false')
            display.innerText += ` ${key}`
            return
        } else if (numbers.includes(key)) {
            display.setAttribute('data-result', 'false')
            display.innerText = key
            return
        } else if(key == 'Backspace' && display.innerText !== 'ERROR' && display.innerText !== 'INDEFINIDO') {
            keyBackspace()
        } else if (key == 'c') {
            display.setAttribute('data-result', 'false')
            display.innerText = '0'
            return
        }

        return
    }

    if (key == 'c') {
        keyC()
        return
    } if (key === '±') {
        keyMore()
        return
    } if (key === 'Backspace' && showResult == 'false') {
       keyBackspace()
       return
    } if (key === '=' || key === 'Enter') {
        keyEqual()
        return
    } if (!numbers.includes(key) && !operatorKeys.includes(key) && key !== '=') {
        return;
    }

    keyNumbers(key)


    //checkCommandAndExecute(key, display, numbers, operatorKeys, showResult)
}

