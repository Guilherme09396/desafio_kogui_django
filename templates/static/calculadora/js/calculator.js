import {checkCommand} from './checkCommand.js'

document.querySelector(".buttons").addEventListener("click", function (event) {
    checkCommand(event.target.value);
})

document.addEventListener('keydown', function (event) {
    checkCommand(event.key);
})

document.addEventListener("DOMContentLoaded", (ev) => {
    const navType = performance.getEntriesByType('navigation')[0].type
    if(navType == 'reload' && ev.target.URL.includes('resultado')) {
        window.location.href = '/calculadora'
    }
})
