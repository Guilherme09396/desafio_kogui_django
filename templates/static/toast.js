export function showToast(message, delayInMilliSeconds, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');

    const typeConvert = {
        success: 'success',
        error: 'danger',
        warning: 'warning',
        info: 'info'
    }

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${typeConvert[type]} border-0 mb-2`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
            ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, {delay: delayInMilliSeconds});
    bsToast.show();

    // Auto-remover após ocultar
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}
