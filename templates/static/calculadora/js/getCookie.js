export function getCookie() {
    let csrfToken = null;

    if(document.cookie && document.cookie != '') {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            if(cookie.includes('csrftoken')) {
                csrfToken = cookie.split('=')[1]
            }
        }
    }

    return csrfToken
}