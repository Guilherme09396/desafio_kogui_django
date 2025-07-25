import {getCookie} from "./getCookie.js"

export function saveOperation(parametros, resultado) {
    fetch('/calculadora/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie()
        },
        body: JSON.stringify({parametros, resultado})
    }).then(
        window.location.href = `/calculadora/resultado`
    ).catch(e => console.log(e))
}
