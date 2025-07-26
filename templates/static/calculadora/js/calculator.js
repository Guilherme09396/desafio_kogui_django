import {checkCommand} from './checkCommand.js'

document.querySelector(".buttons").addEventListener("click", function (event) {
    checkCommand(event.target.value);
})

document.addEventListener('keydown', function (event) {
    checkCommand(event.key);
})
