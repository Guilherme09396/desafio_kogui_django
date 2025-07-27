import {getCookie} from "./getCookie.js"
import {showToast} from "../../toast.js"

const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
let deleteCallback = null;

export const deleteHistory = (btnDelete) => {
    if (btnDelete.getAttribute('data-empty')) {
        showToast("Está vazio, nada a apagar!", 3000, 'error')
        return
    }
    
    confirmDeleteModal.show();
};

document.getElementById('btnConfirmDelete').addEventListener('click', () => {
    if (deleteCallback) deleteCallback();
    confirmDeleteModal.hide();
});

deleteCallback = () => {
    fetch('/calculator/history/delete/', {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie()
        },
    }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            showToast("Histórico apagado!", 500)
            setTimeout(() => {
                window.location.href = '/calculator'
            }, 800)
        }

        if (res.status == 500) {
            showToast("Erro interno ao apagar histórico", 3000, 'error')
        }
    }
    ).catch(e => console.log(e))
};