export function addKey(display, numbers, operatorKeys, key) {
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