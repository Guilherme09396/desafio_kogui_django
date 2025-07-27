import {getCookie} from "./getCookie.js"
import {showToast} from "../../toast.js"

export function deleteHistory(btnDelete) {
    if(btnDelete.getAttribute('data-empty')) {
        showToast("Está vazio, nada a apagar!", 3000, 'error')
        return
    }

    fetch('/calculator/history/delete/', {
        method: 'DELETE', 
        headers: {
            'X-CSRFToken': getCookie()
        },
    }).then((res) => {
        if(res.status >= 200 && res.status < 300) {
            showToast("Histórico apagado!", 500)
            setTimeout(() => {
                window.location.href = '/calculator'
            }, 800)
        }

        if(res.status == 500) {
            showToast("Erro interno ao apagar histórico", 3000, 'error')
        } 
    }
    ).catch(e => console.log(e))
}
