import {checkKey} from './checkKey.js'

document.querySelector(".buttons").addEventListener("click", function (event) {
    checkKey(event.target.value);
})

document.addEventListener('keydown', function (event) {
    checkKey(event.key);
})
