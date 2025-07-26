import {getCookie} from "./getCookie.js"

export function deleteHistory(btnDelete) {
    if(btnDelete.getAttribute('data-empty')) {
        alert("Está vazio, nada a apagar!")
        return
    }

    fetch('/calculadora/historico/apagar/', {
        method: 'DELETE', 
        headers: {
            'X-CSRFToken': getCookie()
        },
    }).then((res) => {
        if(res.status >= 200 && res.status < 300) {
            alert("Apagou")
            window.location.href = '/calculadora'
        }

        if(res.status = 500) {
            alert("Erro")
        } 
    }
    ).catch(e => console.log(e))
}
