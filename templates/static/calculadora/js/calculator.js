import {checkCommand} from './checkCommand.js'
import {deleteHistory} from "./deleteHistory.js"
const btnDelete = document.querySelector('.trash')

document.querySelector(".buttons").addEventListener("click", function (event) {
    checkCommand(event.target.value);
})

document.addEventListener('keydown', function (event) {
    checkCommand(event.key);
})

document.addEventListener("DOMContentLoaded", (ev) => {
    const navType = performance.getEntriesByType('navigation')[0].type
    if(navType == 'reload' && ev.target.URL.includes('result')) {
        window.location.href = '/calculator'
    }
})

btnDelete.addEventListener("click", () => deleteHistory(btnDelete))
