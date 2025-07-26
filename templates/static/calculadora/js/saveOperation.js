import {getCookie} from "./getCookie.js"

export function saveOperation(parametros, resultado) {
    fetch('/calculator/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie()
        },
        body: JSON.stringify({parametros, resultado})
    }).then(
        window.location.href = `/calculator/result`
    ).catch(e => console.log(e))
}
